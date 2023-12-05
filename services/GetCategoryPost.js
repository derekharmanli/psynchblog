import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

const GetCategoryPost = async (slug) => {
  const pageSize = 10; // Adjust the page size as needed

  const fetchCategoryPosts = async (after) => {
    const query = gql`
      query GetCategoryPosts($slug: String!, $pageSize: Int!, $after: String) {
        postsConnection(where: { categories_some: { slug: $slug } }, first: $pageSize, after: $after) {
          edges {
            cursor
            node {
              author {
                bio
                name
                id
                photo {
                  url
                }
              }
              createdAt
              slug
              title
              excerpt
              featuredImage {
                url
              }
              categories {
                name
                slug
                picture {
                  url
                }
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `;

    const variables = {
      slug,
      pageSize,
      after,
    };

    const result = await request(graphqlAPI, query, variables);
    return result.postsConnection;
  };

  let allCategoryPosts = [];
  let hasMorePages = true;
  let afterCursor = null;

  while (hasMorePages) {
    const categoryPosts = await fetchCategoryPosts(afterCursor);
    allCategoryPosts = [...allCategoryPosts, ...categoryPosts.edges]

    hasMorePages = categoryPosts.pageInfo.hasNextPage;
    afterCursor = categoryPosts.pageInfo.endCursor;
  }

  return allCategoryPosts.reverse();
};

export default GetCategoryPost;
