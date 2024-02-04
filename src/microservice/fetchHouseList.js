// async function fetchBreedList({ queryKey }) {
//   const animal = queryKey[1];

//   if (!animal) return [];

//   const res = await fetch(
//     `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
//   );

//   console.log('BREED LIST: ', res.json())

//   if (!res.ok) {
//     throw new Error(`breeds ${animal} fetch not ok`);
//   }

//   return res.json();
// }

// export default fetchBreedList;

function fetchHouseList({ queryKey }) {
  const selectedLocation = queryKey[1];
  // let selectedLocation = '';
  console.log("SELECTED LOCATION: ", selectedLocation);

  // if (location === 'Dallas, Texas') {
  //   selectedLocation = 'location1'
  // } else if (location === 'Paris, France') {
  //   selectedLocation = 'location2'
  // }

  const data = [
    {
      location: "Dallas, Texas",
      houses: ["house1", "house2", "house3"],
    },
    {
      location: "Paris, France",
      houses: ["house4", "house5", "house6"],
    }
  ]
  

  for (const record in data) {
    if (data[record].location === selectedLocation) {
      console.log('HOUSE TO RETURN: ', selectedLocation)
      return data[record];
    }
  }
}


export default fetchHouseList;
