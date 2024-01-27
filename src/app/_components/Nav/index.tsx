import React from 'react'
import { LogoIcon1 } from '../../../assets/icon'
import Link from 'next/link'

const Nav = () => {
  return (
    <nav className="flex justify-between bg-surface-alpha sticky top-0 left-0 z-10 p-2 navbar-blur px-4">
      <Link
        className="w-11 h-11 text-text-1 grid place-items-center hover:bg-surface-3 rounded-md transition-all"
        href="/"
      >
        <LogoIcon1 className={'w-9'} />
      </Link>
      {/* <ThemeToggle /> */}
    </nav>
  )
}

export default Nav
