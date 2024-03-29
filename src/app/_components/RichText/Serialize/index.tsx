import React, { Fragment } from 'react'
import escapeHTML from 'escape-html'
import Link from 'next/link'
import { LinkIcon } from '../../../../assets/icon'

type Node = {
  type: string
  value?: {
    [x: string]: string
    url: string
    alt: string
  }
  children?: Node[]
  url?: string
  [key: string]: unknown
  newTab?: boolean
}

export type CustomRenderers = {
  [key: string]: (args: { node: Node; Serialize: SerializeFunction; index: number }) => JSX.Element // eslint-disable-line
}

type SerializeFunction = React.FC<{
  content?: Node[]
  customRenderers?: CustomRenderers
}>

const isText = (value: any): boolean =>
  typeof value === 'object' && value !== null && typeof value.text === 'string'

export const Serialize: SerializeFunction = ({ content, customRenderers }) => {
  return (
    <Fragment>
      {content?.map((node, i) => {
        if (isText(node)) {
          // @ts-expect-error
          let text = <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />

          if (node.bold) {
            text = <strong key={i}>{text}</strong>
          }

          if (node.code) {
            text = <code key={i}>{text}</code>
          }

          if (node.italic) {
            text = <em key={i}>{text}</em>
          }

          if (node.underline) {
            text = (
              <span style={{ textDecoration: 'underline' }} key={i}>
                {text}
              </span>
            )
          }

          if (node.strikethrough) {
            text = (
              <span style={{ textDecoration: 'line-through' }} key={i}>
                {text}
              </span>
            )
          }

          return <Fragment key={i}>{text}</Fragment>
        }

        if (!node) {
          return null
        }

        if (
          customRenderers &&
          customRenderers[node.type] &&
          typeof customRenderers[node.type] === 'function'
        ) {
          return customRenderers[node.type]({ node, Serialize, index: i })
        }

        switch (node.type) {
          case 'br':
            return <br key={i} />

          case 'h1':
            return (
              <h1 key={i} className="font-bold mb-6">
                <Serialize content={node.children} customRenderers={customRenderers} />
              </h1>
            )
          case 'h2':
            return (
              <h2
                id={`${node.children[0].text}`}
                key={i}
                tabIndex={-1}
                className="scroll-mt-16 flex gap-x-2 items-center mt-5 font-bold uppercase text-fluid-1 mb-2"
              >
                <span>
                  <Serialize content={node.children} customRenderers={customRenderers} />
                </span>
                <a
                  href={`#${node.children[0].text}`}
                  title="permalink"
                  className="w-11 h-11 text-text-1 grid place-items-center hover:bg-surface-4 rounded-md hover:text-brand-stroke transition-all"
                >
                  <LinkIcon className="w-5 h-5" />
                </a>
              </h2>
            )
          case 'h3':
            return (
              <h3 key={i} className="font-bold mb-6">
                <Serialize content={node.children} customRenderers={customRenderers} />
              </h3>
            )
          case 'h4':
            return (
              <h4 key={i}>
                <Serialize content={node.children} customRenderers={customRenderers} />
              </h4>
            )
          case 'h5':
            return (
              <h5 key={i}>
                <Serialize content={node.children} customRenderers={customRenderers} />
              </h5>
            )
          case 'h6':
            return (
              <h6 key={i}>
                <Serialize content={node.children} customRenderers={customRenderers} />
              </h6>
            )
          case 'quote':
            return (
              <blockquote key={i}>
                <Serialize content={node.children} customRenderers={customRenderers} />
              </blockquote>
            )

          case 'ul':
            return (
              <ul key={i} className="list-disc pl-8 mb-2">
                <Serialize content={node.children} customRenderers={customRenderers} />
              </ul>
            )

          case 'ol':
            return (
              <ol key={i} className="list-decimal pl-8 mb-2">
                <Serialize content={node.children} customRenderers={customRenderers} />
              </ol>
            )

          case 'li':
            return (
              <li key={i} className="pl-1">
                <Serialize content={node.children} customRenderers={customRenderers} />
              </li>
            )

          case 'link':
            return (
              <Link
                href={node.url}
                key={i}
                {...(node.newTab
                  ? {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    }
                  : {})}
                className="text-[#2f81f7]"
              >
                <Serialize content={node.children} customRenderers={customRenderers} />
              </Link>
            )
          case 'upload': {
            const { value: data } = node
            if (data?.mimeType === 'video/mp4') {
              return (
                <video
                  key={i}
                  className="rounded-lg max-h-[350px] my-4 bg-surface-3 w-full"
                  src={data?.url}
                  width="100%"
                  height="100%"
                  controls
                  loop
                  controlsList="nodownload"
                />
              )
            }
            if (data?.mimeType.includes('audio')) {
              return (
                <audio
                  key={i}
                  className="rounded-lg w-full my-4"
                  src={data?.url}
                  controls
                  loop
                  controlsList="nodownload"
                ></audio>
              )
            }
            if (data?.mimeType === 'application/pdf') {
              return (
                <iframe
                  key={i}
                  src={data?.url}
                  loading="lazy"
                  className="rounded-lg w-full my-4"
                  height="350px"
                  width="100%"
                ></iframe>
              )
            }
            return (
              <figure key={i} className="grid place-items-center my-6 aspect-[5/2]">
                <img
                  className="rounded-lg mb-2 md:max-h-[350px] max-h-full w-auto h-full object-cover"
                  src={data?.url}
                />
                {data?.description && data.description !== '' && (
                  <figcaption className="text-text-3 text-fluid--2">{data.description}</figcaption>
                )}
              </figure>
            )
          }

          default:
            return (
              <p key={i} className="mb-4">
                <Serialize content={node.children} customRenderers={customRenderers} />
              </p>
            )
        }
      })}
    </Fragment>
  )
}
