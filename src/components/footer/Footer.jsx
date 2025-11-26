import React from 'react'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className='mt-16 bg-[#dbeedd] border-t border-[#c4e0c8]'>
      <div className='max-w-6xl mx-auto px-4 py-10 flex flex-col gap-4 text-[#1f3c29]'>
        <div className='flex flex-col gap-1'>
          <p className='text-xs uppercase tracking-[0.5em] text-[#4a8f5b]'>Happy Kitchen</p>
          <p className='text-lg font-semibold'>{t('footer.tagline')}</p>
        </div>
        <p className='text-sm text-[#4a6155]'>{t('footer.note')}</p>
      </div>
      <div className='border-t border-[#cfe6d2] text-center text-xs text-[#4a6155] py-4'>
        © {new Date().getFullYear()} hAppy kitcheN. {t('footer.copyright')}
      </div>
    </footer>
  )
}

export default Footer

