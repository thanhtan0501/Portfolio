'use client'

import { Code } from '../../../payload-types'
import Spinner from '../Spinner/Spinner'

interface CodeProps {
  code: { title?: string; code: string; url?: string } | string | Code
}

const Banner = ({ code }: CodeProps) => {
  if (!code) <Spinner />

  return (
    <div className="w-full aspect-[5/2] bg-surface-3 rounded-lg shadow-md">
      {code?.url && code?.title && (
        <iframe
          title={code.title}
          className="w-full h-full rounded-lg"
          loading="eager"
          src={code.url}
        ></iframe>
      )}
    </div>
  )
}

export default Banner
