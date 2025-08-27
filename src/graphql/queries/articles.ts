export const getArticles = (lang: string = 'en') => `
  query {
  allArticlesItem(where: { i18n_lang: { eq: "${lang}" } }) {
  	_id
    title
    i18n_lang
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

export const getArticle = (slug: string) => `
  query {
    allArticlesItem(where: { slug: { current: { eq: "${slug}" } } }) {
     _id
    title
    desc
    i18n_lang
    date
    slug {current}
    contentRaw
    breadcrumbs {
      label
      url
    }
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