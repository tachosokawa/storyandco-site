import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const body = await req.json()
  const { name, kana, email, tel, company, category, message } = body

  try {
    await resend.emails.send({
      from: 'STORY&Co. <onboarding@resend.dev>',
      to: 'takuhosokawa@gmail.com',
      subject: `【STORY&Co.】新しいお問い合わせが届きました`,
      html: `
        <p><strong>お名前：</strong>${name}</p>
        <p><strong>フリガナ：</strong>${kana}</p>
        <p><strong>メール：</strong>${email}</p>
        <p><strong>電話番号：</strong>${tel || 'なし'}</p>
        <p><strong>会社名：</strong>${company || 'なし'}</p>
        <p><strong>種別：</strong>${category}</p>
        <p><strong>内容：</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
      `,
    })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
