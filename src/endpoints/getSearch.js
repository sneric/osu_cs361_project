import house1 from "../house-pics/house1.jpg";
import house2 from "../house-pics/house2.jpg";
import house3 from "../house-pics/house3.jpg";
import { ApolloClient, gql } from "@apollo/client";
import { InMemoryCache } from "apollo-cache-inmemory";

async function getSearch({ queryKey }) {
  const requestData = {
    location: queryKey[1].location,
    homeStyle: queryKey[1].homeStyle,
    id: queryKey[1].id,
  };
  console.log("requestData: ", requestData);
  const cache = new InMemoryCache();

  const client = new ApolloClient({
    uri: "http://localhost:3001/graphql", // Update with your server URL
    cache,
  });
  let query;
  let variables;
  if (requestData.location) {
    query = gql`
      query GetSearchResults($location: String, $homeStyle: String) {
        getSearchResults(location: $location, homeStyle: $homeStyle) {
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
    variables = {
      location: requestData.location,
      homeStyle: requestData.homeStyle,
    };
  } else {
    query = gql`
      query GetAllResults {
        getAllResults {
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
    variables = {};
  }

  const results = await client
    .query({
      query: query,
      variables,
    })
    .then((response) => {
      console.log("Data:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error);
      return error;
    });

  let housesWithImages;

  if (results?.getAllResults?.length > 1) {
    housesWithImages = results.getAllResults.map((house) => {
      switch (house.key) {
        case "house-1":
          return { ...house, image: house1 };
        case "house-2":
          return { ...house, image: house2 };
        case "house-3":
          return { ...house, image: house3 };
        default:
          return { ...house, image: house1 };
      }
    });
  } else if (results?.getSearchResults?.length > 1) {
    housesWithImages = results.getSearchResults.map((house) => {
      switch (house.key) {
        case "house-1":
          return { ...house, image: house1 };
        case "house-2":
          return { ...house, image: house2 };
        case "house-3":
          return { ...house, image: house3 };
        default:
          return { ...house, image: house1 };
      }
    });
  } else {
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
    if (results?.getSearchResults) {
      housesWithImages = [
        {
          ...results.getSearchResults[0],
          image: getHouseImage(results.getSearchResults[0].key),
        },
      ];
    } else {
      housesWithImages = [
        {
          ...results.getAllResults[0],
          image: getHouseImage(results.getAllResults[0].key),
        },
      ];
    }
  }
  console.log("FETCH SEARCH RESPONSE: ", housesWithImages);
  return { houses: housesWithImages };
}

export default getSearch;
