'use client'

import React, { useEffect, useState } from 'react'
import { getProjectById } from '../../../../api/projectApi'
import ProjectDetail from '../../../../_components/ProjectDetail'
import Technologies from '../../../../_components/ProjectDetail/Technologies'
import RelatedProjects from '../../../../_components/ProjectDetail/RelatedProjects'
import { Project } from '../../../../../payload-types'

interface PageProps {
  params: {
    projectId: string
  }
}
export default async function page({ params }: PageProps) {
  // const { projects } = await getProjectById({ id: params.projectId })
  // const [project] = projects
  const [isLoading, setIsLoading] = useState(true)
  const [project, setProject] = useState<Project>()

  useEffect(() => {
    let timer: NodeJS.Timeout = null

    timer = setTimeout(() => {
      if (!isLoading) {
        setIsLoading(true)
      }
    }, 500)
    const fetchData = async () => {
      try {
        const req = await fetch(
          `https://portfolio-m47y.onrender.com/api/projects/${params.projectId}?locale=undefined&draft=true&depth=2`,
        )
        const doc = await req.json()
        console.log(doc)
        clearTimeout(timer)
        if (doc) {
          setProject(doc)
          setIsLoading(false)
        }
      } catch (error) {
        console.warn(error)
        setIsLoading(false)
      }
    }
    fetchData()
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [params.projectId])

  return (
    <>
      {!project ? (
        <p className="border-2 border-current text-center text-text-2 p-4 grid items-center rounded-md">
          {`This project is not available.`}
        </p>
      ) : (
        <>
          <ProjectDetail data={project} />
          <Technologies data={project.technologies} />
          <RelatedProjects data={project.relatedProjects} />
        </>
      )}
    </>
  )
}
