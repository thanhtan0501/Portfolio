import React from 'react'
import { Suspense } from 'react'
import { ROUTES } from '../../../utils/routes'
import Header from '../../_components/Header'
import TabNav from '../../_components/TabNav'
import Wrapper from '../../_components/Wrapper'
import Spinner from '../../_components/Spinner/Spinner'

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="w-feature max-w-full mx-auto pb-2">
        <TabNav item={ROUTES} />
      </div>
      <Suspense fallback={<Spinner />}>
        <div className="flex-grow flex-1">
          <Wrapper>{children}</Wrapper>
        </div>
      </Suspense>
    </>
  )
}

export default PageLayout
