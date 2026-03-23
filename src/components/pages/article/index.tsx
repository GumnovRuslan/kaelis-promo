import { Article, Message, ArticleNotFound } from "@/components/sections";
import { TArticle } from "@/types/articles";

type TProps = {
  article: TArticle | null;
}

const ArticlePage = ({article}: TProps) => {
  if(!article) return <ArticleNotFound/>
  else return (
      <>
      <Article data={article}/>
      <Message/>
      </>
    )
  
}

export default ArticlePage;