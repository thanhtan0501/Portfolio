'use client'
import React, { useEffect, useState } from 'react'
import ProjectDetail from '../../../../_components/ProjectDetail'
import Technologies from '../../../../_components/ProjectDetail/Technologies'
import RelatedProjects from '../../../../_components/ProjectDetail/RelatedProjects'
import { Project } from '../../../../../payload-types'

interface PageProps {
  params: {
    projectId: string
  }
}
const Project = ({ params }: PageProps) => {
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
          `${process.env.NEXT_PUBLIC_DATA_API_URL}/api/projects/${params.projectId}?locale=undefined&draft=true&depth=2`,
        )
        const doc = await req.json()
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
      {!project && !isLoading && (
        <p className="border-2 border-current text-center text-text-2 p-4 grid items-center rounded-md">
          {`This project is not available.`}
        </p>
      )}
      {project && !isLoading && (
        <>
          <ProjectDetail data={project} />
          <Technologies data={project.technologies} />
          <RelatedProjects data={project.relatedProjects} />
        </>
      )}
    </>
  )
}
export default Project
