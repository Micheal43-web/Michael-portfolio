import React from 'react'


interface Section {
  order: string,
  title: string
}


function SectionHeader({order,title} : Section) {
  return (
    <>
      <div className="flex gap-5 lg:gap-10 items-center my-15">
        <span className='lg:text-md text-xs text-accent'>{order}</span>
        <h1 className='font-display text-4xl md:text-7xl lg:text-9xl lg:text-start text-center'>{title}</h1>
        <span className="text-ink border lg:border-2 w-full"></span>
      </div>
    </>
  )
}

export default SectionHeader