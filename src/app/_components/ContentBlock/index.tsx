import React from 'react'
import Markdown from 'react-markdown'
import DefaultComponents from './DefaultComponents'
import AboutComponents from './AboutComponents'
import remarkGfm from 'remark-gfm'

import rehypeRaw from 'rehype-raw'

const ContentBlock = ({ type, children }: { type: string; children: React.ReactNode }) => {
  const rehypePlugins = [rehypeRaw]

  let components = { ...DefaultComponents }
  if (type === 'about') components = { ...DefaultComponents, ...AboutComponents }
  //   if (type === 'bio') components = { ...defaultComponents, ...bioComponents }

  return (
    <Markdown
      remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
      rehypePlugins={rehypePlugins}
      components={components}
      // children={typeof children === 'string' && children}
      // children={typeof children === 'string' ? children : children.props.value.toString()}
    >
      {typeof children === 'string' && children}
    </Markdown>
  )
}

export default ContentBlock
