import  {ApolloClient, gql } from '@apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory';

const getHouse = async ({ queryKey }) => {
  const id = queryKey[1];

  const cache = new InMemoryCache();
  const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql', // Update with your server URL
    cache
  });

  const query = gql`
    query GetHouse($id: ID!) {
      getHouse(id: $id) {
        id
        key
        homeStyle
        location
        name
        price
      }
    }
  `;

  const results = await client
  .query({
    query: query,
    variables: { id: id },
  })
  .then((response) => {
    console.log('Data:', response.data);
    return response.data;
  })
  .catch((error) => {
    console.error('Error:', error);
    return error
  });

  const response = {
    location: results.getHouse.location,
    house: results.getHouse.homeStyle,
  };
  console.log("FETCH HOUSE RESPONSE: ",  response);
  return response;
};

export default getHouse;
