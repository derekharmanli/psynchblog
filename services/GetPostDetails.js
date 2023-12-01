import {request, gql} from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;


const GetPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug : String!) {
      post(where: {slug: $slug}) {
        title
        excerpt
        featuredImage {
          url
        }
        author{
          name
          bio
          website{
            html
          }
          photo {
            url
          }
        }
        podcast{
          url
        }
        importantLinks{
          html
        }
        createdAt
        slug
        content {
          raw
        }
        dateOfPodcast
        transcript{
          raw
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
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.post;
};

export default GetPostDetails