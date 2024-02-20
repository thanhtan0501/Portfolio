import path from 'path'
import type { CollectionConfig } from 'payload/types'

export const Media: CollectionConfig = {
  slug: 'media',
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        return { ...data, user: req.user.id }
      },
    ],
  },
  admin: {
    useAsTitle: 'alt',
  },
  upload: {
    staticURL: 'https://storage.cloud.google.com/portfolio-database-bucket',
    staticDir: path.resolve(__dirname, '/media'),
    mimeTypes: ['image/*', 'audio/*', 'video/*', 'application/pdf'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
    },
  ],
}
