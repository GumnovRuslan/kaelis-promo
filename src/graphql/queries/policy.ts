export const getPolicies = (lang: string = 'en') => `
  query {
    allPolicy(where: { language: { eq: "${lang}" } }) {
      _id
      title
      slug {current}
      language
    }
  }
`;

export const getPolicy = (slug: string) => `
  query {
    allPolicy(where: { slug: { current: { eq: "${slug}" } } }) {
      _id
      title
      published
      slug {current}
      language
      contentRaw
    }
  }
`;