const fetchHouseList = async ({ queryKey }) => {
  const selectedLocation = queryKey[1];
  console.log("SELECTED LOCATION: ", selectedLocation);

  const graphqlEndpoint = 'http://localhost:3001/graphql';

  const query = `
    query GetHouseList($location: String!) {
      getHouseList(location: $location) {
        location
        houses {
          homeStyle
        }
      }
    }
  `;

  fetch(graphqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables: {id: '1' }}),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Response from Server:', data);
    })
    .catch((error) => console.error('Error:', error));

  const response = {
    location: "Dallas, Texas",
    house: "house1",
  };
  console.log("FETCH HOUSE: ", response);
  return response;
};

export default fetchHouseList;


// function fetchHouseList({ queryKey }) {
//   const selectedLocation = queryKey[1];
//   console.log("SELECTED LOCATION: ", selectedLocation);

//   const data = [
//     {
//       location: "Dallas, Texas",
//       houses: ["house1", "house2", "house3"],
//     },
//     {
//       location: "Paris, France",
//       houses: ["house4", "house5", "house6"],
//     }
//   ]
  

//   for (const record in data) {
//     if (data[record].location === selectedLocation) {
//       console.log('HOUSE TO RETURN: ', selectedLocation)
//       return data[record];
//     }
//   }
// }


// export default fetchHouseList;
