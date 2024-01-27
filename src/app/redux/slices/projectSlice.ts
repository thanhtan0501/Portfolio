import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Project } from '../../../payload-types'

interface ProjectState {
  data: Project
}
const initialState: ProjectState = {
  data: {
    id: '',
    title: '',
    description: '',
    detail: [],
    images: [],
    publishedAt: '',
    link_code: '',
    link_demo: '',
    technologies: [],
    relatedProjects: [],
  } as Project,
}

export const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    getAllProjectSuccess: (state, action: PayloadAction<any>) => {
      state.data = { ...action.payload.data }
    },
    getAllProjectFailed: state => {
      state.data = initialState.data
    },
  },
})

export const { getAllProjectSuccess, getAllProjectFailed } = projectSlice.actions
export default projectSlice.reducer
