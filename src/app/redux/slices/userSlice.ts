'use client'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from '../../../payload-types'

interface UserState {
  user: User
}
const initialState: UserState = {
  user: {
    name: 'Thanh Tan',
    avatar: {
      url: '/assets/image/avatar.jpg',
    },
    description: "'Where in the world is Thanh Tan?'",
    birthday: '1999-03-20T12:00:00.000Z',
    location: 'Ho Chi Minh City, Vietnam',
  } as User,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserSuccess: (state, action: PayloadAction<any>) => {
      state.user = { ...state.user, ...action.payload.user }
    },
  },
})
export const { getUserSuccess } = userSlice.actions

export default userSlice.reducer
