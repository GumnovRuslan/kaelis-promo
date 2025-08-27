import { ArticlesList, Message, AboutApp } from "@/components/sections";
import { getArticles } from "@/graphql/queries/articles";
import { getArticlesCategory } from "@/graphql/queries/articlesCategory";
import { fetchGraphQL } from "@/lib/graphql";
import { getLocale } from "next-intl/server";

const ArticlesPage = async () => {
  const locale = await getLocale();
  const { data: articlesData } = await fetchGraphQL(getArticles(locale || 'en'));
  const { data: categoriesData } = await fetchGraphQL(getArticlesCategory(locale || 'en'));
  const articles = articlesData?.allArticlesItem
  const categories = categoriesData?.allBlogCategory
  
  return (
    <>
      <ArticlesList articles={articles} categories={categories}/>
      <AboutApp />
      <Message textIsShow/>
    </>
  );
}

export default ArticlesPage;