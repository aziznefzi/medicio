import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AuthUserAkhter } from '../context/AuthContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function AddApoitment() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { user } = AuthUserAkhter()
  const [doctors, setDoctors] = useState([])
  const [form, setform] = useState({ doctor: "", date: "", reason: "" })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("https://medicio-1i5j.onrender.com/doctors/Alldoctors")
        setDoctors(res.data)
      } catch (error) {
        console.error("Error fetching doctors:", error)
        toast.error(t('doctors_list_error'))
      }
    }
    fetchDoctors()
  }, [])

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post("https://medicio-1i5j.onrender.com/appointments/createAppointment", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      
      if (res.status === 201 || res.status === 200) {
        toast.success(t('appointment_success'))
        setform({ doctor: "", date: "", reason: "" })
        setTimeout(() => navigate('/myappointments'), 2000)
      }
    } catch (error) {
      console.error("Error adding appointment:", error)
      toast.error(error.response?.data?.message || t('appointment_error'))
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className='flex items-center justify-center h-screen bg-gradient-to-br from-[#f0f9fa] to-[#e0f7ff]'>
        <div className='text-center'>
          <h2 className='text-2xl md:text-3xl font-bold text-[#008e9d] mb-4'>
            {t('login_required_title')}
          </h2>
          <p className='text-gray-600'>{t('login_required_desc')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#f0f9fa] to-[#e0f7ff] py-12 px-4'>
      <div className='max-w-2xl mx-auto'>
        <form 
          onSubmit={handleSubmit}
          className='bg-white shadow-2xl rounded-2xl p-8 md:p-12'
        >
          <h1 className='text-3xl md:text-4xl font-bold mb-2 text-[#008e9d] text-center'>{t('book_medical_appointment')}</h1>
          <p className='text-center text-gray-600 mb-8'>{t('select_doctor_date')}</p>
          
          {/* Doctor Select */}
          <div className='mb-6'>
            <label className='block mb-2 text-sm font-semibold text-gray-700'>{t('select_doctor')}</label>
            <select 
              name="doctor"
              value={form.doctor}
              onChange={handleChange}
              required
              className='w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#008e9d] focus:outline-none transition'
            >
              <option value="">{t('choose_doctor_placeholder')}</option>
              {doctors?.map((doc) => (
                <option key={doc._id} value={doc._id}>
                  {t('dr')} {doc?.name} - {doc?.specialty}
                </option>
              ))}
            </select>
          </div>

          {/* Date Input */}
          <div className='mb-6'>
            <label className='block mb-2 text-sm font-semibold text-gray-700'>{t('date')}</label>
            <input 
              type="date"
              name='date' 
              value={form.date}
              onChange={handleChange}
              required
              className='w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#008e9d] focus:outline-none transition'
            />
          </div>

          {/* Reason Input */}
          <div className='mb-8'>
            <label className='block mb-2 text-sm font-semibold text-gray-700'>{t('reason_for_visit')}</label>
            <textarea 
              placeholder={t('reason_placeholder')}
              name='reason'
              value={form.reason}
              onChange={handleChange}
              required
              rows="4"
              className='w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#008e9d] focus:outline-none transition resize-none'
            ></textarea>
          </div>

          {/* Submit Button */}
          <button 
            className={`w-full py-3 rounded-lg font-bold text-white transition-all duration-300 ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-[#008e9d] to-[#00a8b8] hover:shadow-lg hover:scale-[1.02]'
            }`}
            type='submit'
            disabled={loading}
          >
            {loading ? t('booking') : t('confirm_booking')}
          </button>
        </form>
      </div>
    </div>
  )
}
