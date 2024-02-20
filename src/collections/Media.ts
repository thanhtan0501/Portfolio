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
    adminThumbnail: 'thumbnail',
    staticURL: './media',
    // staticDir: path.resolve(__dirname, '/media'),
    staticDir: path.resolve(__dirname, '../../../media'),
    mimeTypes: ['image/*', 'audio/*', 'video/*', 'application/pdf'],
    imageSizes: [
      { name: 'thumbnail', width: 320, height: 320, position: 'centre' },
      { name: 'medium', width: 640, height: 640, position: 'centre' },
      { name: 'large', width: 1280, height: 1280, position: 'centre' },
      { name: 'hero', width: 1920, height: 1080, position: 'centre' },
    ],
  },
  access: {
    read: () => true,
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
