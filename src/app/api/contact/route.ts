import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, kana, email, tel, company, category, message } = body

    const resend = new Resend(process.env.RESEND_API_KEY)

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
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}
