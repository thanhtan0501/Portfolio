import { getProjectById } from '../../../../api/projectApi'
import ProjectDetail from '../../../../_components/ProjectDetail'
import Technologies from '../../../../_components/ProjectDetail/Technologies'
import RelatedProjects from '../../../../_components/ProjectDetail/RelatedProjects'

interface PageProps {
  params: {
    projectId: string
  }
}
export default async function page({ params }: PageProps) {
  const { project } = await getProjectById({ id: params.projectId })

  return (
    <>
      {!project && (
        <p className="border-2 border-current text-center text-text-2 p-4 grid items-center rounded-md">
          {`This project is not available.`}
        </p>
      )}
      {project && (
        <>
          <ProjectDetail data={project} />
          <Technologies data={project.technologies} />
          <RelatedProjects data={project.relatedProjects} />
        </>
      )}
    </>
  )
}
