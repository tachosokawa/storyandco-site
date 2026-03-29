'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import CommonButton from '@/components/CommonButton'

export default function ContactPage() {
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    const form = e.currentTarget
    const data: Record<string, string> = {
      name: (form.querySelector('#name') as HTMLInputElement).value,
      kana: (form.querySelector('#kana') as HTMLInputElement).value,
      email: (form.querySelector('#email') as HTMLInputElement).value,
      tel: (form.querySelector('#tel') as HTMLInputElement).value,
      company: (form.querySelector('#company') as HTMLInputElement).value,
      category: (form.querySelector('#category') as HTMLSelectElement).value,
      message: (form.querySelector('#message') as HTMLTextAreaElement).value,
    }
    // Honeypot field for bot detection
    const honeypot = (form.querySelector('#website') as HTMLInputElement)?.value
    if (honeypot) data.website = honeypot
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        throw new Error(`送信エラー: ${res.status}`)
      }
      setSent(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      alert('送信に失敗しました。もう一度お試しください。')
      console.error('Contact form error:', err)
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <div className="pt-[160px] pb-[96px] sm:pt-24 md:pt-32 lg:pt-[200px] xl:pt-[256px] sm:pb-16 md:pb-24 lg:pb-[150px] xl:pb-[200px] text-center border-b border-[#2d2a24] px-[20px] sm:px-6 md:px-8 lg:px-[40px]">
        <h1 className="font-poppins text-[48px] sm:text-6xl md:text-8xl lg:text-[50px] xl:text-[96px] [-webkit-text-stroke:1px_#2d2a24] md:[-webkit-text-stroke:2px_#2d2a24] font-semibold leading-[100%] text-center">
          <span id="mv-colorful1" className="tracking-[-0.04em]">C</span>
          <span id="mv-colorful2" className="tracking-[-0.03em]">o</span>
          <span id="mv-colorful3" className="tracking-[-0.04em]">n</span>
          <span id="mv-colorful4" className="tracking-[-0.04em]">t</span>
          <span id="mv-colorful5" className="tracking-[-0.04em]">a</span>
          <span id="mv-colorful6" className="tracking-[-0.04em]">c</span>
          <span id="mv-colorful7" className="tracking-[-0.04em]">t</span>
        </h1>
        <p className="mt-4 text-[18px] sm:text-lg md:text-xl lg:text-[20px] font-sans font-bold text-[#2d2a24] leading-[2] tracking-[0.04em]">お問い合わせ</p>
      </div>

      <div className="max-w-[760px] mx-auto py-16">
        <p className="font-sans font-medium text-[16px] md:text-base lg:text-[16px] leading-[2] tracking-[0.04em] text-[#2d2a24] mt-4 md:mt-5 text-left mx-auto px-4 md:px-0 mb-12">
          少しでもご興味持っていただけましたら、まずはお問い合わせください。
        </p>

        {sent ? (
          <div className="text-center py-16 px-[20px]">
            <p className="font-sans font-bold text-[20px] text-[#2d2a24] leading-[2] mb-4">送信が完了しました。</p>
            <p className="font-sans text-[16px] text-[#2d2a24] leading-[2]">お問い合わせありがとうございます。<br/>内容を確認のうえ、担当者よりご連絡いたします。</p>
          </div>
        ) : (
          <form className="space-y-8 px-[20px]" onSubmit={handleSubmit}>
            {/* Honeypot field - hidden from users, visible to bots */}
            <div className="absolute opacity-0 top-0 left-0 h-0 w-0 -z-10" aria-hidden="true">
              <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>
            {[
              { label: 'お名前', id: 'name', placeholder: '松岡 正剛', required: true },
              { label: 'フリガナ', id: 'kana', placeholder: 'マツオカ セイゴウ', required: true },
              { label: 'メールアドレス', id: 'email', placeholder: 'monogatari@storyandco.co', required: true, type: 'email' },
              { label: '電話番号', id: 'tel', placeholder: '00-0000-0000', type: 'tel' },
              { label: '会社・組織名', id: 'company', placeholder: '株式会社モノガタリ' },
            ].map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="font-sans block text-[13px] font-bold text-[#2d2a24] leading-[2] tracking-[0.04em] mb-3">
                  {field.label}
                  {field.required && <span className="text-[#EF4444] ml-1 text-[11px]">＊必須</span>}
                </label>
                <input
                  id={field.id}
                  type={field.type || 'text'}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="w-full border-b border-[#2d2a24] bg-transparent pb-[24px] text-[16px] font-sana text-medium placeholder-[#C0B8A8] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                />
              </div>
            ))}

            <div>
              <label htmlFor="category" className="font-sans block text-sm font-bold text-[#2d2a24] leading-[2] tracking-[0.04em] mb-8">
                お問い合わせ種別<span className="text-[#EF4444] ml-1 text-xs">＊必須</span>
              </label>
              <select
                id="category"
                required
                className="w-full border-b border-[#D0C8B8] bg-transparent pb-[32px] text-[16px] font-sana text-medium focus:outline-none focus:border-[#1A1A1A] transition-colors"
              >
                <option value="">選択してください</option>
              　<option>お仕事のご相談・ご依頼</option>
              　<option>PATCH&PLAYについて</option>
              　<option>NewMakeについて</option>
              　<option>取材・メディアについて</option>
              　<option>採用について</option>
              　<option>一緒に何かやりたい</option>
              　<option>その他</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="font-sans block text-sm font-bold text-[#2d2a24] leading-[2] tracking-[0.04em] mb-2">
                お問合せ内容<span className="text-[#EF4444] ml-1 text-xs">＊必須</span>
              </label>
              <textarea
                id="message"
                required
                rows={5}
                placeholder="記入してください"
                className="w-full border-b border-[#2d2a24] bg-transparent py-3 text-[16px] font-sana text-medium placeholder-[#C0B8A8] focus:outline-none focus:border-[#1A1A1A] transition-colors resize-none leading-[2]"
              />
            </div>

            <div>
              <p className="font-sans font-medium text-[14px] md:text-base lg:text-[16px] leading-[2] tracking-[0.04em] text-[#2d2a24] md:mt-5 text-left md:px-0 mb-6">
                個人情報の取り扱いについて、詳しくは弊社の
                <a href="/privacy" className="text-[#18bed7]">プライバシーポリシー</a>
                をご覧ください。
              </p>
              <label className="flex items-center gap-3 font-sans font-medium text-[13px] md:text-base lg:text-[16px] leading-[2] tracking-[0.04em] text-[#2d2a24] md:mt-5 text-left md:px-0 mb-10 cursor-pointer">
                <input type="checkbox" id="contact_checkbox" required className="relative w-[24px] h-[24px] md:w-[32px] md:h-[32px] accent-[#18bed7] border-1 border-[#2d2a24] bg-[#FFF] cursor-pointer" />
                プライバシーポリシーに同意して送信する
              </label>
            </div>

            <CommonButton
              buttonText={sending ? '送信中...' : '送信する'}
              type="submit"
              className='px-[20px] pt-[26px] pb-[28px] md:px-[40px] md:pt-[28px] md:pb-[30px] border-y border-[#2d2a24] hover:bg-[#18bed7] text-[#333] hover:text-[#FFF] hover:cursor-pointer text-[14px] md:text-[16px]'
            />
            <p className="font-sans font-medium text-[12px] md:text-base lg:text-[16px] leading-[2] tracking-[0.04em] text-[#2d2a24] md:mt-5 text-left md:px-0">確認画面は表示されません。上記内容にて送信されますのでご注意ください。</p>
          </form>
        )}
      </div>
    </>
  )
}
