'use client'
import React from 'react'

import './styles.css'
import { Media } from '../../../payload-types'
import Default from './Default'
import Gallery from './Gallery'
import Slider from './Slider'

interface ImageSliderProps {
  dataImage: { image: Media; id?: string }[]
  isCustom?: string
}

const ImageSlider = ({ dataImage, isCustom = '1' }: ImageSliderProps) => {
  const urls = dataImage.map(({ image }) => {
    return { type: image.mimeType, link: typeof image === 'string' ? image : image.url }
  })

  return (
    <div className="group relative aspect-auto h-full overflow-hidden rounded-lg w-full">
      {isCustom === '0' && <Default data={urls} />}
      {isCustom === '1' && <Slider data={urls} />}
      {isCustom === '2' && <Gallery data={urls} />}
    </div>
  )
}

export default ImageSlider
