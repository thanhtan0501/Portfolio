import React from 'react'
import { getPayloadClient } from '../../../../getPayload'
import { Page } from '../../../../payload-types'
import NotFound from '../../../not-found'
import { RichText } from '../../../_components/RichText'

const Home = async () => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
  })
  const about = docs?.[0] as Page

  if (!about) {
    return NotFound()
  }

  return (
    <div className="mt-8">
      <RichText content={about.richText} />
    </div>
  )
}

export default Home
