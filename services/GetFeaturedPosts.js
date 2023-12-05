import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

const GetFeaturedPosts = async () => {
  const pageSize = 300; // Adjust the page size as needed

  const fetchFeaturedPosts = async (after) => {
    const query = gql`
      query GetFeaturedPosts($pageSize: Int!, $after: String) {
        posts(first: $pageSize, after: $after, where: { featuredPost: true }) {
          author {
            name
            photo {
              url
            }
          }
          featuredImage {
            url
          }
          title
          slug
          createdAt
        }
      }
    `;

    const variables = {
      pageSize,
      after,
    };

    const result = await request(graphqlAPI, query, variables);
    return result.posts;
  };

  let allFeaturedPosts = [];
  let hasMorePages = true;
  let afterCursor = null;

  while (hasMorePages) {
    const featuredPosts = await fetchFeaturedPosts(afterCursor);
    allFeaturedPosts = [...allFeaturedPosts, ...featuredPosts];

    hasMorePages = featuredPosts.length === pageSize; // Adjust based on your API response
    afterCursor = featuredPosts.length > 0 ? featuredPosts[featuredPosts.length - 1].createdAt : null; // Assuming 'createdAt' is a unique field
  }

  return allFeaturedPosts;
};

export default GetFeaturedPosts;
