import React from 'react'
import SectionHeader from './SectionHeader'
import { Reveal } from './Reveal'
import SkillTag from './SkillTag'

function SkillsSec() {
  return (
    <>
      <Reveal id='skills'>
        <SectionHeader order='03.' title='SKILLS' />
      </Reveal>

      <div className="flex flex-col gap-15 lg:gap-10 pb-30 border-b">
        <div className="flex lg:flex-row flex-col items-start gap-5 lg:gap-25">
          <span>FRONTEND: </span>
          <Reveal className='flex gap-5 flex-wrap max-w-150'>
            <SkillTag title='HTML5' />
            <SkillTag title='CSS3' />
            <SkillTag title='VANILLA JS' />
            <SkillTag title='REACT.JS' />
            <SkillTag title='NEXT.JS' />
            <SkillTag title='TAILWIND CSS' />
            <SkillTag title='TYPESCRIPT' />
          </Reveal>
        </div>
        <div className="flex lg:flex-row flex-col items-start gap-5 lg:gap-25">
          <span>BACKEND: </span>
          <Reveal className='flex gap-5 flex-wrap max-w-150'>
            <SkillTag title='SUPABASE' />
            <SkillTag title='AUTH' />
            <SkillTag title='RLS' />
          </Reveal>
        </div>
        <div className="flex lg:flex-row flex-col items-start gap-5 lg:gap-25">
          <span>TECHNOLOGIES: </span>
          <Reveal className='flex gap-5 flex-wrap max-w-150'>
            <SkillTag title='Vercel' />
            <SkillTag title='GITHUB' />
          </Reveal>
        </div>
      </div>
    </>
  )
}

export default SkillsSec