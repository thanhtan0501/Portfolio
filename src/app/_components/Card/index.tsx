'use client'
import React from 'react'
import { Project } from '../../../payload-types'
import { useAppSelector } from '../../../hooks/hooks'
import Image from 'next/image'
import { LinkIcon } from '../../../assets/icon'
import ImageSlider from '../ImageSlider'
import { Technologies } from '../../../config'
import Link from 'next/link'
import { RichText } from '../RichText'

const Card = ({ data }: { data: Project }) => {
  const { user } = useAppSelector(state => state.user)
  const techArr = Technologies.filter(item => data?.technologies.includes(item.value))

  return (
    <article
      data-project-id={data.id}
      className={`card grid grid-cols-[auto_1fr] p-4 gap-4 rounded-lg max-w-full w-full transition-all hover:bg-surface-2`}
    >
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
      <div className="card__content grid gap-y-2 leading-tight w-full">
        <div className="flex gap-x-2 text-fluid--1 items-center text-text-4 w-full">
          <Link href={'/'} className="hover:underline font-bold text-text-1">
            {user.name}
          </Link>
          {data.publishedAt && (
            <>
              <span>•</span>
              <time className="text-fluid--2">{`${new Intl.DateTimeFormat('en-GB', {
                year: 'numeric',
                day: 'numeric',
                month: 'short',
              }).format(new Date(data.publishedAt))}`}</time>
            </>
          )}
        </div>
        <h1 className="my-2 font-bold text-fluid-2">{data.title}</h1>
        <RichText content={data.description} />
        {data.technologies && techArr && techArr.length > 0 && (
          <div className="inline-flex items-center gap-1 mt-2">
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
        <div className="bg-surface-3 rounded-lg w-full grid gap-y-2 leading-tight aspect-video">
          <ImageSlider dataImage={data.images} />
        </div>

        <div className="card__actions flex justify-end items-center">
          {true && (
            <Link
              title="Permalink"
              className="w-10 h-10 grid place-items-center hover:bg-surface-3 rounded-md text-text-2 transition-all hover:text-brand-stroke"
              href={`/projects/${data.id}`}
            >
              <LinkIcon className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}

export default Card
