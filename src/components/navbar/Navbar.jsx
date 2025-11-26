import React from 'react'
import { GiForkKnifeSpoon } from 'react-icons/gi'
import { NavLink } from 'react-router-dom'
import { FiHome } from 'react-icons/fi'
import logoImage from '../../image/logo.png'
import logoChuImage from '../../image/logochu.png'
import { useTranslation } from 'react-i18next'

const languages = [
  { code: 'de', label: 'DE' },
  { code: 'en', label: 'EN' },
]

const Navbar = () => {
  const { t, i18n } = useTranslation()

  const navLinks = [
    { name: t('nav.home'), to: '/', icon: <FiHome /> },
  ]

  return (
    <nav className='bg-white/95 border-b border-[#c7e5cc] shadow-[0_15px_35px_rgba(27,74,46,0.08)] fixed top-0 left-0 right-0 z-50 font-vibes backdrop-blur-lg'>
      <div className='absolute -top-2 left-1/2 -translate-x-1/2 w-full max-w-6xl px-4 pointer-events-none'>
        <div className='h-[4px] bg-linear-to-r from-transparent via-[#b4e2b5] to-transparent rounded-full shadow-[0_0_18px_rgba(91,146,94,0.4)]'>
          <div className='flex justify-between px-6'>
            <GiForkKnifeSpoon className='text-[#9ccf9e]/60 -mt-3' size={26} />
            <GiForkKnifeSpoon className='text-[#9ccf9e]/60 -mt-3' size={26} />
          </div>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-4'>
        <div className='flex justify-between items-center h-16 md:h-20 lg:h-24'>
          <NavLink
            to='/'
            className='shrink-0 flex items-center space-x-2 md:space-x-3 group relative text-[#0f2c18]'
          >
            <div className='absolute -inset-4 rounded-full blur-2xl bg-[#8fd89e]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
            <img
              src={logoImage}
              alt='Happy Kitchen logo'
              className='h-12 w-auto md:h-14 lg:h-16 object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)]'
              loading='lazy'
            />
            <img
              src={logoChuImage}
              alt='Happy Kitchen text'
              className='h-12 w-auto md:h-16 lg:h-20 object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.35)]'
              loading='lazy'
            />
          </NavLink>

          <div className='flex items-center space-x-2 md:space-x-1 lg:space-x-4 flex-1 justify-end'>
            <div className='flex items-center gap-1 bg-[#f5fbf3] border border-[#cfe6d2] rounded-full px-2 py-1 shadow-inner text-[#1d4125]'>
              {languages.map(lang => (
                <button
                  key={lang.code}
                  type='button'
                  onClick={() => i18n.changeLanguage(lang.code)}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                    i18n.language === lang.code
                      ? 'bg-[#a6d89f] text-[#0f2b18]'
                      : 'text-[#2d653d] hover:text-[#0f2b18]'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
