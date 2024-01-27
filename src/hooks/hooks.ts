import { useSelector, type TypedUseSelectorHook, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../app/redux/store'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
