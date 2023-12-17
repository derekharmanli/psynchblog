import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

const GetCategoryPost = async (slug, pageSize = 10, afterCursor = null) => {
  const query = gql`
    query GetCategoryPosts($slug: String!, $pageSize: Int!, $after: String) {
      postsConnection(
        where: { categories_some: { slug: $slug } }
        first: $pageSize
        after: $after
        orderBy: createdAt_DESC
      ) {
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
    after: afterCursor,
  };

  const result = await request(graphqlAPI, query, variables);
  return result.postsConnection;
};

export default GetCategoryPost;
