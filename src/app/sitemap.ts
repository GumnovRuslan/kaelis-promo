import { getArticlesSlug } from "@/graphql/queries/articles";
import { fetchGraphQL } from "@/lib/graphql";
import { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";
import { TArticlesSlug } from "@/types/articles";
import { parseSlug } from "@/utils/parseSlug";

const baseUrl = "https://kaelisai.com";

const staticRoutes = [
  "/",
  "/tarot",
  "/articles",
  "/contacts",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Загружаем статьи для всех языков
  const articlesResponses = await Promise.all(
    locales.map((locale) =>
      fetchGraphQL(getArticlesSlug(locale))
    )
  );

  const sitemap: MetadataRoute.Sitemap = [];

  // Статические страницы
  locales.forEach((locale) => {
    staticRoutes.forEach((route) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1 : 0.8,
      });
    });
  });

  // Статьи
  articlesResponses.forEach((response, id) => {
    const locale = locales[id];
    const articles: TArticlesSlug[] = response?.data?.allArticlesItem ?? [];

    articles
      .filter((article) => article?.slug?.current)
      .forEach((article) => {
        // const {baseSlug, lang} = parseSlug(article.slug.current)

        sitemap.push({
          url: `${baseUrl}/${locale}/articles${article.slug.current}`,
          lastModified: article?._updatedAt
            ? new Date(article._updatedAt)
            : new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
          
          // alternates: {
          //   languages: {
          //     en: `${baseUrl}/en/articles${baseSlug}-en`,
          //     ru: `${baseUrl}/ru/articles${baseSlug}-ru`,
          //     uk: `${baseUrl}/ua/articles${baseSlug}-ua`,
          //   },
          // },
        });
      });
  });

  return sitemap;
}
