import React from 'react'
import Banner from '../Banner'
import Description from './Description'
import { getMeUser } from '../../api/getMeUser'

const Header = async () => {
  const { user } = await getMeUser()
  return (
    <header className="w-feature max-w-full mx-auto pb-2">
      <Banner code={user.code} />
      <Description user={user} />
    </header>
  )
}
export default Header
