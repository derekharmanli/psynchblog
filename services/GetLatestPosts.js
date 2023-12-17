import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

const GetLatestPosts = async () => {
  const query = gql`
    query GetLatestPosts {
      posts(orderBy: dateOfPodcast_ASC, last: 3) {
        title
        featuredImage {
          url
        }
        dateOfPodcast
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.posts.reverse();
};

export default GetLatestPosts;
