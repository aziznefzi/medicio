import React, { useEffect, useState } from 'react'
import HeroSlider from '../components/HeroSlider'
import CallToAction from '../components/CallToAction'
import About from '../components/About'
import Stats from '../components/Stats'
import axios from 'axios'
import Departments from '../components/Departments'
import Doctors from '../components/Doctors'

export default function Home() {
  return (
    <>
    <HeroSlider />
    <CallToAction />
    <About /> 
    <Stats />
    <Departments />
    <Doctors />
    </>
  )
}
