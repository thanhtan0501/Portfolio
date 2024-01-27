import type { CollectionConfig } from 'payload/types'

export const Feeds: CollectionConfig = {
  slug: 'feeds',
  admin: {
    defaultColumns: ['createdAt', 'publishedAt'],
  },
  hooks: {},
  versions: {
    drafts: true,
  },
  access: { read: () => true },
  fields: [
    {
      name: 'detail',
      label: 'Feed Detail',
      type: 'richText',
      required: true,
    },
    {
      name: 'images',
      label: 'Feed Image(s)',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      required: true,
      labels: {
        singular: 'Image',
        plural: 'Images',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'custom',
      type: 'radio',
      label: 'Images Type',
      options: [
        {
          label: 'Default',
          value: '0',
        },
        {
          label: 'Slides',
          value: '1',
        },
        {
          label: 'Gallery',
          value: '2',
        },
      ],
      defaultValue: '0',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
