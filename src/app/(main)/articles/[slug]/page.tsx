import { ArticlePage } from "@/components/pages";

interface PageProps {
  params: {
    slug: string;
  }
}

const Article = async ({params}: PageProps) =>  {
  const { slug } = await params;
  return (
    <ArticlePage slug={slug}/>
  )

}

export default Article;