'use client'
import qs from 'qs'
import React, { useEffect, useRef, useState } from 'react'
import Card from '../Card'
import Pagination from '../Pagination'
import { Project } from '../../../payload-types'
import Loading from '../Spinner/Spinner'

type Result = {
  docs: Project[]
  hasNextPage: boolean
  hasPrevPage: boolean
  nextPage: number
  page: number
  prevPage: number
  totalDocs: number
  totalPages: number
}
const LIMIT = 3

const ProjectReel = () => {
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const hasHydrated = useRef(false)
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
        const req = await fetch(`/api/projects?${projectQuery}`)
        const json = await req.json()
        clearTimeout(timer)
        hasHydrated.current = true
        const { docs } = json as { docs: Project[] }
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

  return (
    <div>
      {isLoading && <Loading />}
      <div
        className={`grid gap-4 pt-4 ${
          !isLoading && results.docs && results.docs.length === 0 ? 'px-4' : ''
        }`}
      >
        {!isLoading && results.docs && results.docs.length === 0 && (
          <p className="border-2 border-current text-center text-text-2 p-4 grid items-center rounded-md">
            {`No projects to show currently.`}
          </p>
        )}
        {results.docs &&
          results.docs.length > 0 &&
          results.docs.map(item => {
            return <Card key={item.id} data={item} />
          })}
      </div>
      {page !== 0 && results.totalPages > 1 && (
        <Pagination current={page} total={results.totalPages} onClick={setPage} />
      )}
    </div>
  )
}

export default ProjectReel
