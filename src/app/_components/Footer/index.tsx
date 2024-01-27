import React from 'react'
import { SocialMedia } from '../../../utils/containt'
import { getPayloadClient } from '../../../getPayload'

const Footer = async () => {
  const payload = await getPayloadClient()
  const { SocialItem } = await payload.findGlobal({
    slug: 'footer', // required
    depth: 2,
  })

  return (
    <footer className="w-content max-w-full mv-0 mx-auto py-8 text-text-3">
      <div className="text-fluid--2 grid place-items-center gap-y-2 w-full">
        {/* Social icons */}
        <div className="flex flex-wrap justify-center">
          {SocialItem &&
            SocialItem.length > 0 &&
            SocialItem.map((item, index) => (
              <a
                key={index}
                className="text-text-2 w-10 h-10 grid place-items-center rounded-md hover:bg-surface-3 transition-all"
                href={item.link_address}
                rel="noopener noreferrer"
                target="_blank"
                title={item.title}
                dangerouslySetInnerHTML={{ __html: item.icon }}
              ></a>
            ))}
          {!SocialItem &&
            SocialMedia.map((item, index) => (
              <a
                key={index}
                className="text-text-2 w-10 h-10 grid place-items-center rounded-md hover:bg-surface-3 transition-all"
                href={item.link}
                rel="noopener noreferrer"
                target="_blank"
                title={item.title}
              >
                {item.icon}
              </a>
            ))}
        </div>
        <div>
          Thanh Tan &copy; <span>{`${new Date().getFullYear()}`}</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
