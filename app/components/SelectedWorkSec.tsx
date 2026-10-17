"use client"

import { Boxes, MoveUpRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import SectionHeader from './SectionHeader'
import { Reveal } from './Reveal'
import SkillTag from './SkillTag'
import { supabase } from './../../lib/supabase/client'
import { PreviewProject, Project } from '@/lib/types'
import ProjectCard from './ProjectCard'

function SelectedWorkSec() {



  const [projects, setProjects] = useState<PreviewProject[]>([])

  const fetchProjects = async () => {
    const { data: projects, error } = await supabase
      .from("projects")
      .select("id, title, short_description, tech_tags, icon")
      .eq("status", "published")
      .order("created_at", { ascending: true })

    if (error) console.error("projects query failed:", error.message)
    if (projects) {
      setProjects(projects as PreviewProject[])
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])



  return (
    <>
      <Reveal id='selectedWork'><SectionHeader order='01.' title='SELECTED WORKS' /></Reveal>
      <div id='selectedWork' className="flex gap-10 flex-wrap pb-30 border-b-2">
        {
          projects.length > 0 ? projects.map((pro) => (
            <ProjectCard key={pro.id} id={pro.id} title={pro.title} tech_tags={pro.tech_tags} short_description={pro.short_description} icon={pro.icon} />
          )) : <p className='text-center text-accent'>No Projects...</p>
        }
      </div>
    </>
  )
}

export default SelectedWorkSec
