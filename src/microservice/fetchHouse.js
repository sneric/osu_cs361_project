const fetchHouse = async ({ queryKey }) => {
  const id = queryKey[1];
  
  console.log('ID: ', id);
  
  const response = {
    location: "Dallas, Texas",
    house: "house1",
  };
  console.log("FETCH HOUSE: ", response);
  return response;
};

export default fetchHouse;
