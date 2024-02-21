'use client'
import React from 'react'
import { Project } from '../../../payload-types'
import { LinkIcon } from '../../../assets/icon'
import RelatedProjectCard from '../Card/RelatedProjectCard'

const RelatedProjects = ({ data }: { data: Project[] }) => {
  return (
    <div>
      {data && data.length > 0 && (
        <>
          <h2
            id="related-projects"
            tabIndex={-1}
            className="scroll-mt-16 flex gap-x-2 items-center font-bold uppercase text-fluid-1 mb-2"
          >
            <span>Related Projects</span>
            <a
              href="#technologies"
              title="permalink"
              className="w-11 h-11 text-text-1 grid place-items-center hover:bg-surface-4 rounded-md hover:text-brand-stroke transition-all"
            >
              <LinkIcon className="w-5 h-5" />
            </a>
          </h2>
          <div className=" h-max grid  grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 py-4 gap-4">
            {data.map((item, i) => (
              <div key={i} className="h-full w-full rounded-lg">
                <RelatedProjectCard data={item} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default RelatedProjects
