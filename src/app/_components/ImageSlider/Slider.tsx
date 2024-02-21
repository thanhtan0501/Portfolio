'use client'
import 'swiper/css'
import 'swiper/css/pagination'
import type SwiperType from 'swiper'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { NextIcon2, PreviousIcon2 } from '../../../assets/icon'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

interface SliderProps {
  data: { type: string; link: string }[]
}

const Slider = ({ data }: SliderProps) => {
  const [swiper, setSwiper] = useState<null | SwiperType>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const [slideConfig, setSlideConfig] = useState({
    isBeginning: true,
    isEnd: activeIndex === (data?.length ?? 0) - 1,
  })

  useEffect(() => {
    swiper?.on('slideChange', ({ activeIndex }) => {
      setActiveIndex(activeIndex)
      setSlideConfig({
        isBeginning: activeIndex === 0,
        isEnd: activeIndex === (data?.length ?? 0) - 1,
      })
    })
  }, [swiper, data])

  const activeStyles =
    'absolute active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-lg border-2 bg-white border-zinc-300'
  const inactiveStyles = 'hidden text-gray-400'
  return (
    <>
      <div className="opacity-0 group-hover:opacity-100 transition ">
        <button
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            swiper?.slideNext()
          }}
          className={`${activeStyles} right-3 transition hover:bg-surface-5 hover:border-surface-5 hover:text-white ${
            slideConfig.isEnd ? inactiveStyles : 'hover:bg-primary-300 text-primary-800 opacity-100'
          }`}
          aria-label="next image"
        >
          <NextIcon2 className="h-4 w-4 text-zinc-700" />
        </button>
        <button
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            swiper?.slidePrev()
          }}
          className={`${activeStyles} left-3 transition hover:bg-surface-5 hover:border-surface-5 hover:text-white  ${
            !slideConfig.isBeginning
              ? 'hover:bg-primary-300 text-primary-800 opacity-100'
              : inactiveStyles
          }`}
          aria-label="previous image"
        >
          <PreviousIcon2 className="h-4 w-4 text-zinc-700" />{' '}
        </button>
      </div>
      <Swiper
        pagination={{
          renderBullet: (_, className) => {
            return `<span className="rounded-full transition bottom-5 ${className}"></span>`
          },
        }}
        onSwiper={swiper => setSwiper(swiper)}
        spaceBetween={10}
        modules={[Pagination]}
        slidesPerView={1}
        className="h-full w-full rounded-lg"
      >
        {data?.map((url, i) => (
          <SwiperSlide key={i} className="-z-10 relative h-full w-full rounded-lg">
            {url?.type?.includes('image') && (
              <Image
                loading="eager"
                className="-z-10 object-cover object-center rounded-lg w-full h-full"
                loader={() => url.link}
                src={url.link}
                width={750}
                height={500}
                alt="Project image"
              />
            )}
            {url?.type?.includes('video') && (
              <video
                className="bg-surface-3 rounded-lg h-full object-contain"
                src={url.link}
                width="100%"
                controls
                loop
                controlsList="nodownload"
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default Slider
