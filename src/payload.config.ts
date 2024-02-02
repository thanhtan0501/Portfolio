import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import dotenv from 'dotenv'
import path from 'path'
import { buildConfig } from 'payload/config'

import { cloudStorage } from '@payloadcms/plugin-cloud-storage'
import { gcsAdapter } from '@payloadcms/plugin-cloud-storage/gcs'

import Users from './collections/Users'
import { Pages } from './collections/Pages'
import { Media } from './collections/Media'
import { Projects } from './collections/Projects/Projects'
import { Footer } from './globals/Footer'
import Codes from './collections/Codes'
import { Feeds } from './collections/Feeds'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

const adapter = gcsAdapter({
  options: {
    keyFilename: process.env.GCS_KEYFILENAME,
    apiEndpoint: process.env.GCS_ENDPOINT,
    projectId: process.env.GCS_PROJECT_ID,
  },
  bucket: process.env.GCS_BUCKET,
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
    webpack: config => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@payloadcms/plugin-cloud-storage': './mocks/plugin-cloud-storage', // mocks out the entire cloud storage plugin. there's an issue where it causes the Payload frontend to not build
        },
      },
    }),
  },
  editor: slateEditor({}),
  collections: [Users, Media, Projects, Pages, Codes, Feeds],
  globals: [Footer],
  cors: [process.env.NEXT_PUBLIC_PAYLOAD_URL].filter(Boolean),
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL, process.env.NEXT_PUBLIC_PAYLOAD_URL].filter(
    Boolean,
  ),
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  plugins: [
    cloudStorage({
      collections: {
        media: {
          adapter,
          disableLocalStorage: false,
        },
      },
    }),
  ],
  routes: {
    admin: '/admin',
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
})
