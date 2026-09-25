export type Technology = Readonly<{
  id: string
  slug: string
  name: string
  category: string | null
  sortOrder: number
  createdAt: Date
  updatedAt: Date
}>

export type UpsertTechnologyInput = Readonly<{
  slug: string
  name: string
  category?: string | null
  sortOrder?: number
}>
