import React from 'react'
import { Project } from '../../../payload-types'
import Spinner from '../Spinner/Spinner'
import ImageSlider from '../ImageSlider'
import Link from 'next/link'
import { Technologies } from '../../../config'

const RelatedProjectCard = ({ data }: { data: Project }) => {
  const techArr = Technologies.filter(item => data?.technologies?.includes(item.value))
  if (!data) <Spinner />
  return (
    <>
      {data && data.images?.length > 0 && data.title && (
        <Link title="Permalink" href={`/projects/${data.id}`} className="h-full flex-1">
          <article
            data-project-id={data.id}
            className={`card grid grid-rows-[auto_1fr] p-3 gap-2 rounded-lg max-w-full w-full h-full transition-all hover:bg-surface-2 cursor-pointer`}
          >
            <div className="card__content grid gap-y-2 leading-tight w-full h-full">
              <div className="grid w-full min-h-[85px] h-[200px] sm:h-[150px] bg-surface-3 rounded-lg">
                <ImageSlider dataImage={data.images} />
              </div>
              <h2 className="my-1 px-1 font-bold break-words text-fluid--1 truncate capitalize">
                {data.title}
              </h2>
              {data.technologies && techArr && techArr.length > 0 && (
                <div className="inline-flex items-center gap-1 mt-2 flex-wrap ">
                  {techArr
                    .sort((a: any, b: any) => a - b)
                    .map((item, index) => (
                      <div
                        key={index}
                        className="py-1 px-2 inline-flex items-center gap-0.5 rounded-full w-auto bg-surface-4"
                      >
                        <span role="img" aria-hidden="true">
                          #
                        </span>
                        <span className="text-fluid--2 font-bold">{item.label}</span>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </article>
        </Link>
      )}
    </>
  )
}

export default RelatedProjectCard
