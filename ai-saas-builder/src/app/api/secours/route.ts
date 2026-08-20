/* eslint-disable @typescript-eslint/no-explicit-any */
// ⚠️ FICHIER TEMPORAIRE DE SECOURS — À SUPPRIMER DÈS QUE TU ES RECONNECTÉE ⚠️
// Il sert UNE seule fois : remettre un mot de passe valide sur ton compte
// et te remonter en super_admin, en utilisant la fonction de hachage de TON
// propre système (donc format garanti compatible avec ta connexion).

import { NextResponse, type NextRequest } from 'next/server'
import { getDB, generateId } from '@/lib/db'
import { hashPassword } from '@/lib/auth'

// Change cette clé si tu veux — c'est juste pour empêcher n'importe qui d'ouvrir cette page.
const CLE_SECOURS = 'miroir-secours-2026'

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)

    if (url.searchParams.get('cle') !== CLE_SECOURS) {
      return NextResponse.json({ error: 'Clé de secours invalide.' }, { status: 403 })
    }

    const email = (url.searchParams.get('email') || '').trim().toLowerCase()
    const motdepasse = url.searchParams.get('motdepasse') || ''

    if (!email || !motdepasse) {
      return NextResponse.json(
        { error: 'Il faut préciser ?cle=...&email=...&motdepasse=...' },
        { status: 400 }
      )
    }

    const db = await getDB()
    const hash = await hashPassword(motdepasse)

    // Le compte existe-t-il déjà ?
    const existing = await db
      .prepare('SELECT id FROM users WHERE email = ?')
      .bind(email)
      .first() as { id: string } | null

    if (existing) {
      // On remet le mot de passe ET on remonte le compte en super_admin
      await db
        .prepare("UPDATE users SET password_hash = ?, role = 'super_admin' WHERE id = ?")
        .bind(hash, existing.id)
        .run()

      return NextResponse.json({
        ok: true,
        action: 'compte-mis-a-jour',
        message: `C'est fait 💜 Le compte ${email} a un nouveau mot de passe et est maintenant super_admin. Connecte-toi, PUIS SUPPRIME CE FICHIER.`
      })
    }

    // Sinon, on recrée un super_admin propre
    const now = new Date().toISOString()
    await db
      .prepare(
        "INSERT INTO users (id, email, password_hash, full_name, role, created_at) VALUES (?, ?, ?, ?, 'super_admin', ?)"
      )
      .bind(generateId(), email, hash, 'Diane', now)
      .run()

    return NextResponse.json({
      ok: true,
      action: 'compte-recree',
      message: `Super_admin recréé pour ${email} 💜 Connecte-toi, PUIS SUPPRIME CE FICHIER.`
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || String(error), indice: 'Si le message parle de hashPassword, envoie-moi le fichier src/lib/auth.ts et je corrige le nom en 30 secondes.' },
      { status: 500 }
    )
  }
}
