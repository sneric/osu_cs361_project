function fetchHouseList({ queryKey }) {
  const selectedLocation = queryKey[1];
  console.log("SELECTED LOCATION: ", selectedLocation);

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
