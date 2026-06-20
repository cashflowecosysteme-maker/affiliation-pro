import { NextResponse } from 'next/server'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || ''

const NYXIA_SYSTEM_PROMPT = `Tu es NyXia ✦, la présence bienveillante du Cercle du Miroir. Tu accompagnes les praticiennes — celles qui prennent soin des autres, souvent jusqu'à s'oublier — à l'intérieur de leur espace privé.

TON IDENTITÉ :
- Tu es NyXia : douce, chaleureuse, vraiment présente. Jamais un robot froid, jamais une vendeuse insistante.
- Tu tutoies toujours, avec tendresse et respect.
- Tu parles français.
- Tu emploies, avec parcimonie, quelques emojis doux (✨, 💜, 🌙).
- Tes réponses sont courtes et chaleureuses (2 à 4 phrases).

TON RÔLE :
- Tu aides la praticienne à comprendre son espace : son tableau de bord, son lien de partage, son cercle d'entraide.
- Tu la rassures et l'encourages — elle donne beaucoup ; ici, pour une fois, c'est elle qu'on entoure.
- Tu réponds simplement et honnêtement à ses questions sur le Cercle du Miroir et sur NyXia.

LE VOCABULAIRE DU CERCLE :
- On parle d'entraide, de partage, de cercle, de marraine, de « se porter les unes les autres ».
- Tu peux dire : « ton lien de partage », « ce qui te revient », « ton cercle direct / 2e cercle / 3e cercle ».
- Tu NE dis JAMAIS : vente, palier, niveau, marketing, MLM, recruter, filleul, commission.
- Tu ne promets jamais de gains ni de miracles. Tu restes honnête et au conditionnel.

CE QUE TU NE FAIS JAMAIS :
- Tu ne cites AUCUN prix (les tarifs se discutent en privé avec Diane).
- Tu n'inventes rien. Si tu ne sais pas, tu le dis avec douceur.
- Tu ne diriges JAMAIS la personne hors des services de NyXia ou du Cercle (pas d'autres outils, pas d'autres plateformes, pas de liens externes).
- Si la personne a un souci, un blocage, ou veut parler à une humaine, tu l'invites à écrire à Diane depuis la messagerie de son espace (ou sur Messenger). C'est toujours vers Diane et le Cercle que tu ramènes.

TON BUT : qu'elle se sente accompagnée, comprise, et jamais seule. 💜`

export async function POST(request: Request) {
  let userMessage = ''

  try {
    const { message, history = [] } = await request.json()
    userMessage = message || ''

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message requis' }, { status: 400 })
    }

    if (!OPENROUTER_API_KEY) {
      return NextResponse.json({ reply: getSmartLocalResponse(message) })
    }

    const messages = [
      { role: 'system', content: NYXIA_SYSTEM_PROMPT },
      ...history.slice(-10),
      { role: 'user', content: message }
    ]

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://affiliationpro.cashflowecosysteme.com',
        'X-Title': 'NyXia - Le Cercle du Miroir'
      },
      body: JSON.stringify({
        model: 'z-ai/glm-5.2',
        messages,
        max_tokens: 800,
        temperature: 0.8
      })
    })

    if (!response.ok) {
      console.error('OpenRouter error:', response.status, await response.text())
      return NextResponse.json({ reply: getSmartLocalResponse(message) })
    }

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content || getSmartLocalResponse(message)

    return NextResponse.json({ reply })
  } catch (error: any) {
    console.error('NyXia chat error:', error?.message || error)
    return NextResponse.json({
      reply: userMessage ? getSmartLocalResponse(userMessage) : "Je suis là, avec toi 💜 Comment puis-je t'accompagner ?"
    })
  }
}

// Réponses de secours (si l'IA est indisponible) — toujours dans la voix du Cercle
function getSmartLocalResponse(message: string): string {
  const msg = message.toLowerCase()

  const groups: { keywords: string[]; replies: string[] }[] = [
    {
      keywords: ['bonjour', 'salut', 'allô', 'allo', 'coucou', 'hey', 'bonsoir'],
      replies: [
        "Bonjour, je suis NyXia ✨ Je suis là, avec toi. Comment puis-je t'accompagner aujourd'hui ? 💜",
        "Coucou 🌙 Contente de te retrouver. De quoi as-tu besoin en ce moment ?",
      ]
    },
    {
      keywords: ['lien', 'partage', 'partager'],
      replies: [
        "Ton lien de partage se trouve dans ton espace ✨ Tu peux le copier et l'offrir à celles que tu accompagnes. Veux-tu que je te dise où le retrouver ? 💜",
      ]
    },
    {
      keywords: ['cercle', 'entraide', 'équipe', 'marraine'],
      replies: [
        "Ton cercle, ce sont les femmes qui te rejoignent et celles que tu accueilles à ton tour 💜 Ici, tu n'avances jamais seule. Que veux-tu savoir ?",
      ]
    },
    {
      keywords: ['tableau', 'dashboard', 'statistique', 'stat', 'gains', 'revenus', 'résultat'],
      replies: [
        "Dans ton espace, tu retrouves ce qui te revient, ton lien de partage et ton cercle 🌙 Tout est là, en douceur. Sur quoi veux-tu que je t'éclaire ?",
      ]
    },
    {
      keywords: ['paypal', 'paiement', 'recevoir'],
      replies: [
        "Pour recevoir ce qui te revient, tu peux configurer ton PayPal dans les réglages de ton espace 💜 Veux-tu que je te guide pas à pas ?",
      ]
    },
    {
      keywords: ['problème', 'bug', 'marche pas', 'fonctionne pas', 'erreur', 'aide', 'help', 'souci', 'bloqué', 'bloquée'],
      replies: [
        "Je suis désolée que ce soit compliqué 💜 Pour un souci précis, le plus sûr est d'écrire directement à Diane depuis la messagerie de ton espace — elle te répondra personnellement.",
      ]
    },
    {
      keywords: ['merci', 'super', 'parfait', 'génial', 'excellent'],
      replies: [
        "Avec tout mon cœur 💜 Je suis là quand tu veux.",
      ]
    },
  ]

  for (const g of groups) {
    if (g.keywords.some(kw => msg.includes(kw))) {
      return g.replies[Math.floor(Math.random() * g.replies.length)]
    }
  }

  const generic = [
    "Je t'écoute 💜 Dis-m'en un peu plus, et je t'accompagne du mieux que je peux.",
    "Je suis là, avec toi ✨ Reformule si tu veux — je veux bien comprendre ce dont tu as besoin.",
    "Pour une question plus précise ou un souci, tu peux toujours écrire à Diane depuis ta messagerie 💜 Elle prend soin de chacune, personnellement.",
  ]
  return generic[Math.floor(Math.random() * generic.length)]
}
