export interface Config {
  collections: {
    users: User
    media: Media
    projects: Project
    pages: Page
    codes: Code
    feeds: Feed
    'payload-preferences': PayloadPreference
    'payload-migrations': PayloadMigration
  }
  globals: {
    footer: Footer
  }
}
export interface User {
  id: string
  name?: string | null
  description?: string | null
  birthday?: string | null
  location?: string | null
  avatar?: Media | null
  code?: Code | null
  updatedAt: string
  createdAt: string
  email: string
  resetPasswordToken?: string | null
  resetPasswordExpiration?: string | null
  salt?: string | null
  hash?: string | null
  loginAttempts?: number | null
  lockUntil?: string | null
  password: string | null
}
export interface Media {
  id: string
  alt: string
  description?: string | null
  updatedAt: string
  createdAt: string
  url?: string | null
  filename?: string | null
  mimeType?: string | null
  filesize?: number | null
  width?: number | null
  height?: number | null
  sizes?: {
    thumbnail?: {
      url?: string | null
      width?: number | null
      height?: number | null
      mimeType?: string | null
      filesize?: number | null
      filename?: string | null
    }
    medium?: {
      url?: string | null
      width?: number | null
      height?: number | null
      mimeType?: string | null
      filesize?: number | null
      filename?: string | null
    }
    large?: {
      url?: string | null
      width?: number | null
      height?: number | null
      mimeType?: string | null
      filesize?: number | null
      filename?: string | null
    }
    hero?: {
      url?: string | null
      width?: number | null
      height?: number | null
      mimeType?: string | null
      filesize?: number | null
      filename?: string | null
    }
  }
}
export interface Code {
  id: string
  title: string
  code?: string | null
  updatedAt: string
  createdAt: string
  url?: string | null
  filename?: string | null
  mimeType?: string | null
  filesize?: number | null
  width?: number | null
  height?: number | null
}
export interface Project {
  id: string
  title: string
  description: string
  detail?:
    | {
        [k: string]: unknown
      }[]
    | null
  images: {
    image: Media
    id?: string | null
  }[]
  publishedAt?: string | null
  link_code?: string | null
  link_demo: string
  technologies: String[]
  relatedProjects?: Project[] | null
  updatedAt: string
  createdAt: string
  _status?: ('draft' | 'published') | null
}
export interface Page {
  id: string
  title?: string | null
  richText: {
    [k: string]: unknown
  }[]
  updatedAt: string
  createdAt: string
}
export interface Feed {
  id: string
  detail: {
    [k: string]: unknown
  }[]
  images: {
    image: Media
    id?: string | null
  }[]
  publishedAt?: string | null
  custom?: ('0' | '1' | '2') | null
  updatedAt: string
  createdAt: string
  _status?: ('draft' | 'published') | null
}
export interface PayloadPreference {
  id: string
  user: {
    relationTo: 'users'
    value: string | User
  }
  key?: string | null
  value?:
    | {
        [k: string]: unknown
      }
    | unknown[]
    | string
    | number
    | boolean
    | null
  updatedAt: string
  createdAt: string
}
export interface PayloadMigration {
  id: string
  name?: string | null
  batch?: number | null
  updatedAt: string
  createdAt: string
}
export interface Footer {
  id: string
  SocialItem?:
    | {
        social_name?: string | null
        title?: string | null
        link_address: string
        icon: string
        id?: string | null
      }[]
    | null
  updatedAt?: string | null
  createdAt?: string | null
}

declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}
