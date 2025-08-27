export const getArticlesCategory = (lang: string = 'en') => `
  query {
    allBlogCategory(where: { i18n_lang: { eq: "${lang}" } }) {
      title
      i18n_lang
    }
  }
`;