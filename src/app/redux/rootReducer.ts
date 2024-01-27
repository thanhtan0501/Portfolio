'use client'

import { combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import userSlice from './slices/userSlice'
import projectSlice from './slices/projectSlice'
import { persistReducer } from 'redux-persist'

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: [],
}

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['user'],
}

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userSlice),
  projects: projectSlice,
})

export { rootPersistConfig, rootReducer }
