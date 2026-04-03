import { redirect } from 'next/navigation'
import { getDB } from '@/lib/db'
import { headers } from 'next/headers'

// Force dynamic rendering — no static caching
export const dynamic = 'force-dynamic'
export const runtime = 'edge'

interface Props {
  params: Promise<{ code: string }>
}

export default async function ReferralRedirectPage({ params }: Props) {
  const { code } = await params

  if (!code) {
    redirect('/signup')
  }

  // Track referral click server-side (fire-and-forget, don't block redirect)
  try {
    const db = await getDB()
    const normalizedCode = code.toUpperCase()

    // Find user by affiliate code
    const user = await db
      .prepare('SELECT * FROM users WHERE affiliate_code = ?')
      .bind(normalizedCode)
      .first() as any

    if (user) {
      // Find affiliate record
      const affiliate = await db
        .prepare('SELECT id FROM affiliates WHERE user_id = ? AND status = ?')
        .bind(user.id, 'active')
        .first() as any

      if (affiliate) {
        // Get request headers for tracking
        const headersList = await headers()
        const clickId = crypto.randomUUID()
        await db
          .prepare(
            'INSERT INTO clicks (id, affiliate_id, ip_address, user_agent, referrer_url, landing_url, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)'
          )
          .bind(
            clickId,
            affiliate.id,
            headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || null,
            headersList.get('user-agent') || null,
            headersList.get('referer') || null,
            `/r/${code}`,
            new Date().toISOString()
          )
          .run()
      }
    }
  } catch (error) {
    // Don't let tracking errors block the redirect
    console.error('Referral tracking error (non-blocking):', error)
  }

  // Always redirect to signup with the referral code
  redirect(`/signup?ref=${code}`)
}
