import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'

// Simple in-memory rate limiter (resets on redeploy)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 3 // max requests
const RATE_WINDOW = 60 * 60 * 1000 // per 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW })
    return false
  }

  entry.count++
  return entry.count > RATE_LIMIT
}

export async function POST(req: Request) {
  try {
    // Rate limiting by IP
    const forwarded = req.headers.get('x-forwarded-for')
    const ip = forwarded?.split(',')[0]?.trim() || 'unknown'

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: '送信回数の上限に達しました。しばらく時間をおいてお試しください。' },
        { status: 429 }
      )
    }

    const body = await req.json()
    const { name, kana, email, tel, company, category, message } = body

    // Honeypot: if this hidden field is filled, it's a bot
    if (body.website) {
      // Silently accept but don't send email
      return NextResponse.json({ success: true })
    }

    // Basic validation
    if (!name || !kana || !email || !category || !message) {
      return NextResponse.json(
        { success: false, error: '必須項目を入力してください。' },
        { status: 400 }
      )
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json({ success: false, error: 'Server configuration error' }, { status: 500 })
    }

    const resend = new Resend(apiKey)

    await resend.emails.send({
      from: 'STORY&Co. <support@storyandco.co>',
      to: 'support@storyandco.co',
      subject: `【STORY&Co.】新しいお問い合わせが届きました`,
       html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;color:#333;">
          <h2 style="font-size:18px;font-weight:bold;margin-bottom:32px;">新しいお問い合わせが届きました</h2>
          ${[
            ['Name', name],
            ['KanaName', kana],
            ['Email', email],
            ['tel', tel || 'なし'],
            ['companyName', company || 'なし'],
            ['Options 1', category],
          ].map(([label, value]) => `
            <div style="border-bottom:1px solid #eee;padding:16px 0;">
              <p style="font-size:12px;color:#999;margin:0 0 8px;">${label}</p>
              <p style="font-size:16px;margin:0;">${value}</p>
            </div>
          `).join('')}
          <div style="border-bottom:1px solid #eee;padding:16px 0;">
            <p style="font-size:12px;color:#999;margin:0 0 8px;">Message</p>
            <p style="font-size:16px;margin:0;white-space:pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Contact form error details:', errorMessage)
    return NextResponse.json({ success: false, error: 'Failed to send message' }, { status: 500 })
  }
}
