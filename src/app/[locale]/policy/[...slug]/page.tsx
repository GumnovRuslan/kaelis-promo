import { fetchGraphQL } from "@/lib/graphql";
import { getPolicy } from "@/graphql/queries/policy";
import { TPolicy } from "@/types/policy";
import { PolicyPage } from "@/components/pages";

type PageProps = {
  params: Promise<{ slug: string }>
}

const Policy = async ({params}: PageProps) =>  {
  const { slug } = await params;
  const { data, errors } = await fetchGraphQL(getPolicy(slug[0]));
  const policy: TPolicy | null = data?.allPolicy?.[0] || null

  if(!policy) return null
  
  return (
    <PolicyPage data={policy}/>
  )

}

export default Policy;