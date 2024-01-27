import { CustomSelectField } from './../fields/Country'
import type { CollectionConfig } from 'payload/types'

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },

    {
      name: 'birthday',
      label: 'Birthday',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMM yyy',
        },
        position: 'sidebar',
      },
    },
    CustomSelectField,
    {
      name: 'avatar',
      label: 'Avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'code',
      label: 'Banner',
      type: 'relationship',
      relationTo: 'codes',
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}

export default Users
