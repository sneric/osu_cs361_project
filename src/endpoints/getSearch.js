// import house1 from "../house-pics/house1.jpg";
// import house2 from "../house-pics/house2.jpg";
// import house3 from "../house-pics/house3.jpg";
import  {ApolloClient, gql } from '@apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory';


async function getSearch({ queryKey }) {

  const requestData = {
    location: queryKey[1].location,
    homeStyle: queryKey[1].homeStyle,
    id: queryKey[1].id
  }
  console.log('requestData: ', requestData)
  const cache = new InMemoryCache();

  const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql', // Update with your server URL
    cache
  });

  const query = gql`
  query GetAllResults {
    getAllResults {
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
  variables: {}
})
.then((response) => {
  console.log('Data:', response.data);
  return response.data;
})
.catch((error) => {
  console.error('Error:', error);
  return error
});

return {houses: results.getAllResults}
}

export default getSearch;
