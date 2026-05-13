import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AuthUserAkhter } from '../context/AuthContext'
import avatarImg from "../image/avatar.png"
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Upload } from 'lucide-react'

export default function AddDoctor() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const {user} = AuthUserAkhter()
  const [form, setForm] = useState({name: "", specialty: "", description: "", experienceYears: "", image: null})
  const [priveuw, setPriveuw] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const {name, value, files} = e.target
    if (name === "image" || e.target.id === "inputFile") {
      const file = files[0]
      if (file) {
        setForm({...form, image: file})
        setPriveuw(URL.createObjectURL(file))
      }
    } else {
      setForm({...form, [name]: value})
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      const formData = new FormData();
      formData.append("name", form.name)
      formData.append("specialty", form.specialty)
      formData.append("description", form.description)
      formData.append("experienceYears", form.experienceYears)
      if(form.image) formData.append("image", form.image)
      
      await axios.post("https://medicio-1i5j.onrender.com/doctors/Adddoctors", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      toast.success(t('doctor_add_success'))
      setForm({name: "", specialty: "", description: "", experienceYears: "", image: null})
      setPriveuw(null)
      setTimeout(() => navigate('/alldoctors'), 2000)
    } catch(error){
      console.error("Error Submitting form")
      const message = error.response?.data?.message || error.message
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-[var(--bg-primary)] py-12 px-4'>
      <div className='max-w-4xl mx-auto'>
        <form onSubmit={handleSubmit} className='bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-2xl rounded-2xl p-8 md:p-12' encType="multipart/form-data">
          
          <h2 className='text-3xl md:text-4xl font-bold mb-2 text-[#008e9d] text-center'>{t('add_new_doctor')}</h2>
          <p className='text-center text-[var(--text-secondary)] mb-10'>{t('add_doctor_info')}</p>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Image Upload Section */}
            <div className='md:col-span-1 flex flex-col items-center'>
              <div className='w-40 h-40 border-4 border-dashed border-[#008e9d] rounded-full overflow-hidden flex items-center justify-center bg-[var(--bg-primary)] hover:bg-[var(--bg-secondary)] transition mb-4'>
                {priveuw ? (
                  <img src={priveuw} className='object-cover w-full h-full' alt="Preview"/>
                ) : (
                  <img src={avatarImg} className='w-2/3 opacity-40' alt="Avatar"/>
                )}
              </div>
              <button 
                type="button"
                onClick={() => document.getElementById("inputFile").click()}
                className='flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#008e9d] to-[#00a8b8] text-white rounded-lg hover:shadow-lg transition'
              >
                <Upload size={18} />
                {t('choose_image')}
              </button>
              <input 
                name="image" 
                onChange={handleChange} 
                className='hidden' 
                id='inputFile' 
                type="file" 
                accept='image/*'
              />
            </div>

            {/* Form Fields */}
            <div className='md:col-span-2 space-y-6'>
              
              {/* Name Input */}
              <div>
                <label className='block mb-2 text-sm font-semibold text-[var(--text-primary)]'>{t('name')}</label>
                <input 
                  onChange={handleChange} 
                  value={form.name} 
                  type="text" 
                  name="name"
                  placeholder={t('doctor_name_placeholder')}
                  required
                  className='w-full px-4 py-3 bg-[var(--bg-primary)] text-[var(--text-primary)] border-2 border-[var(--border-color)] rounded-lg focus:border-[#008e9d] focus:outline-none transition'
                />
              </div>

              {/* Specialty Input */}
              <div>
                <label className='block mb-2 text-sm font-semibold text-[var(--text-primary)]'>{t('specialty')}</label>
                <input 
                  onChange={handleChange} 
                  value={form.specialty} 
                  type="text" 
                  name="specialty"
                  placeholder={t('specialty_placeholder')}
                  required
                  className='w-full px-4 py-3 bg-[var(--bg-primary)] text-[var(--text-primary)] border-2 border-[var(--border-color)] rounded-lg focus:border-[#008e9d] focus:outline-none transition'
                />
              </div>

              {/* Description Input */}
              <div>
                <label className='block mb-2 text-sm font-semibold text-[var(--text-primary)]'>{t('description')}</label>
                <textarea 
                  onChange={handleChange} 
                  value={form.description} 
                  name="description"
                  placeholder={t('doctor_desc_placeholder')}
                  required
                  rows="4"
                  className='w-full px-4 py-3 bg-[var(--bg-primary)] text-[var(--text-primary)] border-2 border-[var(--border-color)] rounded-lg focus:border-[#008e9d] focus:outline-none transition resize-none'
                />
              </div>

              {/* Experience Years Input */}
              <div>
                <label className='block mb-2 text-sm font-semibold text-[var(--text-primary)]'>{t('years_of_experience')}</label>
                <input 
                  onChange={handleChange} 
                  value={form.experienceYears} 
                  type="number" 
                  name="experienceYears"
                  placeholder={t('experience_years_placeholder')}
                  required
                  min="0"
                  className='w-full px-4 py-3 bg-[var(--bg-primary)] text-[var(--text-primary)] border-2 border-[var(--border-color)] rounded-lg focus:border-[#008e9d] focus:outline-none transition'
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type='submit'
            disabled={loading}
            className={`w-full mt-10 py-3 rounded-lg font-bold text-white transition-all duration-300 ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-[#008e9d] to-[#00a8b8] hover:shadow-lg hover:scale-[1.02]'
            }`}
          >
            {loading ? t('adding') : t('add_doctor_btn')}
          </button>
        </form>
      </div>
    </div>
  )
}
