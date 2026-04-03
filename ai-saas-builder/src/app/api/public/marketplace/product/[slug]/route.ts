import { NextResponse } from 'next/server'
import { getDB } from '@/lib/db'

// GET /api/public/marketplace/product/[slug] — Get product by slug
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const db = await getDB()

    const product = await db
      .prepare(`
        SELECT p.id, p.title, p.description_short, p.description_long, p.price,
          p.commission_n1, p.commission_n2, p.commission_n3, p.affiliate_link,
          p.image_url, p.promo_code, c.name as category_name, u.full_name as seller_name
        FROM marketplace_products p
        LEFT JOIN marketplace_categories c ON p.category_id = c.id
        LEFT JOIN users u ON p.seller_id = u.id
        WHERE p.slug = ? AND p.status = 'active'
      `)
      .bind(slug)
      .first()

    if (!product) {
      return NextResponse.json({ error: 'Produit introuvable' }, { status: 404 })
    }

    return NextResponse.json({ product })
  } catch (error) {
    console.error('Public product by slug error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
