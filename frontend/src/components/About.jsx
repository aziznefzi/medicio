import React from 'react'
import { useTranslation } from 'react-i18next'
import aboutUs from '../image/about.jpg'
export default function About() {
  const { t } = useTranslation()
  return (
    <section className='py-16 bg-[var(--bg-primary)]' >
        <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-[#0097a5] mb-3'>{t('about_us')}</h2>
            <p className='mt-4 text-[var(--text-secondary)] max-w-2xl mx-auto'>{t('about_desc')}</p>
        </div>
        <div className='max-w-6xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 gap-8 px-4'>
            <div className='relative'>
                <img className='rounded-lg shadow-md' src={aboutUs} alt="" />
                <a href="https://www.youtube.com/watch?v=aqnJvAb_uS0" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className='absolute inset-0 flex items-center justify-center'>
                    <div className='bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-full p-4 shadow-lg 
                    hover:scale-110 transition'>
                        {t('play')}
                    </div>
                </a>
            </div>
            <div>
                <h3 className='text-xl font-semibold mb-4'>{t('about_commitment')}</h3>
                 <p className='text-[#008e9b]'>{t('about_strive')}</p>
                    <ul className='space-y-2 mb-4 mt-5'>
                      <li> &#10003; {t('about_feature1')}</li>
                      <li> &#10003; {t('about_feature2')}</li>
                      <li> &#10003; {t('about_feature3')}</li>
                    </ul>
            </div>
        </div>
    </section>
  )
}
