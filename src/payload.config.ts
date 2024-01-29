import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import dotenv from 'dotenv'
import path from 'path'
import { buildConfig } from 'payload/config'

import Users from './collections/Users'
import { Pages } from './collections/Pages'
import { Media } from './collections/Media'
import { Projects } from './collections/Projects/Projects'
import { Footer } from './globals/Footer'
import Codes from './collections/Codes'
import { Feeds } from './collections/Feeds'
// import { LogoIcon1 } from './assets/icon'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' - Portfolio',
      //  favicon: './assets/favicon.png',
    },
    bundler: webpackBundler(),
    components: {
      graphics: {
        // Logo: LogoIcon1,
        // Icon: LogoIcon1,
      },
    },
  },
  editor: slateEditor({}),
  collections: [Users, Media, Projects, Pages, Codes, Feeds],
  globals: [Footer],
  cors: [process.env.NEXT_PUBLIC_PAYLOAD_URL].filter(Boolean),
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL, process.env.NEXT_PUBLIC_PAYLOAD_URL].filter(
    Boolean,
  ),
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  routes: {
    admin: '/admin',
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
})
