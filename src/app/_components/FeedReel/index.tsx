'use client'
import qs from 'qs'
import React, { useEffect, useState } from 'react'
import Spinner from '../Spinner/Spinner'
import { Feed } from '../../../payload-types'
import FeedCard from '../Card/FeedCard'

type Result = {
  docs: Feed[]
  hasNextPage: boolean
  hasPrevPage: boolean
  nextPage: number
  page: number
  prevPage: number
  totalDocs: number
  totalPages: number
}

const LIMIT = 3

const FeedReel = () => {
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [results, setResults] = useState<Result>({
    docs: [],
    hasNextPage: false,
    hasPrevPage: false,
    nextPage: 1,
    page: 1,
    prevPage: 1,
    totalDocs: 0,
    totalPages: 1,
  })

  useEffect(() => {
    let timer: NodeJS.Timeout = null

    timer = setTimeout(() => {
      if (!isLoading) {
        setIsLoading(true)
      }
    }, 500)

    const projectQuery = qs.stringify(
      {
        depth: 1,
        limit: LIMIT,
        page,
        sort: '-publishedAt',
      },
      { encode: false },
    )
    const fetchData = async () => {
      try {
        const req = await fetch(`/api/feeds?${projectQuery}`)
        const json = await req.json()
        clearTimeout(timer)
        const { docs } = json as { docs: Feed[] }
        if (docs && Array.isArray(docs)) {
          setResults(json)
          setIsLoading(false)
        }
      } catch (error) {
        console.warn(error)
        setIsLoading(false)
      }
    }
    fetchData()
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [page])

  console.log(results)

  return (
    <div>
      {isLoading && <Spinner />}
      <div
        className={`grid gap-4 pt-4 ${
          !isLoading && results.docs && results.docs.length === 0 ? 'px-4' : ''
        }`}
      >
        {!isLoading && results.docs && results.docs.length === 0 && (
          <p className="border-2 border-current text-center text-text-2 p-4 grid items-center rounded-md">
            {`No feeds to show currently.`}
          </p>
        )}
        {results.docs &&
          results.docs.length > 0 &&
          results.docs.map(item => {
            return <FeedCard key={item.id} data={item} />
          })}
      </div>
    </div>
  )
}

export default FeedReel
