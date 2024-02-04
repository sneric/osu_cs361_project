import house1 from "./house-pics/house1.jpg";
import house2 from "./house-pics/house2.jpg";

async function fetchSearch({ queryKey }) {
  const { animal, location, breed } = queryKey[1];
  const res = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  );

  // add image

  if (!res.ok)
    throw new Error(`pet search not okay: ${animal}, ${location}, ${breed}`);

  console.log("SEARCH: ", res);

  const response = {
    houses: [
      {
        location: "Dallas, Texas",
        homeStyle: ["house1"],
        price: ["$100.00"],
        name: ["house-name-1"],
        id: ["id1"],
        key: ["key1"],
        images: [
          house1,
        ],
      },
      {
        location: "Paris, France",
        homeStyle: ["house2"],
        price: ["$200.00"],
        name: ["house-name-2"],
        id: ["id2"],
        key: ["key2"],
        images: [
          house2,
        ],
      },
    ],
  };
  // return res.json();

  console.log("FETCH SEARCH RESPONSE: ", response);
  return response;
}

export default fetchSearch;
