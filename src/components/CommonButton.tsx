interface CommonButtonProps {
  buttonText: string
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export default function CommonButton({
  buttonText,
  type,
  className = 'px-[40px] pt-[28px] pb-[30px] border-t border-[#2d2a24] hover:bg-[#18bed7] text-[#333] hover:text-[#FFF] hover:cursor-pointer text-[16px]'
}: CommonButtonProps) {
  return (
    <button
      type={type || 'button'}
      className={`${className} group inline-flex w-full items-center transition-all justify-between font-bold`}
    >
      {buttonText}
      <img src="/images/clients/arrow-long-right.svg" alt="" className='w-[16px] md:w-[20px] group-hover:hidden' loading="lazy" width={20} height={12} />
      <img src="/images/clients/arrow-long-right-white.svg" alt="" className='w-[16px] md:w-[20px] hidden group-hover:block' loading="lazy" width={20} height={12} />
    </button>
  )
}
