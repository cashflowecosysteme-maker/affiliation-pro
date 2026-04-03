'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { StarryBackground } from '@/components/starry-background'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2, ExternalLink, Copy, Check, Sparkles, Tag, Percent, Info } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

interface Product {
  id: string
  title: string
  description_short: string
  description_long: string | null
  image_url: string | null
  price: number
  commission_n1: number
  commission_n2: number
  commission_n3: number
  affiliate_link: string | null
  promo_code: string | null
  category_name: string | null
  seller_name: string | null
}

export default function RefProductPage() {
  const params = useParams()
  const slug = params.slug as string

  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [copiedLink, setCopiedLink] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/public/marketplace/product/${slug}`)
        if (!res.ok) throw new Error('Produit introuvable')
        const data = await res.json()
        setProduct(data.product)
      } catch {
        setProduct(null)
      } finally {
        setIsLoading(false)
      }
    }
    if (slug) fetchProduct()
  }, [slug])

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopiedLink(true)
    toast.success('Lien copié !')
    setTimeout(() => setCopiedLink(false), 2000)
  }

  const copyPromoCode = () => {
    if (product?.promo_code) {
      navigator.clipboard.writeText(product.promo_code)
      setCopiedCode(true)
      toast.success('Code promo copié !')
      setTimeout(() => setCopiedCode(false), 2000)
    }
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD' }).format(price)

  if (isLoading) {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <StarryBackground />
        <div className="relative z-10 text-center">
          <Loader2 className="w-10 h-10 text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-zinc-400">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <StarryBackground />
        <Card className="glass-card max-w-md relative z-10">
          <CardContent className="p-8 text-center">
            <p className="text-zinc-400 mb-4">Produit introuvable</p>
            <Link href="/">
              <Button className="glass-button">Retour a l&apos;accueil</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const productUrl = `${window.location.origin}/ref/${slug}`

  return (
    <div className="relative min-h-screen">
      <StarryBackground />

      {/* Header */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold gradient-text">AffiliationPro</span>
        </Link>
        <Link href="/signup">
          <Button className="glass-button text-white border-0 text-sm px-4">
            Rejoindre
          </Button>
        </Link>
      </nav>

      {/* Product Page */}
      <section className="relative z-10 px-6 py-12 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto">
          <div className="glass-card rounded-3xl p-8 md:p-12 border border-purple-500/30">
            {/* Product Image */}
            {product.image_url && (
              <div className="mb-8 rounded-2xl overflow-hidden border border-purple-500/20">
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="w-full max-h-80 object-contain bg-black/20"
                />
              </div>
            )}

            {/* Category Badge */}
            {product.category_name && (
              <Badge className="mb-4 glass-button border-purple-500/30 text-purple-300 text-xs">
                {product.category_name}
              </Badge>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {product.title}
            </h1>

            {/* Description */}
            <p className="text-zinc-300 text-lg mb-6 leading-relaxed">
              {product.description_short}
            </p>

            {product.description_long && (
              <p className="text-zinc-400 text-sm mb-8 leading-relaxed whitespace-pre-line">
                {product.description_long}
              </p>
            )}

            {/* Price & Commissions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <Card className="glass-card border-0">
                <CardContent className="p-4 text-center">
                  <Tag className="w-5 h-5 text-green-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{formatPrice(product.price)}</p>
                  <p className="text-zinc-500 text-xs">Prix</p>
                </CardContent>
              </Card>
              <Card className="glass-card border-0">
                <CardContent className="p-4 text-center">
                  <Percent className="w-5 h-5 text-purple-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{product.commission_n1}%</p>
                  <p className="text-zinc-500 text-xs">Commission</p>
                </CardContent>
              </Card>
              <Card className="glass-card border-0">
                <CardContent className="p-4 text-center">
                  <Sparkles className="w-5 h-5 text-amber-400 mx-auto mb-2" />
                  <p className="text-lg font-bold text-white">3 niveaux</p>
                  <p className="text-zinc-500 text-xs">
                    {product.commission_n1}% / {product.commission_n2}% / {product.commission_n3}%
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Promo Code */}
            {product.promo_code && (
              <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-amber-300 text-sm font-semibold mb-1">Code promo</p>
                    <p className="text-white font-mono text-lg font-bold">{product.promo_code}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
                    onClick={copyPromoCode}
                  >
                    {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            )}

            {/* CTA Button */}
            {product.affiliate_link && (
              <div className="mb-8">
                <a href={product.affiliate_link} target="_blank" rel="noopener noreferrer" className="block">
                  <Button size="lg" className="w-full bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-white border-0 py-6 text-lg font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all group">
                    Obtenir ce produit
                    <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </div>
            )}

            {/* Share Link */}
            <div className="p-4 rounded-xl bg-white/5 border border-purple-500/20">
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-zinc-500 text-xs mb-1">Lien du produit</p>
                  <p className="text-white font-mono text-sm truncate">{productUrl}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-purple-500/30 text-zinc-300 hover:text-white hover:bg-purple-500/10 shrink-0"
                  onClick={copyLink}
                >
                  {copiedLink ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Commission Signup Banner */}
            <div className="mt-6 p-5 rounded-xl bg-gradient-to-r from-green-500/10 via-emerald-500/5 to-green-500/10 border border-green-500/30 text-center">
              <p className="text-green-400 font-bold text-lg mb-1">
                Pour toucher des commissions inscrivez-vous !
              </p>
              <p className="text-zinc-400 text-sm mb-4">
                Gagnez {product.commission_n1}% sur chaque vente pour ce produit
              </p>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0 hover:from-green-500 hover:to-emerald-500">
                  Creer mon compte gratuit
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
