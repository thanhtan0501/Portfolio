'use client'

import React, { useEffect } from 'react'
import { Project } from '../../../payload-types'
import { useAppDispatch } from '../../../hooks/hooks'
import { getAllProjectSuccess } from '../../redux/slices/projectSlice'
import { RichText } from '../RichText'
import ImageSlider from '../ImageSlider'

const ProjectDetail = ({ data }: { data: Project }) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (data) {
      dispatch(getAllProjectSuccess({ data }))
    }
  }, [])

  return (
    <div className="mt-8">
      {data.detail && data.detail.length > 0 ? (
        <RichText content={data.detail} />
      ) : (
        <div className="card__content grid gap-y-2 leading-tight w-full">
          <ImageSlider dataImage={data.images} />
        </div>
      )}
    </div>
  )
}

export default ProjectDetail
