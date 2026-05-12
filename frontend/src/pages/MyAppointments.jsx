import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AuthUserAkhter } from '../context/AuthContext'
import axios from 'axios'
import {toast} from "react-toastify"
import { Calendar, User, FileText, Trash2 } from 'lucide-react'

export default function MyAppointments() {
    const { t, i18n } = useTranslation()
    const {user} = AuthUserAkhter() 
    const [appointments, setAppointments] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const fetchAppointements =async () => {
           try{
               const token = localStorage.getItem("token")
               const res = await axios.get("http://localhost:5000/appointments/myappointments",
               {headers: {Authorization: `Bearer ${token}`}})
               setAppointments(res.data)
               console.log(res)
           }catch(error){
               console.log(error)
               toast.error(t('error_loading_appointments'))
           } finally {
               setLoading(false)
           }   
        }
        fetchAppointements()
    }, [])

    const cancelAppointment = async(id, doctorName) => {
        if(!window.confirm(t('confirm_cancel', { name: doctorName }))) return
        
        try {
            const token = localStorage.getItem("token")
            await axios.delete(`http://localhost:5000/appointments/${id}`, 
            {headers: {Authorization: `Bearer ${token}`}})
            setAppointments(appointments.filter((app) => app._id !== id))
            toast.success(t('cancel_success'))
        } catch (error) {
            console.error("Error cancelling appointment")
            toast.error(`${t('cancel_error')}: ${error.message}`)
        }
    }

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#f0f9fa] to-[#e0f7ff] py-12 px-4'>
      <div className='max-w-5xl mx-auto'>
        {/* Header */}
        <div className='mb-12'>
          <h2 className='text-4xl md:text-5xl font-bold text-[#008e9d] mb-4'>{t('my_medical_appointments')}</h2>
          <p className='text-gray-600 text-lg'>{t('manage_appointments')}</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className='flex justify-center items-center py-16'>
            <div className='animate-spin'>
              <div className='w-16 h-16 border-4 border-gray-200 border-t-[#008e9d] rounded-full'></div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && appointments?.length === 0 && (
          <div className='bg-white rounded-2xl shadow-lg p-12 text-center'>
            <div className='bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6'>
              <Calendar size={48} className='text-gray-400' />
            </div>
            <p className='text-gray-600 text-xl font-semibold'>{t('no_appointments')}</p>
            <p className='text-gray-500 mt-2'>{t('start_booking')}</p>
          </div>
        )}

        {/* Appointments List */}
        {!loading && appointments?.length > 0 && (
          <div className='space-y-6'>
            {appointments?.map((app) => (
              <div 
                key={app?._id} 
                className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 border-[#008e9d]'
              >
                <div className='grid grid-cols-1 md:grid-cols-5 gap-6 p-8'>
                  {/* Doctor Image */}
                  <div className='md:col-span-1 flex justify-center items-center'>
                    <div className='relative'>
                      <img 
                        className='w-24 h-24 md:w-28 md:h-28 rounded-full object-cover ring-4 ring-[#e0f2f1] shadow-lg' 
                        alt={app?.doctor?.name}
                        src={app?.doctor?.image ? `http://localhost:5000/files/${app?.doctor.image}` : 'https://via.placeholder.com/150'} 
                      />
                      <div className='absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white'></div>
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className='md:col-span-2'>
                    <h3 className='text-2xl font-bold text-gray-800 mb-2'>{t('dr')} {app?.doctor?.name}</h3>
                    <p className='text-[#008e9d] font-semibold text-lg mb-4'>{app?.doctor?.specialty}</p>
                    
                    <div className='space-y-2 text-gray-600'>
                      <div className='flex items-center gap-2'>
                        <FileText size={16} className='text-[#008e9d]' />
                        <span className='text-sm'><strong>{t('reason')}:</strong> {app?.reason}</span>
                      </div>
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div className='md:col-span-1'>
                    <div className='bg-[#f0f9fa] rounded-lg p-4 text-center'>
                      <Calendar size={20} className='text-[#008e9d] mx-auto mb-2' />
                      <p className='text-sm text-gray-600 font-semibold'>{t('date_time')}</p>
                      <p className='text-lg font-bold text-[#008e9d]'>
                        {new Date(app?.date).toLocaleDateString(i18n.language === 'ar' ? 'ar-SA' : 'en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className='md:col-span-1 flex flex-col gap-3'>
                    <button 
                      onClick={() => cancelAppointment(app?._id, app?.doctor?.name)}
                      className='flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 hover:shadow-lg transition-all duration-300 font-semibold'
                    >
                      <Trash2 size={18} />
                      {t('cancel')}
                    </button>
                    <button className='px-4 py-3 bg-gradient-to-r from-[#008e9d] to-[#00a8b8] text-white hover:shadow-lg transition-all duration-300 rounded-lg font-semibold'>
                      {t('details')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Footer */}
        {!loading && appointments?.length > 0 && (
          <div className='mt-12 bg-white rounded-2xl shadow-lg p-8 text-center'>
            <p className='text-gray-600'>
              {t('total_appointments')}: <span className='text-3xl font-bold text-[#008e9d]'>{appointments?.length}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
