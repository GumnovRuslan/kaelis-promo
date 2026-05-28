import { locales } from "@/i18n/routing"

type Locale = typeof locales[number]

export const parseSlug = (slug: string) => {
  const parts = slug.split('-')
  const lastPart = parts.at(-1)

  if (locales.includes(lastPart as Locale)) {
    return {
      baseSlug: parts.slice(0, -1).join('-'),
      lang: lastPart as Locale
    }
  }

  return {
    baseSlug: slug,
    lang: null
  }
}