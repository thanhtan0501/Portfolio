import React, { Suspense } from 'react'

import ProjectReel from '../../../_components/ProjectReel'
import Spinner from '../../../_components/Spinner/Spinner'

const Projects = () => {
  return (
    // <Suspense fallback={<Spinner />}>
    <>
      <ProjectReel />
    </>
    // </Suspense>
  )
}

export default Projects
