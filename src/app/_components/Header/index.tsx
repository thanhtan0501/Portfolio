import React from 'react'

import Banner from '../Banner'
import Description from './Description'
import { getMeUser } from '../../api/getMeUser'

const Header = async () => {
  const { user } = await getMeUser()

  return (
    <header className="w-feature max-w-full mx-auto pb-2">
      <Banner code={user.code} />
      <div className="w-content max-w-full mv-0 mx-auto grid gap-2 p-4 pt-0">
        <Description user={user} />
      </div>
    </header>
  )
}
export default Header
