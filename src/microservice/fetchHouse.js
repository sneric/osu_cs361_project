const fetchHouse = async ({ queryKey }) => {
  const id = queryKey[1];
  const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);

  if (!apiRes.ok) {
    throw new Error(`details/${id} fetch not ok`);
  }

  // return apiRes.json();

  const response = {
    location: "Dallas, Texas",
    house: "house1",
  };
  console.log("FETCH HOUSE: ", response);
  return response;
};

export default fetchHouse;
