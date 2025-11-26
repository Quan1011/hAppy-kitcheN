import React from 'react'
import { SiVisa, SiMastercard, SiApplepay, SiGooglepay } from 'react-icons/si'
import { PiMoneyWavyBold } from 'react-icons/pi'
import { useTranslation } from 'react-i18next'

const paymentOptions = [
  { name: 'EC / Girocard', description: 'Beliebte Debitkarte in Deutschland' },
  { name: 'Visa', icon: <SiVisa size={28} /> },
  { name: 'Mastercard', icon: <SiMastercard size={28} /> },
  { name: 'Apple Pay', icon: <SiApplepay size={28} /> },
  { name: 'Google Pay', icon: <SiGooglepay size={28} /> },
  { name: 'Barzahlung', icon: <PiMoneyWavyBold size={28} /> },
]

const PaymentMethods = () => {
  const { t } = useTranslation()

  return (
    <section className='max-w-6xl mx-auto px-4 py-10'>
      <div className='bg-[#0c2415]/80 border border-[#7fe0ae]/20 rounded-3xl px-6 py-8 shadow-lg shadow-black/30'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6'>
          <div>
            <p className='text-xs uppercase tracking-[0.4em] text-emerald-200/80'>{t('payments.badge')}</p>
            <h3 className='text-2xl font-semibold text-white mt-2'>{t('payments.title')}</h3>
          </div>
          <p className='text-sm text-green-100/80'>{t('payments.note')}</p>
        </div>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {paymentOptions.map(option => (
            <div
              key={option.name}
              className='flex items-center gap-3 bg-[#0f2d1b]/80 border border-[#7fe0ae]/20 rounded-2xl px-4 py-3 text-white/90'
            >
              <div className='text-[#7fe0ae]'>{option.icon}</div>
              <div>
                <p className='font-semibold'>{option.name}</p>
                {option.description && <p className='text-xs text-green-100/80'>{option.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PaymentMethods

