import React from 'react'
import { NextIcon1, PreviousIcon1, PreviousIcon2 } from '../../../assets/icon'

const Pagination = ({
  onClick,
  current,
  total,
}: {
  onClick: (current: number) => void
  current: number
  total: number
}) => {
  if (total <= 1 || !current || !total) return null
  return (
    <nav aria-labelledby="pagination-header" className="mt-8">
      <ul className="flex items-center justify-center gap-x-2">
        <li>
          {current > 1 && (
            <button
              title="Previous page"
              className="w-10 h-10 grid place-items-center rounded-md hover:bg-surface-3 transition-all"
              onClick={() => {
                onClick(current - 1)
              }}
              type="button"
            >
              <PreviousIcon1 className="w-5 h-5" />
            </button>
          )}
          {current === 1 && (
            <span className="text-text-4 opacity-20 w-10 h-10 grid place-items-center rounded-md">
              <PreviousIcon2 className="w-5 h-5" />
            </span>
          )}
        </li>
        <li>
          <span className="grid place-items-center">{`${current} / ${total}`}</span>
        </li>
        <li>
          {current < total && (
            <button
              title="Next page"
              className="w-10 h-10 grid place-items-center rounded-md hover:bg-surface-3 transition-all"
              onClick={() => {
                onClick(current + 1)
              }}
              type="button"
            >
              <NextIcon1 className="w-5 h-5" />
            </button>
          )}
          {current === total && (
            <span className="text-text-4 opacity-20 w-10 h-10 grid place-items-center rounded-md">
              <NextIcon1 className="w-5 h-5" />
            </span>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
