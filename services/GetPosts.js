import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

const GetPosts = async () => {
  const pageSize = 3; // Adjust the page size as needed

  const fetchPosts = async (after) => {
    const query = gql`
      query GetPosts($pageSize: Int!, $after: String) {
        postsConnection(first: $pageSize, after: $after) {
          edges {
            cursor
            node {
              author {
                bio
                id
                name
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
            hasPreviousPage
            startCursor
            endCursor
            pageSize
          }
        }
      }
    `;

    const variables = {
      pageSize,
      after,
    };

    const result = await request(graphqlAPI, query, variables);
    return result.postsConnection;
  };

  let allPosts = [];
  let hasMorePages = true;
  let afterCursor = null;

  while (hasMorePages) {
    const { edges, pageInfo } = await fetchPosts(afterCursor);
    const posts = edges.map((edge) => edge.node);
    
    allPosts = [...allPosts, ...posts];
    hasMorePages = pageInfo.hasNextPage;
    afterCursor = pageInfo.endCursor;
  }

  return allPosts.reverse();
};

export default GetPosts;
