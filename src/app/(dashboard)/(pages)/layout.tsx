import React from 'react'
import { ROUTES } from '../../../utils/routes'
import Header from '../../_components/Header'
import TabNav from '../../_components/TabNav'
import Wrapper from '../../_components/Wrapper'

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="w-feature max-w-full mx-auto pb-2">
        <TabNav item={ROUTES} />
      </div>
      <div className="flex-grow flex-1 relative overflow-x-hidden">
        <Wrapper>{children}</Wrapper>
      </div>
    </>
  )
}

export default PageLayout
