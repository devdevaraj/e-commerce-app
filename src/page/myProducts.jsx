import React, { memo, useContext } from 'react'
import { Link } from "react-router-dom";

import { GlobalContext } from "../context";
import useFetch from "../hooks/fetch.hook";
import Loading from "../components/Loading";
import ErrorOccured from "../components/ErrorOccured";

function MyProducts() {
 let { getGlobal: { userId }} = useContext(GlobalContext);
 let [{ apiData, isLoading, error }] = useFetch(`/api/get-products?sellerId=${userId}`);
 if(isLoading) {
  return <Loading />
 }
 if(error) {
  return <ErrorOccured />
 }
  return (
    <div>
     <h3>MyProducts</h3>
     <p>Do you want to add a new product? <Link to={"/profile/add-products"}>Click here</Link></p>
     <ol>
     {apiData?.products?.map((item, index) => (
      <li key={index}>{item.title}</li>
      ))}
      </ol>
     </div>
  )
}

export default memo(MyProducts);