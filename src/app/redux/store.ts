'use client'
import { configureStore } from '@reduxjs/toolkit'
import { rootPersistConfig, rootReducer } from './rootReducer'
import { persistReducer } from 'redux-persist'

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
