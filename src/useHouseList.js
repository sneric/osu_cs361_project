import { useQuery } from "@tanstack/react-query";
import getHouseList from "./endpoints/getHouseList";

export default function useHouseList(location) {
  const results = useQuery(["houses", location], getHouseList);
  console.log("FETCH HOUSE LIST: ", results?.data?.houses);
  return [results?.data?.houses ?? [], results.status];
}
