import type { CollectionConfig } from 'payload/types'
import { Technologies } from '../../config'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt', 'publishedAt'],
  },
  hooks: {},
  versions: {
    drafts: true,
  },
  access: { read: () => true },
  fields: [
    {
      name: 'title',
      label: 'Project Name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Project Description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'detail',
      label: 'Project Detail',
      type: 'richText',
    },
    {
      name: 'images',
      label: 'Project Image(s)',
      type: 'array',
      minRows: 1,
      maxRows: 3,
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
      name: 'link_code',
      label: 'Link Github',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'link_demo',
      label: 'Link Demo',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'technologies',
      label: 'Technologies',
      type: 'select',
      hasMany: true,
      options: Technologies.sort((a, b) => (a.value > b.value ? 1 : -1)).map(
        ({ label, value }) => ({
          label,
          value,
        }),
      ),
      admin: {
        position: 'sidebar',
      },
      required: true,
    },
    {
      name: 'relatedProjects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      filterOptions: ({ id }) => {
        return {
          id: {
            not_in: [id],
          },
        }
      },
    },
  ],
}
