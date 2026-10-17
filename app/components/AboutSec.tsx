import React from 'react'
import SectionHeader from './SectionHeader'
import { Reveal } from './Reveal'

function AboutSec() {
  return (
    <>
      <Reveal id='about'>
        <SectionHeader order='02.' title='ABOUT' />
      </Reveal>
      <div className="flex lg:flex-row flex-col items-center lg:items-start justify-between pb-30 border-b gap-15 lg:text-start text-center">
        <Reveal className=' text-5xl md:text-6xl lg:text-7xl font-display max-w-150'>I BUILD SOFTWARE THAT WORKS IN THE REAL WORLD.</Reveal>

        <div className="flex flex-col gap-15 max-w-130 ">
          <Reveal>I’m a full-stack developer focused on practical products: clear interfaces backed by dependable systems.</Reveal>
          <Reveal>From authentication and permissions to database design and deployment, I care about every layer working together.</Reveal>
          <Reveal>I design databases, access rules and safe concurrent updates so important data stays correct under real-world use.</Reveal>

          <div className="grid grid-cols-2 gap-px border border-ink bg-ink mt-10">
            <div className="flex flex-col gap-5 bg-paper p-5">
              <span className="text-sm text-accent">FOCUS</span>
              <span>Full-stack web apps</span>
            </div>
            <div className="flex flex-col gap-5 bg-paper p-5">
              <span className="text-sm text-accent">STACK</span>
              <span>Next.js + Supabase</span>
            </div>
            <div className="flex flex-col gap-5 bg-paper p-5">
              <span className="text-sm text-accent">LANGUAGES</span>
              <span>Arabic, English (b1)</span>
            </div>
            <div className="flex flex-col gap-5 bg-paper p-5">
              <span className="text-sm text-accent">NOW</span>
              <span>Building a pharmacy system</span>
            </div>
          </div>

          <div className="flex flex-col divide-y border-t border-b text-start">
            <Reveal className='flex gap-10 items-center py-8'>
              <span className='text-xs text-accent'>01.</span>
              <span className='font-bold'>SECURITY AT THE DATABASE LEVEL</span>
            </Reveal>
            <Reveal className='flex gap-10 items-center py-8'>
              <span className='text-xs text-accent'>02.</span>
              <span className='font-bold'>SAFE CONCURRENT UPDATES</span>
            </Reveal>
            <Reveal className='flex gap-10 items-center py-8'>
              <span className='text-xs text-accent'>03.</span>
              <span className='font-bold'>SIMPLE INTERFACES</span>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutSec