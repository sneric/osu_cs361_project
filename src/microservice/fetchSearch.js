import house1 from "./house-pics/house1.jpg";
import house2 from "./house-pics/house2.jpg";
import house3 from "./house-pics/house3.jpg";

async function fetchSearch({ queryKey }) {

  console.log('queryKey: ', queryKey[1])

  const requestData = {
    location: queryKey[1].location,
    homeStyle: queryKey[1].homeStyle,
  }

  console.log('requestData: ', requestData)

  const microserviceData = {
    houses: [
      {
        location: "Dallas, Texas",
        homeStyle: "house1",
        price: "$100.00",
        name: "house-name-1",
        id: "id1",
        key: "key1",
        images: [
          house1,
        ],
      },
      {
        location: "Dallas, Texas",
        homeStyle: "house2",
        price: "$200.00",
        name: "house-name-2",
        id: "id2",
        key: "key2",
        images: [
          house2,
        ],
      },
      {
        location: "Dallas, Texas",
        homeStyle: "house3",
        price: "$300.00",
        name: "house-name-3",
        id: "id3",
        key: "key3",
        images: [
          house3,
        ],
      },
      {
        location: "Paris, France",
        homeStyle: ["house4"],
        price: ["$200.00"],
        name: ["house-name-4"],
        id: ["id4"],
        key: ["key4"],
        images: [
          house2,
        ],
      },
    ],
  };
  
  let response

  if (requestData.location && !requestData.homeStyle) {
    response = microserviceData.houses.filter(house => house.location === requestData.location);
  } else if (requestData.location && requestData.homeStyle) {
    response = microserviceData.houses.filter(house => house.location === requestData.location && house.homeStyle === requestData.homeStyle);
  } else {
    response = microserviceData.houses;
  }

  console.log("FETCH SEARCH RESPONSE: ", response);
  return { houses: response};
}

export default fetchSearch;
