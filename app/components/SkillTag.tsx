import React from 'react'


interface SkillTag {
  title: string
}

function SkillTag({title} : SkillTag) {
  return (
    <>
      <div className='bg-sand px-4 py-2 border border-zinc-300 shadow-sm rounded-full text-xs md:text-sm uppercase'>{title}</div>
    </>
  )
}

export default SkillTag