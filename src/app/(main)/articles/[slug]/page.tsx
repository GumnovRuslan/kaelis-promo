import { ArticlePage } from "@/components/pages";

type PageProps = {
  params: Promise<{ slug: string }>
}

const Article = async ({params}: PageProps) =>  {
  const { slug } = await params;
  return (
    <ArticlePage slug={slug}/>
  )

}

export default Article;