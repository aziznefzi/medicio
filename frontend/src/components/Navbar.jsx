import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import logo from "../image/image-1754131493134-851803676.png"
import { Link, useNavigate } from 'react-router-dom'
import { AuthUserAkhter } from '../context/AuthContext'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useThemeContext } from '../context/ThemeContext'
import SunnyIcon from '@mui/icons-material/Sunny';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';

export default function Navbar() {
  const { user, logout } = AuthUserAkhter()
  const { t, i18n } = useTranslation()
  const { mode, toggleColorMode } = useThemeContext()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar'
    i18n.changeLanguage(newLang)
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
    setIsOpen(false)
  }

  const role = user?.role?.toLowerCase()

  const navLinks = [
    { to: "/", label: t('home') },
    { to: "/alldoctors", label: t('doctors') },
  ]

  return (
    <nav className='bg-gradient-to-r from-[#008e9d] to-[#00a8b8] shadow-lg text-white sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 py-3'>
        <div className='flex justify-between items-center'>
          {/* Logo */}
          <Link to="/" className='flex-shrink-0 hover:opacity-80 transition'>
            <img className='w-28 h-12 object-contain' src={logo} alt="Logo" />
          </Link>

          {/* Desktop Menu */}
          <ul className='hidden lg:flex items-center space-x-6 font-medium'>
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link 
                  to={link.to} 
                  className="relative group text-white hover:text-white transition duration-300"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            ))}

            {role === "admin" || role === "admen" ? (
              <li>
                <Link 
                  to="/adddoctor"
                  className="relative group text-white hover:text-white transition duration-300"
                >
                  {t('add_doctor')}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            ) : null}

            {role === "user" && (
              <>
                <li>
                  <Link 
                    to="/myappointments"
                    className="relative group text-white hover:text-white transition duration-300"
                  >
                    {t('my_appointments')}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/addappointment"
                    className="relative group text-white hover:text-white transition duration-300"
                  >
                    {t('book_appointment')}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
              </>
            )}
            
            {!user ? (
              <>
                <li>
                  <Link 
                    to="/login"
                    className="px-4 py-2 bg-white text-[#008e9d] rounded-lg font-semibold hover:bg-gray-100 hover:shadow-lg transition duration-300"
                  >
                    {t('login')}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/register"
                    className="px-4 py-2 bg-white text-[#008e9d] rounded-lg font-semibold hover:bg-gray-100 hover:shadow-lg transition duration-300"
                  >
                    {t('register')}
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 hover:shadow-lg transition duration-300"
                >
                  {t('logout')}
                </button>
              </li>
            )}

            {/* Language Switcher */}
            <li>
              <button 
                onClick={toggleLanguage}
                className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-white font-bold hover:bg-white hover:text-[#008e9d] transition duration-300 uppercase text-xs"
              >
                {i18n.language === 'ar' ? 'en' : 'ar'}
              </button>
            </li>

            {/* Theme Toggle */}
            <li>
              <button 
                onClick={toggleColorMode}
                className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-white hover:bg-white hover:text-[#008e9d] transition duration-300"
                aria-label="Toggle theme"
              >
                {mode === 'light' ? <NightlightRoundIcon size={20} /> : <SunnyIcon size={20} />}
              </button>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button 
            className='lg:hidden text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition'
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className='lg:hidden mt-4 pb-4 border-t border-white border-opacity-20 pt-4'>
            <ul className='space-y-3 flex flex-col'>
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to}
                    className="block text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-lg transition"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              {(role === "admin" || role === "admen") && (
                <li>
                  <Link 
                    to="/adddoctor"
                    className="block text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-lg transition"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('add_doctor')}
                  </Link>
                </li>
              )}

              {role === "user" && (
                <>
                  <li>
                    <Link 
                      to="/myappointments"
                      className="block text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-lg transition"
                      onClick={() => setIsOpen(false)}
                    >
                      {t('my_appointments')}
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/addappointment"
                      className="block text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-lg transition"
                      onClick={() => setIsOpen(false)}
                    >
                      {t('book_appointment')}
                    </Link>
                  </li>
                </>
              )}
              
              {!user ? (
                <>
                  <li>
                    <Link 
                      to="/login"
                      className="block text-center px-4 py-2 bg-white text-[#008e9d] rounded-lg font-semibold hover:bg-gray-100 transition"
                      onClick={() => setIsOpen(false)}
                    >
                      {t('login')}
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/register"
                      className="block text-center px-4 py-2 bg-white text-[#008e9d] rounded-lg font-semibold hover:bg-gray-100 transition"
                      onClick={() => setIsOpen(false)}
                    >
                      {t('register')}
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <button 
                    onClick={handleLogout}
                    className="w-full px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
                  >
                    {t('logout')}
                  </button>
                </li>
              )}
              
              {/* Mobile Language Switcher */}
              <li className="pt-2">
                <button 
                  onClick={() => {
                    toggleLanguage();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-white border-opacity-30 rounded-lg hover:bg-white hover:bg-opacity-10 transition"
                >
                  <span className="uppercase font-bold">{i18n.language === 'ar' ? 'English' : 'العربية'}</span>
                </button>
              </li>

              {/* Mobile Theme Toggle */}
              <li className="pt-2">
                <button 
                  onClick={() => {
                    toggleColorMode();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-white border-opacity-30 rounded-lg hover:bg-white hover:bg-opacity-10 transition"
                >
                  {mode === 'light' ? (
                    <>
                      <NightlightRoundIcon size={20} />
                      <span className="font-medium">{t('dark_mode') || 'Dark Mode'}</span>
                    </>
                  ) : (
                    <>
                      <SunnyIcon size={20} />
                      <span className="font-medium">{t('light_mode') || 'Light Mode'}</span>
                    </>
                  )}
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}
