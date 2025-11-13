import { PortableTextBlock } from "@portabletext/react"

export type TPolicy = {
  _id : string
  title: string
  published: string
  slug: {
    current: string
  }
  language: string
  contentRaw: PortableTextBlock[]
}