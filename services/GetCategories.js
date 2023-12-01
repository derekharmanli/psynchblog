import {request, gql} from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;


const GetCategories = async () => {
  const query = gql`
    query GetGategories {
        categories {
          name
          slug
          picture {
            url
          }
        }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.categories;
};

export default GetCategories