import { getPayloadClient } from '../../getPayload'

export const getAllProjects = async ({
  activePage,
  limit,
}: {
  activePage: number
  limit: number
}) => {
  const payload = await getPayloadClient()
  const page = activePage || 1

  const {
    docs,
    hasNextPage,
    nextPage,
    totalPages,
    page: currentPage,
  } = await payload.find({
    collection: 'projects',
    depth: 1,
    sort: '-publishedAt',
    limit,
    page,
  })

  return {
    projects: docs,
    nextPage: hasNextPage ? nextPage : null,
    totalPages,
    currentPage,
  }
}
export const getProjectById = async ({ id }: { id: string }) => {
  const payload = await getPayloadClient()
  const { docs: projects } = await payload.find({
    collection: 'projects',
    limit: 1,
    where: {
      id: {
        equals: id,
      },
    },
  })
  return {
    projects,
  }
}
