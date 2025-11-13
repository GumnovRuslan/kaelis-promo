export const getArticlesCategory = (lang: string = 'en') => `
  query {
    allBlogCategory(where: { language: { eq: "${lang}" } }) {
      title
      language
    }
  }
`;