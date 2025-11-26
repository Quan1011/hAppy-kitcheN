import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Navbar from '../../components/navbar/Navbar'
import PaymentNoticeBar from '../../components/common/PaymentNoticeBar'
import Banner from '../../components/banner/Banner'
import ContactHighlight from '../../components/footer/ContactHighlight'
import MenuNavigator from '../../components/menu/MenuNavigator'
import MenuSection from '../../components/menu/MenuSection'
import MenuLegend from '../../components/menu/MenuLegend'
import Footer from '../../components/footer/Footer'
import { menuSections, allergenLegend, additiveLegend } from '../../data/menuData'

const Home = () => {
  const { t } = useTranslation()
  const [activeSection, setActiveSection] = useState('all')

  const visibleSections = useMemo(() => {
    if (activeSection === 'all') return menuSections
    return menuSections.filter(section => section.id === activeSection)
  }, [activeSection])

  return (
    <div className='min-h-screen bg-[#e4f4e2] text-[#082414] relative'>
      <Navbar />
      <PaymentNoticeBar />
      <main className='pt-32 md:pt-36 lg:pt-40 space-y-10'>
        <Banner />
        <ContactHighlight />
        <MenuNavigator sections={menuSections} activeSection={activeSection} onSelect={setActiveSection} />
        <div className='space-y-6'>
          {visibleSections.map(section => (
            <MenuSection key={section.id} section={section} />
          ))}
        </div>
        <MenuLegend allergenLegend={allergenLegend} additiveLegend={additiveLegend} />
        <Footer />
      </main>

      <button
        type='button'
        onClick={() => {
          const target = document.getElementById('menu-start')
          target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }}
        className='fixed bottom-6 right-6 z-40 inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0f2d1a] text-white shadow-[0_12px_25px_rgba(4,17,9,0.35)] hover:bg-[#17442a] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#7fe0ae]'
        aria-label={t('navigator.scrollTop')}
      >
        ↑
      </button>
    </div>
  )
}

export default Home
