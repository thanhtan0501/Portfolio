import { getPayloadClient } from '../../getPayload'

export const getProjectById = async ({ id }: { id: string }) => {
  const payload = await getPayloadClient()
  const project = await payload.findByID({
    collection: 'projects',
    id: id,
  })
  return {
    project,
  }
}
