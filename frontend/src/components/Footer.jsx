import React from 'react'
import { useTranslation } from 'react-i18next'
import { Phone, Mail, Heart } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className='bg-[#002d32] text-white pt-16 pb-8'>
      <div className='max-w-7xl mx-auto px-4 md:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12 mb-12'>
          
          {/* Brand & Thanks */}
          <div className='space-y-6'>
            <Link to="/" className='text-3xl font-bold flex items-center gap-2 text-[#008e9d]'>
              <Heart fill="#008e9d" size={32} />
              <span className='text-white'>Care</span>Point
            </Link>
            <p className='text-gray-400 leading-relaxed max-w-sm'>
              {t('footer_thanks')}
            </p>
          </div>

          {/* Contact Info */}
          <div className='space-y-6'>
            <h3 className='text-xl font-bold text-[#008e9d]'>{t('contact_us')}</h3>
            <div className='space-y-4'>
              <div className='flex items-center gap-4 group'>
                <div className='w-10 h-10 bg-[#003d44] rounded-lg flex items-center justify-center group-hover:bg-[#008e9d] transition-colors duration-300'>
                  <Phone size={20} className='text-[#008e9d] group-hover:text-white' />
                </div>
                <div>
                  <p className='text-xs text-gray-500 uppercase tracking-widest'>{t('phone')}</p>
                  <p className='text-gray-200 font-medium'>+216 71 000 000</p>
                </div>
              </div>

              <div className='flex items-center gap-4 group'>
                <div className='w-10 h-10 bg-[#003d44] rounded-lg flex items-center justify-center group-hover:bg-[#008e9d] transition-colors duration-300'>
                  <Mail size={20} className='text-[#008e9d] group-hover:text-white' />
                </div>
                <div>
                  <p className='text-xs text-gray-500 uppercase tracking-widest'>{t('email')}</p>
                  <p className='text-gray-200 font-medium'>contact@carepoint.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className='space-y-6'>
            <h3 className='text-xl font-bold text-[#008e9d]'>{t('follow_us')}</h3>
            <div className='flex gap-4'>
              {[
                { icon: FaFacebookF, color: 'hover:bg-blue-600' },
                { icon: FaTwitter, color: 'hover:bg-sky-500' },
                { icon: FaInstagram, color: 'hover:bg-pink-600' },
                { icon: FaLinkedin, color: 'hover:bg-blue-700' }
              ].map((social, index) => (
                <a 
                  key={index}
                  href="#" 
                  className={`w-12 h-12 bg-[#003d44] rounded-xl flex items-center justify-center transition-all duration-300 ${social.color} hover:-translate-y-2 shadow-lg`}
                >
                  <social.icon size={22} />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className='h-px bg-gradient-to-r from-transparent via-[#003d44] to-transparent mb-8'></div>

        {/* Copyright */}
        <div className='text-center text-gray-500 text-sm'>
          <p>{t('all_rights_reserved')}</p>
        </div>
      </div>
    </footer>
  )
}
