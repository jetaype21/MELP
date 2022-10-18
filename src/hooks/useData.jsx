import { useEffect, useState } from "react";
import { FetchAllData } from "../helpers/FetchAllData";



export default function useData() {

  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    FetchAllData().then(res => setRestaurants(res))
  }, [])
  

  return {
    restaurants
  }
  
}