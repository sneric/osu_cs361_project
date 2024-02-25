import { ApolloClient, gql } from "@apollo/client";
import { InMemoryCache } from "apollo-cache-inmemory";
import house1 from "../house-pics/house1.jpg";
import house2 from "../house-pics/house2.jpg";
import house3 from "../house-pics/house3.jpg";

const getHouse = async ({ queryKey }) => {
  const id = queryKey[1];

  const cache = new InMemoryCache();
  const client = new ApolloClient({
    uri: "http://localhost:3001/graphql", // Update with your server URL
    cache,
  });

  const query = gql`
    query GetHouse($id: ID!) {
      getHouse(id: $id) {
        id
        description
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
      console.log("Data:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error);
      return error;
    });

  const getHouseImage = (key) => {
    switch (key) {
      case "house-1":
        return house1;
      case "house-2":
        return house2;
      case "house-3":
        return house3;
      default:
        return house1;
    }
  };

  const response = {
    description: results.getHouse.description,
    price: results.getHouse.price,
    name: results.getHouse.name,
    location: results.getHouse.location,
    house: results.getHouse.homeStyle,
    images: [getHouseImage(results.getHouse.key), house2, house3],
  };
  console.log("FETCH HOUSE RESPONSE: ", response);
  return response;
};

export default getHouse;
