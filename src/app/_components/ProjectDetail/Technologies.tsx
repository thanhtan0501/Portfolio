import React from 'react'
import { LinkIcon } from '../../../assets/icon'
import { Technologies as Tech } from '../../../config'

const Technologies = ({ data }: { data: String[] }) => {
  const techArr = Tech.filter(({ value }) => data.includes(value))

  return (
    <div>
      <h2
        id="technologies"
        tabIndex={-1}
        className="scroll-mt-16 flex gap-x-2 items-center mt-5 font-bold uppercase text-fluid-1 mb-2"
      >
        <span>Technologies</span>
        <a
          href="#technologies"
          title="permalink"
          className="w-11 h-11 text-text-1 grid place-items-center hover:bg-surface-4 rounded-md hover:text-brand-stroke transition-all"
        >
          <LinkIcon className="w-5 h-5" />
        </a>
      </h2>
      <ul className="list-disc pl-8 mb-6">
        {techArr &&
          techArr.length > 0 &&
          techArr.map(item => (
            <li className="pl-1" key={item.value}>
              {item.label}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Technologies
