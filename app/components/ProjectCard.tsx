import React from 'react'
import { Reveal } from './Reveal'
import { Boxes, MoveUpRight } from 'lucide-react'
import SkillTag from './SkillTag'
import Link from 'next/link'
import { ProjectIcon } from './ProjectIcon'

interface Project {
  id: string,
  title: string,
  tech_tags: string[],
  icon: string,
  short_description: string
}

function ProjectCard({ id, title, tech_tags, icon, short_description }: Project) {
  return (
    <>
      <Reveal className='h-full grow'>
        <Link href={`/projects/${id}`} className='flex flex-col items-start border shadow-card gap-5 rounded-md p-7 grow hover:shadow-none hover:translate-2 transition-all'>
          <div className="flex items-center justify-between w-full">

            <span className='p-4 bg-sand'>
              <ProjectIcon name={icon} className="size-7" />
            </span>

            <MoveUpRight />

          </div>

          <h1 className='font-display text-3xl lg:text-4xl mt-10'>{title}</h1>
          <p className='max-w-100'>{short_description}</p>

          <div className="flex flex-wrap gap-2 lg:gap-5 mt-10">
            {
              tech_tags.map((skill,index) => (
                <SkillTag key={index} title={skill} />
              ))
            }
          </div>
        </Link>
      </Reveal>
    </>
  )
}

export default ProjectCard