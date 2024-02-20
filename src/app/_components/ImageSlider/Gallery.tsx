import Image from 'next/image'
import React from 'react'
import ModalImage from './ModalImage'
interface GalleryProps {
  data: { type: string; link: string }[]
}
const Gallery = ({ data }: GalleryProps) => {
  return (
    <div className="flex items-center justify-center gap-[1vmin] w-full h-[350px] mt-1">
      {data &&
        data.length > 0 &&
        data.map((item, index) => (
          <div
            key={index}
            className={`w-full h-full ${index % 2 === 0 ? 'pt-4' : 'pb-4'} gallery-transition`}
          >
            <ModalImage key={index} src={item.link} alt="Image feed" />
          </div>
        ))}
    </div>
  )
}

export default Gallery
