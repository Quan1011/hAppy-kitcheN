import React from 'react'
import { useTranslation } from 'react-i18next'
import bannerImage from '../../image/banner.png'

const Banner = () => {
  const { t } = useTranslation()

  return (
    <section className='relative text-white overflow-hidden'>
      {/* Background Image */}
      <div className='absolute inset-0 z-0'>
        <img
          src={bannerImage}
          alt='Banner background'
          className='w-full h-full object-cover'
          loading='eager'
        />
        {/* Dark overlay for better text readability */}
        <div className='absolute inset-0 bg-black/20' />
      </div>

      {/* Content Overlay */}
      <div className='relative z-10 max-w-6xl mx-auto px-4 py-16 grid gap-10 md:grid-cols-[1.2fr,0.8fr] items-center'>
        <div>
          <p className='text-2xl font-bold uppercase tracking-[0.5em] text-[#a6f09d] mb-4 drop-shadow'>{t('hero.badge')}</p>
          <h1 className='text-3xl md:text-5xl font-bold leading-tight text-white drop-shadow-lg'>{t('hero.title')}</h1>
          {/* <p className='text-stone-100 mt-4 text-lg drop-shadow-md'>{t('hero.description')}</p> */}
          <div className='mt-6 bg-white/85 text-[#123321] border border-[#d7ead6] rounded-2xl p-5 shadow-[0_10px_30px_rgba(17,45,25,0.2)] backdrop-blur-sm'>
            <p className='text-xs text-[#4a6155] mt-1'>{t('hero.notice.effective')}</p>
            <p className='text-xs text-[#4a6155] mt-2'>{t('hero.notice.extra')}</p>
          </div>
        </div>
        <div className='bg-white/80 border-2 border-[#d7ead6] rounded-3xl p-4 sm:p-6 shadow-[0_25px_45px_rgba(0,0,0,0.3)] text-center'>
          
          <h2 className='text-xl sm:text-3xl font-black uppercase tracking-widest text-[#123321] mb-4 sm:mb-6 drop-shadow-md font-sans'>
            {t('hero.hours.title', 'OPENING TIME')}
          </h2>
          <div className='grid grid-cols-3 gap-2'>
            {/* Ô 1 */}
            <div className='bg-[#eafae8] rounded-xl px-1 py-2 sm:px-2 sm:py-3 flex flex-col items-center justify-center shadow-inner h-full'>
                <div className='w-full h-8 sm:h-14 px-1 flex items-center justify-center border-b border-black/80 bg-[#e3f5e1]'>
                    <span className='text-[8px] sm:text-[10px] font-bold uppercase text-black text-center leading-tight'>
                        {t('hero.hours.weekday', 'MON - FRI')}
                    </span>
                </div>
                <div className='flex-1 w-full flex flex-col items-center justify-center py-2 px-1'>
                    <span className='text-[10px] sm:text-base font-bold text-black whitespace-nowrap'>
                        11:30 - 14:30
                    </span>
                    <span className='text-[10px] sm:text-base font-bold text-black whitespace-nowrap'>
                        17:00 - 22:00
                    </span>
                </div>
            </div>
            {/* Ô 2 */}
            <div className='bg-[#eafae8] rounded-xl px-1 py-2 sm:px-2 sm:py-3 flex flex-col items-center justify-center shadow-inner h-full'>
                <div className='w-full h-8 sm:h-14 px-1 flex items-center justify-center border-b border-black/80 bg-[#e3f5e1]'>
                    <span className='text-[8px] sm:text-[10px] font-bold uppercase text-black text-center leading-tight'>
                        {t('hero.hours.wednesday', 'WEDNESDAY')}
                    </span>
                </div>
                <div className='flex-1 w-full flex flex-col items-center justify-center py-2 px-1'>
                    <span className='text-[10px] sm:text-base font-bold text-black whitespace-nowrap'>
                        Ruhetag
                    </span>
                </div>
            </div>
            {/* Ô 3 */}
            <div className='bg-[#eafae8] rounded-xl px-1 py-2 sm:px-2 sm:py-3 flex flex-col items-center justify-center shadow-inner h-full'>
                <div className='w-full h-8 sm:h-14 px-1 flex items-center justify-center border-b border-black/80 bg-[#e3f5e1]'>
                    <span className='text-[8px] sm:text-[9px] font-bold uppercase text-black text-center leading-tight break-words'>
                        {t('hero.hours.saturday', 'SATURDAY')} - {t('hero.hours.sunday', 'SUNDAY')}
                        <br className='block sm:hidden' /> {/* Ngắt dòng trên mobile nếu quá dài */}
                        <span className='hidden sm:inline'> - </span>
                        {t('hero.hours.holiday', 'HOLIDAY')}
                    </span>
                </div>
                <div className='flex-1 w-full flex flex-col items-center justify-center py-2 px-1'>
                    <span className='text-[10px] sm:text-base font-bold text-black whitespace-nowrap'>
                        13:00 - 22:00
                    </span>
                </div>
            </div>
          </div>
          <div className='mt-6 bg-[#f0fbf0] border border-[#cfe6d2] rounded-2xl p-2 text-sm text-[#1f3c29]'>
            <p className='font-semibold text-[#0f2b18]'>{t('hero.reservation.title')}</p>
            <p className='text-[#4a6155] mt-1'>{t('hero.reservation.description')}</p>
          </div>
        </div>
        {/* <div className='bg-white/80 text-[#123321] border border-[#d7ead6] rounded-3xl p-6 backdrop-blur-md shadow-[0_25px_45px_rgba(24,66,39,0.15)]'>
          <div className='flex items-center justify-between text-sm uppercase tracking-wide text-[#4a6155]'>
            <span className='font-semibold'>{t('hero.hours.title')}</span>
            <span className='text-[#1f5b38] font-semibold'>{t('hero.hours.daily')}</span>
          </div>
          <div className='mt-4 space-y-3 text-[#1f3c28] text-sm'>
            <div className='flex justify-between'>
              <span>{t('hero.hours.weekday')}</span>
              <span>11:30 – 22:00</span>
            </div>
            <div className='flex justify-between'>
              <span>{t('hero.hours.saturday')}</span>
              <span>12:00 – 23:00</span>
            </div>
            <div className='flex justify-between'>
              <span>{t('hero.hours.sunday')}</span>
              <span>12:00 – 21:00</span>
            </div>
          </div>
          <div className='mt-6 bg-[#f0fbf0] border border-[#cfe6d2] rounded-2xl p-4 text-sm text-[#1f3c29]'>
            <p className='font-semibold text-[#0f2b18]'>{t('hero.reservation.title')}</p>
            <p className='text-[#4a6155] mt-1'>{t('hero.reservation.description')}</p>
          </div>
        </div> */}
      </div>
    </section>
  )
}

export default Banner
