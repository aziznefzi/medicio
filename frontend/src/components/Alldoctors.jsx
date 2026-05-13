import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Search } from 'lucide-react'

export default function AllDoctors() {
  const { t } = useTranslation()
  const [doctors, setDoctors] = useState([]) 
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchDoctors = async () => {
        try {
          const res = await axios.get("https://medicio-1i5j.onrender.com/doctors/Alldoctors")
          setDoctors(res.data)
        } catch (error) {
          console.error("Error fetching doctors:", error);
          toast.error(t('error_loading_doctors'));
        }
    }
    fetchDoctors()
  }, [])

  const filteredDoctors = doctors.filter((doc) => 
    doc?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc?.specialty?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='min-h-screen bg-[var(--bg-primary)] py-12 px-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h2 className='text-4xl md:text-5xl font-bold text-[#008e9d] mb-4'>{t('all_doctors_title')}</h2>
          <p className='text-[var(--text-secondary)] text-lg max-w-2xl mx-auto'>{t('all_doctors_desc')}</p>
        </div>

        {/* Search Bar */}
        <div className='max-w-2xl mx-auto mb-12'>
          <div className='relative'>
            <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
            <input 
              type="text"
              placeholder={t('search_placeholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-12 pr-4 py-3 bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] text-[var(--text-primary)] rounded-lg focus:border-[#008e9d] focus:outline-none transition'
            />
          </div>
        </div>

        {/* Doctors Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
          {filteredDoctors?.length > 0 ? (
            filteredDoctors.map((doc) => (
              <div 
                key={doc._id} 
                className='bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 hover:scale-105 group'
              >
                <div className='relative overflow-hidden h-64'>
                  <img 
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
                    src={`https://medicio-1i5j.onrender.com/files/${doc?.image}`}
                    alt={doc?.name} 
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                </div>
                
                <div className='p-6'>
                  <h3 className='text-2xl font-bold text-[var(--text-primary)] mb-2'>{t('dr')} {doc?.name}</h3>
                  <p className='text-[#008e9d] font-semibold mb-4 text-lg'>{doc?.specialty}</p>
                  
                  <div className='flex items-center gap-2 text-[var(--text-secondary)] mb-4 text-sm'>
                    <span className='inline-block w-8 h-8 bg-[var(--bg-primary)] rounded-full flex items-center justify-center text-[#008e9d] font-bold'>
                      {doc?.experienceYears}
                    </span>
                    <span>{t('years_experience')}</span>
                  </div>
                  
                  <p className='text-[var(--text-secondary)] text-sm line-clamp-3 mb-4'>{doc?.description}</p>
                  
                  <Link 
                    to={`/doctor/${doc?._id}`}
                    className='inline-block w-full text-center px-4 py-2 bg-gradient-to-r from-[#008e9d] to-[#00a8b8] text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold hover:scale-105'
                  >
                    {t('view_details')}
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className='col-span-full text-center py-12'>
              <p className='text-[var(--text-secondary)] text-lg'>{t('no_doctors_found')}</p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className='bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl shadow-lg p-8 text-center'>
          <p className='text-[var(--text-secondary)]'>
            {t('available_doctors_count')} <span className='text-2xl font-bold text-[#008e9d]'>{filteredDoctors?.length}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
