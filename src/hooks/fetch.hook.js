import axios from "axios";
import { useState, useEffect } from "react";

export default function useFetch(url) {
 const [data, setData] = useState({
  apiData: null,
  isLoading: false,
  status: null,
  error: null
 });
 useEffect(() => {
   setData(p => ({ ...p, isLoading: true }));
    axios.get(url)
    .then(res => setData(p => ({ ...p, status: res.status, apiData: res.data })))
    .catch(error => setData(p => ({ ...p, error, status: error.response.status })))
    .finally(() => setData(p => ({ ...p, isLoading: false })))
 }, [url]);

 return [data];
}