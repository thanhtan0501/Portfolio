import path from 'path'
import type { CollectionConfig } from 'payload/types'

export const Codes: CollectionConfig = {
  slug: 'codes',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  upload: {
    staticURL: 'https://storage.cloud.google.com/portfolio-database-bucket',
    staticDir: path.resolve(__dirname, '/codes'),
    mimeTypes: ['*'],
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'code',
      type: 'code',
      label: 'Code',
    },
  ],
}

export default Codes
