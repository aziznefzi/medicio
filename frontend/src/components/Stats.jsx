import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Users, Building2, Beaker, Award } from 'lucide-react'

export default function Stats() {
  const { t } = useTranslation()
  const [doctorsCount, setDoctorsCount] = useState(0);
  const [departmentsCount, setDepartmentsCount] = useState(0);
  
  useEffect(() => {
    const fetchStats = async () => {
      try{
        const doctorsResponse = await axios.get("http://localhost:5000/doctors/count");
        const departmentsResponse = await axios.get("http://localhost:5000/departments/count");
        
        console.log("doctorsCount", doctorsResponse.data.count)
        console.log("departmentsCount", departmentsResponse.data.count)
        
        setDoctorsCount(doctorsResponse.data.count || 0);
        setDepartmentsCount(departmentsResponse.data.count || 0);
      }catch(error){
        console.error("Error fetching stats:", error);
        toast.error(t('error_loading_stats'));
      }
    }
    fetchStats()
  }, [])

  const stats = [
    {
      icon: Users,
      label: t('doctors'),
      count: doctorsCount,
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600",
    },
    {
      icon: Building2,
      label: t('departments'),
      count: departmentsCount,
      bgColor: "bg-cyan-50",
      iconColor: "text-cyan-600",
    },
    {
      icon: Beaker,
      label: t('research_labs'),
      count: 10,
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      icon: Award,
      label: t('awards'),
      count: 13,
      bgColor: "bg-sky-50",
      iconColor: "text-sky-600",
    },
  ]

  return (
    <section className='py-20 bg-[var(--bg-primary)]'>
      <div className='max-w-7xl mx-auto px-4 md:px-8'>
        {/* Section Title */}
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-[#008e9d] mb-4 relative inline-block'>
            {t('stats_title')}
            <span className='absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-1.5 bg-[#008e9d] rounded-full opacity-20'></span>
          </h2>
        </div>
        
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className='relative bg-[var(--bg-secondary)] rounded-3xl p-8 shadow-[0_10px_40px_-15px_rgba(0,142,157,0.1)] border border-[var(--border-color)] hover:border-[#008e9d]/30 transition-all duration-500 hover:-translate-y-2 group'
              >
                {/* Decorative Background Blob */}
                <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bgColor} opacity-0 group-hover:opacity-40 rounded-full -mr-8 -mt-8 transition-all duration-500 blur-2xl`}></div>
                
                <div className='relative flex flex-col items-center text-center'>
                  {/* Icon Wrapper */}
                  <div className={`w-16 h-16 ${stat.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                    <Icon size={32} className={`${stat.iconColor} group-hover:animate-pulse`} />
                  </div>
                  
                  {/* Count */}
                  <div className='mb-2'>
                    <span className='text-5xl font-black text-[#008e9d] tracking-tight'>
                      {stat.count}
                    </span>
                    <span className='text-2xl font-bold text-[#008e9d]/40 ml-1'>+</span>
                  </div>
                  
                  {/* Label */}
                  <p className='text-[var(--text-secondary)] font-medium text-lg uppercase tracking-wider'>
                    {stat.label}
                  </p>
                </div>

                {/* Bottom Accent Bar */}
                <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-[#008e9d] to-[#00a8b8] group-hover:w-1/2 transition-all duration-500 rounded-full'></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
