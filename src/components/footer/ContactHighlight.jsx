import React from 'react'
import { FiMapPin, FiPhone, FiMessageCircle } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'

const infoItems = [
  {
    key: 'address',
    icon: FiMapPin,
    value: ['Lange Str. 65', '76530 Baden-Baden'],
    href: 'https://maps.app.goo.gl/Sr1cSj2Ls2ji7Zg97?g_st=afm',
  },
  {
    key: 'phone',
    icon: FiPhone,
    value: ['+49 7221 3774184'],
    href: 'tel:+4972213774184',
  },
  {
    key: 'whatsapp',
    icon: FiMessageCircle,
    value: ['+49 162 911 3085'],
    href: 'https://wa.me/491629113085',
  },
]

const ContactHighlight = () => {
  const { t } = useTranslation()

  return (
    <section className='px-4'>
      <div className='max-w-6xl mx-auto bg-white/90 border border-[#cfe6d2] rounded-3xl shadow-[0_12px_35px_rgba(23,75,40,0.08)] p-6 md:p-8'>
        <div className='flex flex-wrap gap-4 md:gap-6 justify-between'>
          {infoItems.map(item => {
            const Icon = item.icon
            return (
              <a
                key={item.key}
                href={item.href}
                target={item.key === 'address' || item.key === 'whatsapp' ? '_blank' : undefined}
                rel='noreferrer'
                className='flex-1 min-w-[200px] flex gap-3 items-start bg-[#f5fbf3] border border-[#d7ead2] rounded-2xl px-4 py-3 text-[#123321] hover:border-[#a4d6a5] hover:shadow-[0_10px_25px_rgba(44,112,62,0.12)] transition-all duration-200'
              >
                <div className='shrink-0 p-2 rounded-xl bg-[#e4f4e2] text-[#2d7b47]'>
                  <Icon size={20} />
                </div>
                <div>
                  <p className='text-xs uppercase tracking-[0.4em] text-[#3c8050] font-semibold mb-1'>{t(`footer.${item.key}`)}</p>
                  {item.value.map(line => (
                    <p key={line} className='text-base font-semibold'>
                      {line}
                    </p>
                  ))}
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ContactHighlight


