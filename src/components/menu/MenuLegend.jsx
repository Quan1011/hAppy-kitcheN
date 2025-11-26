import React from 'react'
import { useTranslation } from 'react-i18next'

const MenuLegend = ({ allergenLegend, additiveLegend }) => {
  const allergenEntries = Object.entries(allergenLegend)
  const additiveEntries = Object.entries(additiveLegend)
  const { t } = useTranslation()

  return (
    <section id='allergens' className='max-w-6xl mx-auto px-4 py-14'>
      <div className='bg-white/95 border border-[#d7ead6] rounded-3xl p-6 shadow-[0_20px_45px_rgba(27,74,46,0.08)] space-y-6'>
        <div>
          <p className='text-xs uppercase tracking-[0.5em] text-[#4a8f5b] mb-1'>{t('legend.badge')}</p>
          <h3 className='text-2xl font-semibold text-[#0f2b18]'>
            {t('legend.allergen')} & {t('legend.additives')}
          </h3>
        </div>

        <div className='grid gap-6 lg:grid-cols-2'>
          <div className='space-y-3'>
            <p className='text-xs uppercase tracking-[0.4em] text-[#4a8f5b]'>{t('legend.allergen')}</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#1d3c27]'>
              {allergenEntries.map(([key, label]) => (
                <div key={key} className='flex items-center gap-3 p-3 rounded-2xl bg-[#f6fcf4] border border-[#e2f2e2]'>
                  <span className='w-10 h-10 rounded-2xl bg-white border border-[#cfe6d2] flex items-center justify-center font-semibold text-[#1f4b33] shadow-inner shrink-0'>
                    {key.toUpperCase()}
                  </span>
                  <p className='leading-snug'>{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className='space-y-3'>
            <p className='text-xs uppercase tracking-[0.4em] text-[#4a8f5b]'>{t('legend.additives')}</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#1d3c27]'>
              {additiveEntries.map(([key, label]) => (
                <div key={key} className='flex items-center gap-3 p-3 rounded-2xl bg-[#f6fcf4] border border-[#e2f2e2]'>
                  <span className='w-10 h-10 rounded-2xl bg-white border border-[#cfe6d2] flex items-center justify-center font-semibold text-[#1f4b33] shadow-inner shrink-0'>
                    {key}
                  </span>
                  <p className='leading-snug'>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='space-y-3'>
          <div className='flex flex-wrap gap-4 text-sm text-[#1f3c29]'>
            <span className='inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[#f6fcf4] border border-[#dfeee0]'>
              <span className='text-lg'>🥬</span>
              {t('legend.labels.vegan')}
            </span>
            <span className='inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[#fff1ed] border border-[#ffd5c8]'>
              <span className='text-lg'>🌶️</span>
              {t('legend.labels.spicy')}
            </span>
          </div>
        </div>

        <p className='text-xs text-[#4a6155]'>{t('legend.note')}</p>
      </div>
    </section>
  )
}

export default MenuLegend

