import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ArrowRight, MapPin, Award } from 'lucide-react'

export default function DoctorDetels() {
    const { t } = useTranslation()
    const [doctor, setDoctor] = useState(null)
    const [relztevDoctors, setRelztevDoctors] = useState([])
    const [loading, setLoading] = useState(true)
    const {id} = useParams()
    
    useEffect(() => {
    const fetchDoctors = async () => {
        try {
          const res = await axios.get(`https://medicio-1i5j.onrender.com/doctors/${id}`)
          setDoctor(res.data)
          fetchRelatedDoctors(res.data?.specialty?.toLowerCase())
        } catch (error) {
          console.error("Error fetching doctors:", error);
           toast.error(t('doctor_details_error'));
        } finally {
          setLoading(false)
        }
    }

    const fetchRelatedDoctors = async (specialty) => {
      try {
        const res = await axios.get(`https://medicio-1i5j.onrender.com/doctors/BySpecialty/${specialty}`)
        const normalase = res.data.filter((doc) => doc?._id !== id && doc?.specialty?.toLowerCase() === specialty) 
        setRelztevDoctors(normalase)
      } catch (error) {
        console.error("Error fetching related doctors:", error);
         toast.error(t('related_doctors_error'));
      }
    }

    fetchDoctors()
  }, [id])

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='animate-spin'>
          <div className='w-16 h-16 border-4 border-gray-200 border-t-[#008e9d] rounded-full'></div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#f0f9fa] to-[#e0f7ff] py-12 px-4'>
      <div className='max-w-6xl mx-auto'>
        {/* Doctor Main Info */}
        <div className='bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-12'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Doctor Image */}
            <div className='md:col-span-1 flex justify-center'>
              <img 
                className='w-64 h-64 object-cover rounded-2xl shadow-lg ring-4 ring-[#e0f2f1] hover:scale-105 transition-transform duration-300'
                src={`https://medicio-1i5j.onrender.com/files/${doctor?.image}`}
                alt={doctor?.name} 
              />
            </div>

            {/* Doctor Details */}
            <div className='md:col-span-2 space-y-6'>
              <div>
                 <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#008e9d] to-[#00a8b8] bg-clip-text text-transparent mb-2'>
                   {t('dr')} {doctor?.name}
                 </h1>
                <p className='text-2xl text-[#008e9d] font-semibold'>{doctor?.specialty}</p>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                 <div className='bg-gradient-to-br from-[#f0f9fa] to-[#e0f7ff] rounded-lg p-4'>
                   <p className='text-gray-600 text-sm font-semibold mb-1'>{t('years_of_experience')}</p>
                   <p className='text-3xl font-bold text-[#008e9d]'>{doctor?.experienceYears} {t('year')}</p>
                 </div>
                 <div className='bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4'>
                   <p className='text-gray-600 text-sm font-semibold mb-1'>{t('status')}</p>
                   <p className='text-3xl font-bold text-green-600'>{t('available')}</p>
                 </div>
              </div>

               <div className='border-t-2 border-gray-200 pt-6'>
                 <h3 className='text-xl font-bold text-gray-800 mb-3'>{t('bio')}</h3>
                <p className='text-gray-700 leading-relaxed text-lg'>
                  {doctor?.description}
                </p>
              </div>

               <Link 
                 to={`/addappointment`}
                 className='inline-block px-8 py-4 bg-gradient-to-r from-[#008e9d] to-[#00a8b8] text-white rounded-lg font-bold hover:shadow-lg hover:scale-105 transition-all duration-300'
               >
                 {t('book_appointment_now')}
               </Link>
            </div>
          </div>
        </div>

        {/* Related Doctors */}
        {relztevDoctors?.length > 0 && (
          <div className='bg-white rounded-2xl shadow-2xl p-8 md:p-12'>
             <h2 className='text-3xl font-bold text-[#008e9d] mb-8 flex items-center gap-2'>
               <Award size={32} />
               {t('related_doctors_title')}
             </h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {relztevDoctors?.map((doc) => (
                <Link 
                  to={`/doctor/${doc._id}`}
                  key={doc._id}
                  className='bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 group'
                >
                  <img 
                    className='w-full h-48 object-cover rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300' 
                    src={`https://medicio-1i5j.onrender.com/files/${doc?.image}`} 
                    alt={doc?.name} 
                  />
                   <h4 className='text-xl font-bold text-gray-800 mb-2'>{t('dr')} {doc?.name}</h4>
                   <p className='text-[#008e9d] font-semibold mb-3'>{doc?.specialty}</p>
                  <p className='text-sm text-gray-600 line-clamp-2 mb-4'>{doc?.description}</p>
                  
                   <div className='flex items-center justify-between'>
                     <span className='text-sm text-gray-500 font-semibold'>{doc?.experienceYears} {t('years_experience')}</span>
                     <ArrowRight size={18} className={`text-[#008e9d] ${t('dir') === 'rtl' ? 'rotate-180' : ''}`} />
                   </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
