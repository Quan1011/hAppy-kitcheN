import React from 'react'
import MenuItemCard from './MenuItemCard'
import { useTranslation } from 'react-i18next'

const MenuSection = ({ section }) => {
  const { t } = useTranslation()
  const sectionKey = `menu.sections.${section.id}`
  const translatedTitle = t(`${sectionKey}.title`, { defaultValue: section.title })
  const translatedDescription = t(`${sectionKey}.description`, { defaultValue: section.description })

  return (
    <section id={section.id} className='max-w-6xl mx-auto px-4 py-10'>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6'>
        <div>
          <p className='text-sm uppercase tracking-[0.4em] text-[#4a8f5b] mb-2'>{t('section.label')}</p>
          <h2 className='text-3xl font-bold text-[#0f2b18]'>{translatedTitle}</h2>
          {translatedDescription && <p className='text-[#3c5b45] mt-2 max-w-2xl'>{translatedDescription}</p>}
        </div>
        {section.cta && (
          <span className='text-xs uppercase tracking-widest text-[#1f4b33] bg-[#e9f8e7] border border-[#cfe6d2] rounded-full px-4 py-2'>
            {section.cta}
          </span>
        )}
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        {section.items.map(item => (
          <MenuItemCard key={`${section.id}-${item.code}-${item.name}`} item={item} fallbackImage={section.image} />
        ))}
      </div>
    </section>
  )
}

export default MenuSection

