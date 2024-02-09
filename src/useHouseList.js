import { useQuery } from "@tanstack/react-query";
import fetchHouseList from "./microservice/fetchHouseList";

export default function useHouseList(location) {
  const results = useQuery(["houses", location], fetchHouseList);
  console.log("FETCH HOUSE LIST: ", results?.data?.houses);
  return [results?.data?.houses ?? [], results.status];
}
