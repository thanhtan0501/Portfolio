import type { GlobalConfig } from 'payload/types'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'SocialItem',
      type: 'array',
      maxRows: 6,
      fields: [
        {
          name: 'social_name',
          label: 'Social Name',
          type: 'text',
        },
        {
          name: 'title',
          label: 'Description',
          type: 'text',
        },
        {
          name: 'link_address',
          label: 'Social Link',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          label: 'Icon SVG',
          type: 'code',
          required: true,
        },
      ],
    },
  ],
}
