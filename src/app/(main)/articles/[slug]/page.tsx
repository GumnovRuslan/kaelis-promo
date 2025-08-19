import { ArticlePage } from "@/components/pages";

interface PageProps {
  params: {
    slug: string;
  }
}

const Article = ({params}: PageProps) =>  {
  const { slug } = params;
  return (
    <ArticlePage slug={slug}/>
  )

}

export default Article;