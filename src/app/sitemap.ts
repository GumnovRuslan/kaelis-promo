import { getArticlesSlug } from "@/graphql/queries/articles";
import { fetchGraphQL } from "@/lib/graphql";
import { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";
import { parseSlug } from "@/utils/parseSlug";
import { getPolicies } from "@/graphql/queries/policy";
import type { TArticlesSlug, TPolicy } from "@/types";
import { getCategories, getSpreads } from "@/lib/api";

const baseUrl = "https://kaelisai.com";

const staticRoutes = [
  "/",
  "/tarot",
  "/articles",
  "/contacts",
  "/faq",
  "/download-from-store",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Загружаем статьи для всех языков
  const articlesResponses = await Promise.all(
    locales.map((locale) =>
      fetchGraphQL(getArticlesSlug(locale))
    )
  );

  // Загрузка политик и правил для всех языков
  const policyResponses = await Promise.all(
    locales.map((locale) => 
      fetchGraphQL(getPolicies(locale))
    )
  )

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
        sitemap.push({
          url: `${baseUrl}/${locale}/articles${article.slug.current}`,
          lastModified: article?._updatedAt
            ? new Date(article._updatedAt)
            : new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        });
      });
  });

  // Политики и правила
  policyResponses.forEach((response, id) => {
    const locale = locales[id];
    const articles: TPolicy[] = response?.data?.allPolicy ?? [];

    articles
      .filter((policy) => policy?.slug?.current)
      .forEach((policy) => {
        sitemap.push({
          url: `${baseUrl}/${locale}/policy/${policy.slug.current}`,
          lastModified: policy?._updatedAt
            ? new Date(policy._updatedAt)
            : new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        });
      });
  });

  // получение всех категорий и спредов для генерации URL
  const categories = await getCategories();

  for (const category of categories) {
    for (const locale of locales) {
      sitemap.push({
        url: `${baseUrl}/${locale}/tarot/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
      

    const spreads = await getSpreads(category.id);

    for (const spread of spreads) {
      for (const locale of locales) {
        sitemap.push({
          url: `${baseUrl}/${locale}/tarot/${category.slug}/${spread.slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      }
    }
  }

  return sitemap;
}
