import { Field } from 'payload/types'
import { CustomSelectComponent } from '../components/CustomSelectComponent'

export const CustomSelectField: Field = {
  name: 'location',
  type: 'text',
  admin: {
    components: {
      Field: CustomSelectComponent,
    },
    position: 'sidebar',
  },
}
