import { Link } from "react-router-dom";
import React, { memo, useContext } from 'react'
import { Toaster } from "react-hot-toast";
import { GlobalContext } from "../context";

function Profile() {
  const { getGlobal: { type, username } } = useContext(GlobalContext);
  return (
    <div>
      <Toaster position="top-center" />
      <h3>Profile</h3>
      <p> Hi {type}</p>
      <p>name: {username}</p>
      <div>
        <h4>Oprions</h4>
        <ol>
          {type == "seller" && <li>
            <Link to={"/my-products"}>My products</Link>
          </li>}
          <li>
            <Link>Edit profile</Link>
          </li>
          <li>
            <Link>Dashboard</Link>
          </li>
        </ol>
      </div>
    </div>
  )
}

export default memo(Profile);