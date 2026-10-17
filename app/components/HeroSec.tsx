import React from 'react'
import { Reveal } from './Reveal'

function HeroSec() {
  return (
    <>
      <div className="flex flex-col mt-15 gap-4 pb-30 border-b-2">
        <Reveal className='text-sm lg:text-md'>FULL-STACK DEVELOPER</Reveal>
        <Reveal className='font-display text-7xl md:text-9xl ld:text-[150px] lg:leading-35 -z-10'>MICHAEL <br /> WALED</Reveal>
        <Reveal className="flex flex-col lg:flex-row items-start lg:items-center justify-between mt-10">
          <span className='lg:text-md text-sm lg:mb-0 mb-15'>I build full-stack web apps with real auth, roles and <br /> secure databases.</span>
          <Reveal delay={150} className="flex items-center gap-5">
            <a href='#selectedWork' className='bg-ink text-paper px-6 py-4 rounded-lg shadow-btn text-sm hover:translate-1.5 hover:shadow-none transition-all cursor-pointer'>VIEW WORK</a>
            <a href="#contact" className=' px-6 py-4 rounded-lg shadow-btn text-sm border hover:translate-1.5 hover:shadow-none transition-all cursor-pointer'>CONTACT</a>
          </Reveal>
        </Reveal>
      </div>
    </>
  )
}

export default HeroSec