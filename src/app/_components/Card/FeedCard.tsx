'use client'
import React from 'react'
import { Feed } from '../../../payload-types'
import { useAppSelector } from '../../../hooks/hooks'
import Image from 'next/image'
import Link from 'next/link'
import { RichText } from '../RichText'
import ImageSlider from '../ImageSlider'

const FeedCard = ({ data }: { data: Feed }) => {
  const { user } = useAppSelector(state => state.user)

  return (
    <article
      data-project-id={data.id}
      className={`card grid grid-rows-[auto_1fr] p-4 gap-4 rounded-lg max-w-full w-full transition-all hover:bg-surface-2`}
    >
      <div className="flex flex-row gap-[1vmin] items-center">
        <Link href={`/`} className="w-10 h-10 rounded-full">
          <Image
            src={user?.avatar?.url}
            alt="Author image"
            className="rounded-full bg-surface-4 object-cover object-center !w-10 !h-10"
            width="80"
            height="80"
            loading="eager"
          />
        </Link>
        <div className="flex flex-col gap-x-2 text-fluid--1 items-start text-text-4 w-full flex-1">
          <Link href={'/'} className="hover:underline font-bold text-text-1">
            {user.name}
          </Link>
          {/* <span>•</span> */}
          <time className="text-fluid--2">{`${new Intl.DateTimeFormat('en-GB', {
            year: 'numeric',
            day: 'numeric',
            month: 'short',
          }).format(new Date(data.publishedAt || data.createdAt))}`}</time>
        </div>
      </div>
      <div className="card__content grid gap-y-2 leading-tight w-full">
        <RichText content={data.detail} />
        <ImageSlider dataImage={data.images} isCustom={data.custom} />
      </div>
    </article>
  )
}

export default FeedCard
