import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function CallToAction() {
  const { t } = useTranslation()
  return (
    <section className='bg-[#0097a5] text-white py-20'>
        <div className='max-w-4xl mx-auto text-center px-4'>
            <h3 className='text-3xl font-bold mb-4'>{t('cta_title')}</h3>
            <p className='mt-2 mb-2'>{t('cta_desc')}</p>
            <Link to="/addappointment" className='inline-block mt-4 px-8 py-3 bg-white text-[#0097a5] rounded-lg font-bold hover:bg-gray-100 transition duration-300'>
                {t('make_appointment')}
            </Link>
        </div>
    </section>
  )
}
