export const getArticles = (lang: string = 'en') => `
  query {
  allArticlesItem(where: { language: { eq: "${lang}" } }) {
  	_id
    title
    language
    date
    slug {current}
    category { title }
    coverImage {
      image {
        asset {
          url
        }
      }
      altText
    }
  }
}
`;

export const getArticleSeo = (slug: string) => `
  query {
    allArticlesItem(where: { 
    slug: { current: { eq: "${slug}" } } 
    }) {
    seo {
      title
      description
      keywords
      ogType
      twitterCard
      image {
        image { asset { url } }
        altText
      }
    }
  }
}
`

export const getArticle = (slug: string) => `
  query {
    allArticlesItem(where: { slug: { current: { eq: "${slug}" } } }) {
     _id
    title
    desc
    language
    date
    slug {current}
    contentRaw
    breadcrumbs {
      label
      url
    }
    category { title }
    coverImage {
      image { asset { url } }
      altText
    }
    }
  }
`;