import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

export default function Departments() {
  const { t } = useTranslation();
  const [departments, setDepartments] = useState([]);
 const [activeTab, setActiveTab] = useState(null);
 
 useEffect(() => {
    const fetchDepartments = async () => {
       try{
          const response = await axios.get("https://medicio-1i5j.onrender.com/departments/Alldepartments");
          setDepartments(response.data);
          if(response.data.length > 0){
           setActiveTab(response.data[0]._id);
          }
       }catch(error){
           console.error("Error fetching departments:", error);
           toast.error(t('error_loading_departments'));
       }
    };
    fetchDepartments();
 }, [])

 const handleTabClick = (id) => {
    setActiveTab(id);
 }

  return (
    <section className='py-16 bg-[var(--bg-primary)]'>
        <div className='max-w-7xl mx-auto px-4 md:px-8'>
          {/* Header */}
          <div className='mb-16 text-center'>
            <h2 className="text-4xl md:text-5xl font-bold text-[#008e9d] mb-4">{t('medical_departments')}</h2>
            <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
              {t('medical_departments_desc')}
            </p>
          </div>

          {/* Tabs Navigation */}
          <div className='flex flex-wrap justify-center gap-3 mb-12'>
            {departments.map((dep) => (
              <button
                key={dep._id}
                onClick={() => handleTabClick(dep._id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  dep._id === activeTab 
                    ? 'bg-gradient-to-r from-[#008e9d] to-[#00a8b8] text-white shadow-lg scale-105' 
                    : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:bg-[var(--bg-primary)]'
                }`}
              >
                {dep?.name}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className='bg-[var(--bg-secondary)] rounded-2xl shadow-2xl overflow-hidden border border-[var(--border-color)]'>
            {departments?.map((dep) => (
              dep?._id === activeTab ? (
                <div key={dep?._id} className='grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12 items-center'>
                  {/* Content */}
                  <div className='space-y-6'>
                    <h3 className='text-4xl font-bold text-[#008e9d] mb-4'>{dep?.name}</h3>
                    <p className='text-[var(--text-secondary)] leading-relaxed text-lg'>
                      {dep?.description}
                    </p>
                    <button className='px-8 py-3 bg-gradient-to-r from-[#008e9d] to-[#00a8b8] text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300'>
                      {t('book_now')}
                    </button>
                  </div>

                  {/* Image */}
                  <div className='flex justify-center'>
                    {dep?.image && (
                      <img 
                        src={`https://medicio-1i5j.onrender.com/uploads/${dep.image}`} 
                        alt={dep?.name}
                        className='w-full max-w-md rounded-xl shadow-lg object-cover hover:scale-105 transition-transform duration-300'
                      />
                    )}
                  </div>
                </div>
              ) : null
            ))}
          </div>
        </div>
    </section>
  )
}