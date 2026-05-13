import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AuthUserAkhter } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const { t } = useTranslation()
  const {login} = AuthUserAkhter()
  const navigate = useNavigate()
  const [form, setform] = useState({email: "", password: ""})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setform({...form, [e.target.name]: e.target.value})
  }

  const handleSubmet = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post("https://medicio-1i5j.onrender.com/user/signin", form)
      if(response.data.token) {
        login(response.data.token)
        toast.success(t('login_success'))
        navigate("/")
      }
    } catch (err) {
      const message = err.response?.data?.message || t('login_error')
      toast.error(message)
      console.error("Login error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-[var(--bg-primary)] p-4'>
      <div className='w-full max-w-md'>
        <div className='bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl shadow-2xl p-8 md:p-10'>
          {/* Header */}
          <div className='text-center mb-8'>
            <h2 className='text-3xl md:text-4xl font-bold text-[#008e9d] mb-2'>{t('login_title')}</h2>
            <p className='text-[var(--text-secondary)]'>{t('login_subtitle')}</p>
          </div>

          <form onSubmit={handleSubmet} className='space-y-5'>
            {/* Email Input */}
            <div>
              <label className='block text-sm font-semibold text-[var(--text-primary)] mb-2'>{t('email')}</label>
              <input 
                type="email"
                placeholder="your@email.com"
                name="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
                className='w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#008e9d] focus:outline-none transition'
              />
            </div>

            {/* Password Input */}
            <div>
              <label className='block text-sm font-semibold text-[var(--text-primary)] mb-2'>{t('password')}</label>
              <div className='relative'>
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  className='w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#008e9d] focus:outline-none transition'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] hover:text-[#008e9d] transition'
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type='submit'
              disabled={loading}
              className={`w-full py-3 rounded-lg font-bold text-white transition-all duration-300 ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-[#008e9d] to-[#00a8b8] hover:shadow-lg hover:scale-[1.02]'
              }`}
            >
              {loading ? t('loading') : t('login')}
            </button>
          </form>

          {/* Divider */}
          <div className='my-6 flex items-center'>
            <div className='flex-1 h-px bg-[var(--border-color)]'></div>
            <span className='px-3 text-[var(--text-secondary)] text-sm'>{t('or')}</span>
            <div className='flex-1 h-px bg-[var(--border-color)]'></div>
          </div>

          {/* Register Link */}
          <p className='text-center text-[var(--text-secondary)]'>
            {t('dont_have_account')} 
            <Link to="/register" className='text-[#008e9d] font-semibold hover:underline mx-2'>
              {t('create_account')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
