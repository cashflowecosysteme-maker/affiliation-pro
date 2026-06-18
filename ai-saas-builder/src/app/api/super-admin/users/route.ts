/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, type NextRequest } from 'next/server'
import { getDB, generateId, generateUniqueAffiliateCode } from '@/lib/db'
import { getSession, hashPassword } from '@/lib/auth'


// Verify super admin
async function verifySuperAdmin(request: NextRequest) {
  const session = await getSession(request)
  if (!session) return { authorized: false }

  const db = await getDB()
  const profile = await db
    .prepare('SELECT role FROM users WHERE id = ?')
    .bind(session.userId)
    .first()

  if (!profile || profile.role !== 'super_admin') return { authorized: false }

  return { authorized: true, db, userId: session.userId }
}

// CREATE USER
export async function POST(request: NextRequest) {
  try {
    const verification = await verifySuperAdmin(request)
    if (!verification.authorized) {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
    }
    const { db } = verification

    const { email, password, fullName, role, subdomain, adminId } = await request.json()

    if (!email || !password || !fullName || !role) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    // Check if email exists
    const existing = await db
      .prepare('SELECT id FROM users WHERE email = ?')
      .bind(email.toLowerCase())
      .first()
    if (existing) {
      return NextResponse.json({ error: 'Un compte avec cet email existe déjà' }, { status: 400 })
    }

    // Create user
    const userId = generateId()
    const affiliateCode = await generateUniqueAffiliateCode(db)
    const passwordHash = await hashPassword(password)
    const now = new Date().toISOString()

    // Auto-generate webhook secret for admin clients
    const webhookSecret = role === 'admin'
      ? Array.from(crypto.getRandomValues(new Uint8Array(32))).map(b => b.toString(16).padStart(2, '0')).join('')
      : null

    await db
      .prepare('INSERT INTO users (id, email, password_hash, full_name, role, affiliate_code, subdomain, admin_id, webhook_secret, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .bind(
        userId,
        email.toLowerCase(),
        passwordHash,
        fullName,
        role,
        affiliateCode,
        subdomain || null,
        role === 'affiliate' ? adminId : null,
        webhookSecret,
        now,
        now
      )
      .run()

    // Get default program and create affiliate record for admins
    if (role === 'admin') {
      const program = await db
        .prepare('SELECT id FROM programs WHERE is_active = ? LIMIT 1')
        .bind(1)
        .first()
      if (program) {
        const affiliateId = generateId()
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://affiliationpro.cashflowecosysteme.com'
        await db
          .prepare('INSERT INTO affiliates (id, program_id, user_id, affiliate_link, status, total_earnings, total_referrals, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
          .bind(
            affiliateId,
            program.id,
            userId,
            `${siteUrl}/r/${affiliateCode}`,
            'active',
            0,
            0,
            now
          )
          .run()
      }
    }

    return NextResponse.json({ success: true, userId })
  } catch (error) {
    console.error('Create user error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// UPDATE: subdomain, email, status (active/suspended), and/or webhook_secret — only the fields provided
export async function PUT(request: NextRequest) {
  try {
    const verification = await verifySuperAdmin(request)
    if (!verification.authorized) {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
    }
    const { db } = verification

    const { userId, subdomain, email, status, webhook_secret } = await request.json()
    if (!userId) {
      return NextResponse.json({ error: 'Utilisateur manquant' }, { status: 400 })
    }

    // EMAIL (courriel) — avec validation + unicité
    if (typeof email === 'string' && email.trim()) {
      const e = email.trim().toLowerCase()
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) {
        return NextResponse.json({ error: 'Courriel invalide' }, { status: 400 })
      }
      const dup = await db
        .prepare('SELECT id FROM users WHERE email = ? AND id != ?')
        .bind(e, userId)
        .first()
      if (dup) {
        return NextResponse.json({ error: 'Ce courriel est déjà utilisé par un autre compte' }, { status: 400 })
      }
      await db.prepare('UPDATE users SET email = ? WHERE id = ?').bind(e, userId).run()
    }

    // STATUT — active / suspended (désactiver / réactiver)
    if (typeof status === 'string' && status.length) {
      if (status !== 'active' && status !== 'suspended') {
        return NextResponse.json({ error: 'Statut invalide' }, { status: 400 })
      }
      await db.prepare('UPDATE users SET status = ? WHERE id = ?').bind(status, userId).run()
    }

    // SECRET WEBHOOK (corrige l'ancien comportement qui ne le sauvegardait pas)
    if (typeof webhook_secret === 'string' && webhook_secret.length) {
      await db.prepare('UPDATE users SET webhook_secret = ? WHERE id = ?').bind(webhook_secret, userId).run()
    }

    // SOUS-DOMAINE — seulement si le champ est explicitement fourni
    if (subdomain !== undefined) {
      if (subdomain) {
        const existing = await db
          .prepare('SELECT id FROM users WHERE subdomain = ? AND id != ?')
          .bind(String(subdomain).toLowerCase(), userId)
          .first()
        if (existing) {
          return NextResponse.json({ error: 'Ce sous-domaine est déjà utilisé' }, { status: 400 })
        }
      }
      await db
        .prepare('UPDATE users SET subdomain = ? WHERE id = ?')
        .bind(subdomain ? String(subdomain).toLowerCase() : null, userId)
        .run()
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Update user error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// DELETE — suppression PROTÉGÉE (uniquement les comptes vides : aucun cercle, aucun historique)
export async function DELETE(request: NextRequest) {
  try {
    const verification = await verifySuperAdmin(request)
    if (!verification.authorized) {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
    }
    const { db, userId: currentUserId } = verification

    const { userId } = await request.json()
    if (!userId) {
      return NextResponse.json({ error: 'Utilisateur manquant' }, { status: 400 })
    }

    const target = await db.prepare('SELECT id, role FROM users WHERE id = ?').bind(userId).first() as { id: string; role: string } | null
    if (!target) {
      return NextResponse.json({ error: 'Compte introuvable' }, { status: 404 })
    }
    if (target.role === 'super_admin' || userId === currentUserId) {
      return NextResponse.json({ error: 'Ce compte ne peut pas être supprimé' }, { status: 400 })
    }

    // GARDE-FOU : refuser si le compte a un cercle (personnes rattachées) ...
    const team = await db
      .prepare('SELECT COUNT(*) as c FROM users WHERE admin_id = ? OR parent_id = ?')
      .bind(userId, userId)
      .first() as { c: number } | null
    if (team && Number(team.c) > 0) {
      return NextResponse.json({ error: 'Ce compte a un cercle rattaché — désactive-le plutôt que de le supprimer.' }, { status: 400 })
    }
    // ... ou un historique (gains / parrainages)
    const aff = await db
      .prepare('SELECT total_earnings, total_referrals FROM affiliates WHERE user_id = ?')
      .bind(userId)
      .first() as { total_earnings: number; total_referrals: number } | null
    if (aff && (Number(aff.total_earnings) > 0 || Number(aff.total_referrals) > 0)) {
      return NextResponse.json({ error: 'Ce compte a un historique (gains ou cercle) — désactive-le plutôt que de le supprimer.' }, { status: 400 })
    }

    // Compte vide : suppression sûre
    await db.prepare('DELETE FROM affiliates WHERE user_id = ?').bind(userId).run()
    await db.prepare('DELETE FROM users WHERE id = ?').bind(userId).run()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete user error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// RESET PASSWORD
export async function PATCH(request: NextRequest) {
  try {
    const verification = await verifySuperAdmin(request)
    if (!verification.authorized) {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
    }
    const { db } = verification

    const { userId, newPassword } = await request.json()

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json({ error: 'Mot de passe trop court' }, { status: 400 })
    }

    const passwordHash = await hashPassword(newPassword)

    await db
      .prepare('UPDATE users SET password_hash = ? WHERE id = ?')
      .bind(passwordHash, userId)
      .run()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
