import { ApolloClient, gql } from "@apollo/client";
import { InMemoryCache } from "apollo-cache-inmemory";
import house1 from "../house-pics/house1.jpg";
import house2 from "../house-pics/house2.jpg";
import house3 from "../house-pics/house3.jpg";

const getHouse = async ({ queryKey }) => {
  const id = queryKey[1];

  const cache = new InMemoryCache();
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql", // Update with your server URL
    cache,
  });

  const query = gql`
    query house($id: ID!) {
      house(id: $id) {
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
    description: results.house.description,
    price: results.house.price,
    name: results.house.name,
    location: results.house.location,
    house: results.house.homeStyle,
    images: [getHouseImage(results.house.key), house2, house3],
  };

  return response;
};

export default getHouse;
