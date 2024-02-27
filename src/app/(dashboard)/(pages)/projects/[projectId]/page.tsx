'use client'
import React, { useEffect, useState } from 'react'
import ProjectDetail from '../../../../_components/ProjectDetail'
import Technologies from '../../../../_components/ProjectDetail/Technologies'
import RelatedProjects from '../../../../_components/ProjectDetail/RelatedProjects'
import { Project } from '../../../../../payload-types'
import { useParams } from 'next/navigation'

const Project = () => {
  const params = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [project, setProject] = useState<Project>()

  useEffect(() => {
    setIsLoading(true)

    const fetchData = async () => {
      try {
        const req = await fetch(
          `${process.env.NEXT_PUBLIC_DATA_API_URL}/api/projects/${params.projectId}`,
        )
        const doc = await req.json()
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
  }, [])

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
