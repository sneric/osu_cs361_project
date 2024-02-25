import { ApolloClient, gql } from "@apollo/client";
import { InMemoryCache } from "apollo-cache-inmemory";

const getHouseList = async ({ queryKey }) => {
  const selectedLocation = queryKey[1];
  console.log("SELECTED LOCATION: ", selectedLocation);

  const cache = new InMemoryCache();
  const client = new ApolloClient({
    uri: "http://localhost:3001/graphql", // Update with your server URL
    cache,
  });

  const query = gql`
    query GetHouseList($location: String!) {
      getHouseList(location: $location) {
        location
        houses {
          homeStyle
        }
      }
    }
  `;

  const results = await client
    .query({
      query: query,
      variables: { location: selectedLocation },
    })
    .then((response) => {
      console.log("Data:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error);
      return error;
    });
  console.log("CURR: ", results);
  const response = {
    location: results.getHouseList[0].location,
    houses: results.getHouseList[0].houses.map((house) => house.homeStyle),
  };
  return response;
};

export default getHouseList;
