import React from 'react'
import ModalImage from './ModalImage'

interface DefaultProps {
  data: { type: string; link: string }[]
}
const Default = ({ data }: DefaultProps) => {
  return (
    <div
      className={`flex flex-row-reverse items-center justify-center gap-[2vmin] w-full h-[350px]`}
    >
      {data && data.length > 0 && (
        <>
          <div className="w-[50%] h-full flex flex-col gap-[2vmin]">
            {data.map((item, index) => {
              if (index % 2 === 0) {
                return <ModalImage key={index} src={item.link} alt="Image feed" />
              }
              return
            })}
          </div>
          <div className="w-[50%] h-full flex flex-col gap-[2vmin]">
            {data.map((item, index) => {
              if (index % 2 !== 0) {
                return <ModalImage key={index} src={item.link} alt="Image feed" />
              }
              return
            })}
          </div>
        </>
      )}
    </div>
  )
}

export default Default
