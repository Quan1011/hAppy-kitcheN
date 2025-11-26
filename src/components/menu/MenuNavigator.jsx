import React from 'react'
import { useTranslation } from 'react-i18next'

const MenuNavigator = ({ sections, activeSection, onSelect }) => {
  const { t } = useTranslation()

  const handleSelect = id => {
    if (activeSection === id) {
      onSelect('all')
      const resetTarget = document.getElementById('menu-start')
      if (resetTarget) {
        resetTarget.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      return
    }
    onSelect(id)
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleScrollToLegend = () => {
    const legend = document.getElementById('allergens')
    if (legend) {
      legend.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className='max-w-6xl mx-auto px-2 py-2 mb-0' id='menu-start'>
      <div className='bg-white/90 border border-[#cfe6d2] rounded-3xl p-4 shadow-[0_15px_40px_rgba(34,77,48,0.08)]'>
        <div className='flex items-center justify-between mb-4'>
          <div>
            <p className='text-xs uppercase tracking-[0.4em] text-[#4a8f5b]'>{t('navigator.badge')}</p>
            <h3 className='text-lg font-semibold text-[#0f2d1a] mt-1'>{t('navigator.title')}</h3>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3'>
          {sections.map(section => (
            <button
              key={section.id}
              type='button'
              onClick={() => handleSelect(section.id)}
              className={`px-4 py-2 rounded-2xl border text-sm font-semibold transition-all sm:shrink-0 ${
                activeSection === section.id
                  ? 'bg-[#a9dbb0] border-transparent text-[#0d2c1a] shadow-[0_8px_20px_rgba(33,85,47,0.25)]'
                  : 'bg-transparent border-[#d6ead8] text-[#2d653d] hover:border-[#a9dbb0]'
              }`}
            >
              {section.title}
            </button>
          ))}
          <button
            type='button'
            onClick={handleScrollToLegend}
            className='px-4 py-2 rounded-2xl border text-sm font-semibold transition-all sm:shrink-0 bg-transparent border-[#d6ead8] text-[#2d653d] hover:border-[#a9dbb0]'
          >
            {t('legend.allergen')} & {t('legend.additives')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default MenuNavigator

