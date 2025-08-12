export const ALL_BLOG_ARTICLES = `
  query {
    allArticlesItem {
      slug { current }
      breadcrumbs {
        _key
        linkInternal {
          label
          reference {
            slug {
              current
            }
          }
        }
      }
			coverImage{
        altText
        image{
          asset{
            url
          }
        }
      }
      category
    }
  }
`;