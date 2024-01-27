import Image from 'next/image'
import React from 'react'

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
          <div className="w-[50%] h-full pt-4 flex flex-col gap-[2vmin]">
            {data.map((item, index) => {
              if (index % 2 === 0) {
                return (
                  <Image
                    alt="Image feed"
                    className={`rounded-lg object-cover flex-1 overflow-hidden w-full max-h-full h-full object-center`}
                    src={item.link}
                    width={750}
                    height={500}
                  />
                )
              }
              return
            })}
          </div>
          <div className="w-[50%] h-full pb-4 flex flex-col gap-[2vmin]">
            {data.map((item, index) => {
              if (index % 2 !== 0) {
                return (
                  <Image
                    alt="Image feed"
                    className={`rounded-lg object-cover flex-1 overflow-hidden w-full h-full  object-center`}
                    src={item.link}
                    width={750}
                    height={500}
                  />
                )
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
