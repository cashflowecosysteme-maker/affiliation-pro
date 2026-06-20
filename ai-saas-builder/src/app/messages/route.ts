/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, type NextRequest } from 'next/server'
import { getDB, generateId } from '@/lib/db'
import { getSession } from '@/lib/auth'

// Une membre connectée écrit à l'administration (Super Admin)
export async function POST(request: NextRequest) {
  try {
    const session = await getSession(request)
    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const db = await getDB()
    const { subject, content } = await request.json()

    if (!content || !String(content).trim()) {
      return NextResponse.json({ error: 'Le message ne peut pas être vide' }, { status: 400 })
    }

    // Destinataire = le Super Admin (le premier créé)
    const admin = await db
      .prepare("SELECT id FROM users WHERE role = 'super_admin' ORDER BY created_at ASC LIMIT 1")
      .first() as { id: string } | null

    if (!admin) {
      return NextResponse.json({ error: 'Administration introuvable' }, { status: 500 })
    }

    const now = new Date().toISOString()
    const subj = subject && String(subject).trim() ? String(subject).trim() : 'Message d\u2019une membre'

    await db
      .prepare('INSERT INTO messages (id, sender_id, recipient_id, subject, content, is_broadcast, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)')
      .bind(generateId(), session.userId, admin.id, subj, String(content).trim(), 0, now)
      .run()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact message error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
