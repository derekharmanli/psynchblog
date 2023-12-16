//services/getposts

import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;


const GetPosts = async (pageSize = 10, afterCursor = null) => {
  const query = gql`
    query GetPosts($pageSize: Int!, $after: String) {
      postsConnection(first: $pageSize, after: $after, orderBy: createdAt_DESC) {
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
            endCursor
          }
        }
      }
    `;
    const variables = {
      pageSize,
      after: afterCursor,
    };
  
    const result = await request(graphqlAPI, query, variables);
    return result.postsConnection; 
 }
export default GetPosts;
