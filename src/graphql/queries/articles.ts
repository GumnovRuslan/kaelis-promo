export const ALL_ARTICLES = `
  query {
  allArticlesItem {
  	_id
    title
    i18n_lang
    date
    slug {current}
    breadcrumbs {
      title
      linkInternal {
        label
        
      }
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
      title
      linkInternal {
        label
        
      }
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