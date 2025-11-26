import React from 'react'
import { useTranslation } from 'react-i18next'
import { PiMoneyWavyBold } from 'react-icons/pi'

const PaymentNoticeBar = () => {
  const { t } = useTranslation()

  return (
    <div className='fixed top-16 md:top-20 lg:top-24 left-0 right-0 z-40 bg-[#ffd700] border-b-2 border-[#ffb800] shadow-[0_8px_20px_rgba(255,184,0,0.4)]'>
      <div className='max-w-6xl mx-auto px-4 py-3'>
        <div className='flex items-center justify-center gap-3 text-[#1a1a1a]'>
          <PiMoneyWavyBold className='text-2xl animate-pulse shrink-0' />
          <p className='text-sm md:text-base font-black uppercase tracking-wide text-center'>
            {t('hero.notice.card')}
          </p>
          <PiMoneyWavyBold className='text-2xl animate-pulse shrink-0' />
        </div>
      </div>
    </div>
  )
}

export default PaymentNoticeBar

