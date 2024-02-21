'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { ROUTES } from '../../../utils/routes'
import { useAppDispatch } from '../../../hooks/hooks'
import { getAllProjectFailed } from '../../redux/slices/projectSlice'

interface RoutesProps {
  item: typeof ROUTES
}

const TabNav = ({ item }: RoutesProps) => {
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const newRoutes = item.map((i: any) => {
    if (i.href === pathname) i.active = true
    else i.active = false
    return i
  })

  if (!item.some(i => i.href === pathname)) {
    return <></>
  } else {
    dispatch(getAllProjectFailed())
  }

  return (
    <div data-tabs="true" role="navigation">
      <ul className="max-w-full overflow-auto grid grid-flow-col auto-cols-[1fr] items-center text-fluid--1 ">
        {newRoutes.map(({ active, enabled, href, label }) => {
          if (!enabled) return null
          return (
            <li key={label} className={`flex-grow hover:bg-surface-2 rounded transition-all`}>
              <Link
                href={href}
                data-tab-active={active}
                className={`font-bold grid place-items-center w-full h-full text-text-4 hover:no-underline focus-visible:outline-0 focus-visible:bg-surface-2`}
              >
                <span
                  className={`${
                    active ? 'border-b-text-1 text-text-1' : ''
                  } p-2 px-4 border-y-4 border-transparent`}
                >
                  {label}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default TabNav
