import { fetchGraphQL } from "@/lib/graphql";
import { getPolicy } from "@/graphql/queries/policy";
import { TPolicy } from "@/types/policy";
import { NotFoundPage, PolicyPage } from "@/components/pages";
import { parseSlug } from "@/utils/parseSlug";
import { redirect } from 'next/navigation'
import { TPageProps } from "@/types";

const Policy = async ({params}: TPageProps) =>  {
  const { slug, locale } = await params;
  const {baseSlug, lang} = parseSlug(slug[0])

  let policy: TPolicy | null = null

  if(lang !== locale) {
    redirect(`/policy/${baseSlug}-${locale}`)
  } else {
    const { data, errors } = await fetchGraphQL(getPolicy(`${baseSlug}-${locale}`));
    policy = data?.allPolicy?.[0] || null
  }

  if(!policy) return <NotFoundPage />
  
  return <PolicyPage data={policy}/>
}

export default Policy;