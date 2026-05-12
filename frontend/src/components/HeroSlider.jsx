import React from 'react'
import { useTranslation } from 'react-i18next'
import Slider from 'react-slick'
import { useNavigate } from 'react-router-dom'

import heroCarousel1 from '../image/hero-carousel/hero-carousel-1.jpg'
import heroCarousel2 from '../image/hero-carousel/hero-carousel-2.jpg'
import heroCarousel3 from '../image/hero-carousel/hero-carousel-3.jpg'

export default function HeroSlider() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    pauseOnHover: true,
    dotsClass: "slick-dots custom-dots"
  };

  const slides = [
    {
      image: heroCarousel1,
      title: t('hero_slide1_title'),
      description: t('hero_slide1_desc'),
      buttonText: t('book_appointment'),
      action: () => navigate('/addappointment')
    },
    {
      image: heroCarousel2,
      title: t('hero_slide2_title'),
      description: t('hero_slide2_desc'),
      buttonText: t('hero_slide2_btn'),
      action: () => navigate('/alldoctors')
    },
    {
      image: heroCarousel3,
      title: t('hero_slide3_title'),
      description: t('hero_slide3_desc'),
      buttonText: t('hero_slide3_btn'),
      action: () => navigate('/addappointment')
    },
  ];
  
  return (
    <section className="w-full">
      <style>{`
        .custom-dots {
          bottom: 30px !important;
        }
        .custom-dots li button:before {
          color: white !important;
          font-size: 12px !important;
        }
        .custom-dots li.slick-active button:before {
          color: #008e9d !important;
          font-size: 14px !important;
        }
        .slick-prev:before, .slick-next:before {
          color: white !important;
          font-size: 24px !important;
        }
      `}</style>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className='relative w-full h-screen md:h-[80vh] max-h-[600px] md:max-h-none'>
            <img 
              className='w-full h-full object-cover' 
              src={slide.image} 
              alt={slide.title} 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 flex flex-col items-center 
            justify-center text-white px-4 md:px-8">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-center drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="max-w-2xl text-lg md:text-xl text-center drop-shadow-md mb-8">
                {slide.description}
              </p>
              <button 
                onClick={slide.action}
                className='px-8 py-3 md:px-12 md:py-4 bg-gradient-to-r from-[#008e9d] to-[#00a8b8] 
                text-white rounded-full font-bold text-lg shadow-lg 
                hover:shadow-2xl hover:scale-105 transition-all duration-300'
              >
                {slide.buttonText}
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  )
}
