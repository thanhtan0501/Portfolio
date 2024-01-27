import React from 'react'

import { getProjectById } from '../../../../api/projectApi'
import ProjectDetail from '../../../../_components/ProjectDetail'
import Technologies from '../../../../_components/ProjectDetail/Technologies'

interface PageProps {
  params: {
    projectId: string
  }
}
export default async function page({ params }: PageProps) {
  const { projects } = await getProjectById({ id: params.projectId })
  const [project] = projects

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
        </>
      )}
    </>
  )
}
