import React, { Suspense } from 'react'
import Spinner from '../../_components/Spinner/Spinner'
import FeedReel from '../../_components/FeedReel'

const Home = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <FeedReel />
    </Suspense>
  )
}

export default Home
