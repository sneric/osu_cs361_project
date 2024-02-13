import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Results from "./Results";
import BoughtHouseContext from "../BoughtHouseContext";
import useHouseList from "../useHouseList";
import fetchSearch from "../microservice/fetchSearch";

const LOCATIONS = [
  "Dallas, Texas",
  "Paris, France",
  "Denver, Colorado",
  "Toronto, Canada",
];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    homeStyle: "",
  });
  const [boughtHouse] = useContext(BoughtHouseContext);
  const [location, setLocation] = useState("");
  const [homeStyles] = useHouseList(location);

  const results = useQuery(["search", requestParams], fetchSearch);
  console.log("CHECK FETCHSEARCH: ", results?.data?.houses);

  let houses = results?.data?.houses ?? [];

  console.log("CHECK houses: ", houses);
  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            location: formData.get("location") ?? "",
            homeStyle: formData.get("homeStyle") ?? "",
          };
          setRequestParams(obj);
        }}
      >
        {boughtHouse ? (
          <div className="house image-container">
            <img src={boughtHouse.images[0]} alt={boughtHouse.name} />
          </div>
        ) : null}

        <h2>Search for Houses to Buy:</h2> 

        <label htmlFor="location">
          Search by House Location
          <select
            id="location"
            name="location"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            onBlur={(e) => {
              setLocation(e.target.value);
            }}
          >
            <option />
            {LOCATIONS.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="homeStyle">
          Advanced Option: Search by House Style
          <select disabled={!homeStyles.length} id="homeStyle" name="homeStyle">
            <option />
            {homeStyles.map((homeStyle) => (
              <option key={homeStyle} value={homeStyle}>
                {homeStyle}
              </option>
            ))}
          </select>
        </label>

        <button>Submit</button>
      </form>
      <Results houses={houses} />
    </div>
  );
};

export default SearchParams;
