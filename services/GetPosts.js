import {request, gql} from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const GetPosts = async () => {
    const query = gql`
        query GetPosts {
            postsConnection {
                edges {
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
              }
        }
    `

    const result = await request(graphqlAPI, query)
    return result.postsConnection.edges.reverse();
}

export default GetPosts