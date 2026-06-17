import Link from "next/link";
import Script from "next/script";
import { StarryBackground } from "@/components/starry-background";
import { FloatingOrbs, FloatingParticles } from "@/components/premium-animations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ChevronRight,
} from "lucide-react";

export default function Home() {
  return (
    <>
    <div className="relative min-h-screen overflow-hidden">
      <StarryBackground />
      <FloatingOrbs />
      <FloatingParticles />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-4 py-3 md:px-8 lg:px-12">
        {/* Left - Branding */}
        <div className="flex items-center gap-2.5">
          <img src="/Diamand_NyXia.png" alt="NyXia" className="w-10 h-10 object-contain" />
          <span className="text-2xl font-bold gradient-text">NyXia</span>
        </div>

        {/* Center - Navigation Links */}
        <div className="hidden lg:flex items-center gap-6">
          <Link href="#howitworks" className="text-sm text-zinc-400 hover:text-white transition-colors">
            Comment ça marche
          </Link>
        </div>

        {/* Right - Social + Auth */}
        <div className="flex items-center gap-3">
          {/* Social Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {/* Site Web */}
            <a href="https://lemiroirnyxia.online/" target="_blank" rel="noopener noreferrer" 
              className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-300 bg-white/5 border border-white/10 hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-500 hover:border-transparent hover:-translate-y-0.5"
              title="Site Web">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </a>
            
            {/* Facebook */}
            <a href="https://www.facebook.com/LeMiroirdeNyXia/" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-300 bg-white/5 border border-white/10 hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-500 hover:border-transparent hover:-translate-y-0.5"
              title="Facebook">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            
            {/* Instagram */}
            <a href="https://www.instagram.com/nyxia_ia/" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-300 bg-white/5 border border-white/10 hover:bg-gradient-to-br hover:from-pink-500 hover:to-orange-400 hover:border-transparent hover:-translate-y-0.5"
              title="Instagram">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            
            {/* TikTok */}
            <a href="https://www.tiktok.com/@lemiroirdenyxia" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-300 bg-white/5 border border-white/10 hover:bg-gradient-to-br hover:from-cyan-400 hover:to-pink-500 hover:border-transparent hover:-translate-y-0.5"
              title="TikTok">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
              </svg>
            </a>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-6 bg-white/10" />

          {/* Auth Buttons */}
          <Link href="/login">
            <Button variant="ghost" className="text-zinc-400 hover:text-white text-sm px-3">
              Connexion
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-16 pb-24 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="mb-6 glass-button border-purple-500/30 text-purple-300 shimmer">
            💜 Le Portail du Cercle du Miroir
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight slide-in-up">
            <span className="text-white">Offre à tes clientes une présence</span>
            <br />
            <span className="text-white">qui ne s&apos;éteint jamais.</span>
            <br />
            <span className="relative inline-block mt-2">
              {/* Glow effect behind text */}
              <span className="absolute inset-0 blur-2xl opacity-60 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-pulse" style={{ transform: 'scale(1.5)' }} />
              <span className="relative gradient-text">Sans t&apos;éteindre, toi.</span>
            </span>
          </h1>
          
          {/* Sous-titre */}
          <p className="text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto mb-10 mt-6 leading-relaxed">
            NyXia prolonge ta douceur auprès de celles que tu accompagnes — jour après jour, même quand tu n&apos;es pas là. Tu offres plus, en portant moins. Et toi, tu retrouves enfin de l&apos;espace pour respirer.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a href="https://m.me/LeMiroirdeNyXia" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="glass-button text-white border-0 px-8 py-6 text-lg group">
                Rejoindre le Miroir
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <Link href="#howitworks">
              <Button size="lg" variant="outline" className="border-purple-500/30 text-zinc-300 hover:text-white hover:bg-purple-500/10 px-8 py-6 text-lg">
                Comment ça marche ?
              </Button>
            </Link>
          </div>

          {/* NyXia Image */}
          <div className="flex justify-center mt-6 mb-8">
            <img src="/NyXia_Praticienne_SansTexte.png" alt="NyXia prolonge la présence de la praticienne auprès de ses clientes, même au repos" className="w-full max-w-4xl rounded-2xl drop-shadow-2xl border border-purple-500/20" />
          </div>
        </div>
      </section>

      {/* Ce que tu n'as plus à porter seule */}
      <section className="relative z-10 px-6 py-20 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Image NyXia — halo + flottement */}
            <div className="w-full lg:w-5/12 flex justify-center">
              <div className="relative float">
                {/* Halo lumineux */}
                <div className="absolute inset-0 -m-10 bg-gradient-to-br from-purple-600/40 via-fuchsia-500/25 to-blue-600/30 blur-3xl rounded-full" />
                <img
                  src="/NyXia-27gauche.png"
                  alt="NyXia accompagne la praticienne, jour après jour"
                  className="relative w-auto max-h-[30rem] drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Contenu */}
            <div className="w-full lg:w-7/12 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
                Ce que tu n&apos;as plus à <span className="gradient-text">porter seule.</span>
              </h2>
              <p className="text-zinc-300 text-lg mb-8 leading-relaxed">
                Tu donnes déjà tellement. Laisse NyXia porter le reste.
              </p>

              <div className="space-y-5">
                {[
                  { e: "🌙", t: "Ta présence en ligne, tenue pour toi.", d: "Pendant que tu te reposes, NyXia reste là pour les tiennes — elle répond, elle accompagne, avec ta douceur." },
                  { e: "💜", t: "Un accompagnement constant pour tes clientes.", d: "Même les jours où tu n'as plus rien à donner, celles que tu accompagnes ne sont jamais laissées seules." },
                  { e: "✨", t: "La technique, sans toi.", d: "Aucune ligne de code, aucun montage. Tu n'as pas à devenir informaticienne pour offrir une présence à la hauteur de ton cœur." },
                  { e: "🤍", t: "Ta méthode, ton âme, au centre.", d: "NyXia ne te remplace pas — elle prolonge ce que tu fais déjà de plus beau. C'est toujours toi qu'on retrouve dedans." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 text-left">
                    <span className="text-2xl leading-none mt-1 shrink-0">{item.e}</span>
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-1">{item.t}</h3>
                      <p className="text-zinc-400 leading-relaxed">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Franchir le seuil */}
      <section id="howitworks" className="relative z-10 px-6 py-24 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          {/* Bannière Portail */}
          <div className="relative mb-14 rounded-3xl overflow-hidden border border-purple-500/20 shadow-2xl">
            <img src="/Portail.png" alt="Le Portail du Cercle du Miroir — NyXia t'ouvre le seuil" className="w-full h-auto" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
          </div>

          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
              Franchir le <span className="gradient-text">seuil.</span>
            </h2>
            <p className="text-zinc-300 text-lg max-w-2xl mx-auto">
              Tu n&apos;entres pas seule. De l&apos;autre côté, un cercle de femmes qui accompagnent comme toi.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "On apprend à se connaître.",
                description: "Tu m'écris, on échange — vraiment. Je veux apprendre à te connaître : ta pratique, ce que tu portes, ce dont tu rêves. Une simple conversation sur Messenger, toi et moi (Diane).",
              },
              {
                step: "2",
                title: "Je te présente NyXia.",
                description: "En toute transparence — ce qu'elle peut t'offrir, à toi et à celles que tu accompagnes. Et je t'écoute : ton expérience est précieuse, ton avis compte vraiment. 💜",
              },
              {
                step: "3",
                title: "Tu prends ta place dans le Cercle.",
                description: "Rejoins notre communauté, NyXia • Le Cercle du Miroir™ — un refuge gratuit, parmi celles qui le bâtissent ensemble.",
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="glass-card rounded-2xl p-6 h-full">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center mb-4 text-white font-bold text-xl">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">{item.description}</p>
                </div>
                {i < 2 && (
                  <ChevronRight className="hidden md:block absolute top-1/2 -right-6 w-8 h-8 text-purple-500/50 transform -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>

          {/* Deux portes */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <a href="https://m.me/LeMiroirdeNyXia" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="glass-button text-white border-0 px-8 py-6 text-lg">
                💬 M&apos;écrire sur Messenger
              </Button>
            </a>
            <a href="https://www.skool.com/refuge-amie-dans-le-miroir-2876" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-purple-400/15 text-zinc-400 bg-white/[0.02] opacity-75 hover:opacity-100 hover:text-zinc-100 hover:border-purple-400/40 px-8 py-6 text-lg transition-all duration-300">
                ✨ Rejoindre le Cercle (gratuit)
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Ce que le Cercle te rend */}
      <section className="relative z-10 px-6 py-24 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto">
          {/* Bannière */}
          <div className="relative mb-14 rounded-3xl overflow-hidden border border-purple-500/20 shadow-2xl">
            <img src="/Enfin_on_te_voit_.png" alt="Le miroir du Cercle te renvoie enfin ta propre lumière" className="w-full h-auto" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
              Ce que le Cercle te <span className="gradient-text">rend.</span>
            </h2>
            <p className="text-zinc-300 text-lg max-w-2xl mx-auto">
              Tu donnes sans compter. Ici, pour une fois, c&apos;est toi qu&apos;on entoure.
            </p>
          </div>

          <div className="space-y-8 max-w-3xl mx-auto">
            {[
              {
                e: "🌟",
                t: "Enfin, on te voit — par les bonnes personnes.",
                d: "Tu rêves peut-être d'être plus visible, d'accueillir plus de femmes, d'en aider davantage. Et tu te dis sûrement que les réseaux le font déjà. Mais là-bas, es-tu vraiment vue — ou noyée dans le bruit, parfois même heurtée par la dureté des inconnus? Ici, c'est tout l'inverse : pas de trolls, pas de vacarme. Un cercle de femmes qui se portent les unes les autres, et une vitrine où celles qui cherchent une présence comme la tienne te trouvent enfin. Une puissance de réseautage que les grands réseaux généralistes ne t'offriront jamais : être vue par les bonnes personnes, dans un espace qui te protège.",
              },
              {
                e: "💜",
                t: "Tu n'es plus seule à porter le chemin.",
                d: "Autour de toi, des femmes qui accompagnent comme toi — qui comprennent ta fatigue autant que ta vocation. Un cercle où, pour une fois, tu peux déposer ce que tu portes, et te sentir comprise sans avoir à t'expliquer. Tu n'es plus seule.",
              },
              {
                e: "🤍",
                t: "Tes clientes aussi y ont droit — et ça ne te coûte pas ta place.",
                d: "Offrir NyXia à celles que tu accompagnes ne fait jamais concurrence à tes tarifs : elle prolonge ta présence entre vos rencontres, sans jamais te remplacer. Tes clientes ne ressentent pas une dépense de plus — elles reçoivent un accompagnement constant et tendre, un « wow » irrésistible qui les fait se sentir tenues même quand tu n'es pas là. Et quand l'une d'elles choisit cette présence par ton lien, ton propre chemin s'allège à son tour.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-3xl leading-none shrink-0 mt-1">{item.e}</span>
                <div>
                  <h3 className="text-white font-semibold text-xl mb-2">{item.t}</h3>
                  <p className="text-zinc-400 leading-relaxed">{item.d}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Le désir → la porte */}
          <div className="max-w-2xl mx-auto text-center mt-16">
            <p className="text-xl md:text-2xl text-white font-semibold mb-3">
              Et là, tu te demandes peut-être : comment, moi, j&apos;ai accès à tout ça?
            </p>
            <p className="text-zinc-300 text-lg mb-8 leading-relaxed">
              C&apos;est tout simple. Écris-moi sur Messenger — un vrai message, toi et moi (Diane). Pas d&apos;appel de vente, pas de rendez-vous à bloquer dans ton agenda. Juste une conversation, à ton rythme. 💜
            </p>
            <a href="https://m.me/LeMiroirdeNyXia" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="glass-button text-white border-0 px-8 py-6 text-lg">
                💬 Écris-moi sur Messenger
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Clôture — Le miroir te renvoie ta lumière */}
      <section className="relative z-10 px-6 py-24 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          {/* Image d'étreinte */}
          <div className="relative mb-12 rounded-3xl overflow-hidden border border-purple-500/20 shadow-2xl">
            <img src="/Tu_nes_plus_seule.png" alt="Un cercle de femmes qui s'entourent — tu n'es plus seule" className="w-full h-auto" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
          </div>

          <div className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
              <span className="gradient-text">Le miroir te renvoie enfin ta lumière.</span>
            </h2>

            <div className="space-y-5 max-w-2xl mx-auto mb-10">
              {[
                "Tu as passé ta vie à éclairer les autres. À tenir, à porter, à donner — souvent jusqu'à t'oublier.",
                "Ici, le miroir s'inverse. Pour une fois, c'est toi qu'on accueille, toi qu'on voit, toi qu'on entoure. Tu n'as plus à tout porter seule.",
                "Franchis le seuil. On t'attend, de l'autre côté. 💜",
              ].map((line, i) => (
                <p key={i} className="text-lg md:text-xl text-zinc-300 leading-relaxed">{line}</p>
              ))}
            </div>

            <a href="https://m.me/LeMiroirdeNyXia" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="glass-button text-white border-0 px-12 py-6 text-lg group">
                Rejoindre le Miroir
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-8 md:px-12 lg:px-24 border-t border-purple-500/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-zinc-500 text-sm">
            © 2026 NyXia • Le Cercle du Miroir — une présence bienveillante pour celles qui accompagnent. 💜
          </p>
        </div>
      </footer>
    </div>
    <Script
      src="https://cdn.jotfor.ms/agent/embedjs/019ed1e097ba7b95a04af318fc04e1d76991/embed.js"
      strategy="afterInteractive"
    />
    </>
  );
}
