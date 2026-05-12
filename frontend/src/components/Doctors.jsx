import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from "lucide-react"
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Doctors() {
  const { t } = useTranslation()
  const [doctors, setDoctors] = useState([]) 

  useEffect(() => {
    const fetchDoctors = async () => {
        try {
          const res = await axios.get("http://localhost:5000/doctors/Alldoctors")
          setDoctors(res.data.slice(0, 3))
        } catch (error) {
          console.error("Error fetching doctors:", error);
          toast.error(t('error_loading_doctors'));
        }
    }
    fetchDoctors()
  }, [])

  return (
    <div className='py-16 bg-[var(--bg-primary)]'>
      <div className='max-w-7xl mx-auto px-4 md:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-[#008e9d] mb-4'>{t('specialized_doctors')}</h2>
          <p className='text-[var(--text-secondary)] text-lg max-w-2xl mx-auto'>{t('specialized_doctors_desc')}</p>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {doctors?.map((doc) => (
            <div 
              key={doc._id} 
              className='bg-[var(--bg-secondary)] rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 hover:scale-105'
            >
              <div className='relative overflow-hidden h-64'>
                <img 
                  className='w-full h-full object-cover'
                  src={`http://localhost:5000/files/${doc.image}`}
                  alt={doc.name} 
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300'></div>
              </div>
              
              <div className='p-6'>
                <h3 className='text-2xl font-bold text-[var(--text-primary)] mb-2'>{t('dr')} {doc.name}</h3>
                <p className='text-[#008e9d] font-semibold mb-4 text-lg'>{doc.specialty}</p>
                
                <div className='flex items-center gap-2 text-[var(--text-secondary)] mb-4 text-sm'>
                  <span className='inline-block w-8 h-8 bg-[#e0f2f1] dark:bg-[#003d44] rounded-full flex items-center justify-center text-[#008e9d] font-bold'>
                    {doc.experienceYears}
                  </span>
                  <span>{t('years_experience')}</span>
                </div>
                
                <p className='text-[var(--text-secondary)] text-sm line-clamp-2 mb-4 italic'>{doc.description}</p>
                
                <Link 
                  to={`/doctor/${doc._id}`}
                  className='inline-block w-full text-center px-4 py-2 bg-gradient-to-r from-[#008e9d] to-[#00a8b8] text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold'
                >
                  {t('view_details')}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className='flex justify-center mt-14'>
          <Link 
            to="/alldoctors" 
            className='flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#008e9d] to-[#00a8b8] text-white rounded-full font-bold hover:shadow-lg hover:scale-105 transition-all duration-300'
          >
            {t('view_all_doctors')}
            <ArrowRight size={20} className={t('dir') === 'rtl' ? 'rotate-180' : ''} />
          </Link>
        </div>
      </div>
    </div>
  )
}
