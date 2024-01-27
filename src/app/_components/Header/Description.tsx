'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'

import {
  BirthdayIcon,
  CalendarIcon,
  GithubIcon,
  LinkIcon,
  LocationIcon,
} from '../../../assets/icon'
import DateFormatter from '../FormatDate'
import ContentBlock from '../ContentBlock'
import { Media, Project } from '../../../payload-types'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { getUserSuccess } from '../../redux/slices/userSlice'

interface UserProps {
  user: {
    id: string
    name?: string | null
    description?: string | null
    birthday?: string | null
    location?: string | null
    avatar?: string | { url?: string } | Media
    project?: (string | null) | Project
    updatedAt: string
    createdAt: string
    email: string
  }
}

const Description = ({ user }: UserProps) => {
  const { data } = useAppSelector(state => state.projects)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (user) {
      dispatch(getUserSuccess({ user }))
    }
  }, [])

  return (
    <>
      <div className="relative flex justify-end items-center min-h-half-avatar py-2 pt-6">
        <Image
          className="absolute top-0 transform bg-surface-4 -translate-y-1/2 left-0 rounded-full aspect-square w-avatar border-4 border-text-2 object-cover object-center shadow"
          src={user.avatar?.url}
          alt="Thanh Tan"
          width="200"
          height="200"
          loading="eager"
        />
        {data && data.link_demo && (
          <a
            href={data.link_demo}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:no-underline border-transparent focus:border-text-1 outline-transparent focus-visible:border-text-1 hover:border-text-1 border-2 rounded-full text-fluid--1 flex gap-x-1 items-center transition-all text-white bg-surface-3 px-3 py-2"
          >
            <LinkIcon className="w-5 h-5" />
            <span className="font-bold">Demo</span>
          </a>
        )}
      </div>
      <h1 className="text-fluid-3 flex gap-x-2 items-center font-bold mb-2">
        {data.title || user.name}
      </h1>
      <div className="leading-tight mb-2">
        <ContentBlock type="bio">{data.description || user.description}</ContentBlock>
      </div>
      <span className="flex gap-x-4 items-center text-fluid--1 flex-wrap text-text-4">
        {data && data.publishedAt ? (
          <>
            {data.publishedAt && (
              <span className="flex items-start gap-1">
                <CalendarIcon className="w-5 h-5" />
                <span className="whitespace-nowrap">
                  <DateFormatter dateString={data.publishedAt} />
                </span>
              </span>
            )}
            {data?.link_code && (
              <a
                href={data.link_code}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-1 hover:underline text-white font-semibold"
              >
                <GithubIcon className="w-5 h-5" />
                <span className="whitespace-nowrap">Github</span>
              </a>
            )}
          </>
        ) : (
          <>
            {user?.birthday && (
              <span className="flex items-start gap-1">
                <BirthdayIcon className="w-5 h-5" />
                <span className="whitespace-nowrap">
                  <DateFormatter dateString={user.birthday} />
                </span>
              </span>
            )}
            {user?.location && (
              <span className="flex items-start gap-1">
                <LocationIcon className="w-5 h-5" />
                <span className="whitespace-nowrap">{user.location}</span>
              </span>
            )}
          </>
        )}
      </span>
    </>
  )
}

export default Description
