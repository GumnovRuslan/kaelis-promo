import { ArticlesList, Message, AboutApp } from "@/components/sections";

const ArticlesPage = async () => {
  return (
    <>
      <ArticlesList />
      <AboutApp />
      <Message textIsShow/>
    </>
  );
}

export default ArticlesPage;