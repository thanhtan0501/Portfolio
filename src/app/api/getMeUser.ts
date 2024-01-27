import { getPayloadClient } from '../../getPayload'

export const getMeUser = async () => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'users',
  })

  return {
    user: docs[0],
  }
}
