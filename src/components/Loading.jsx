import React, { memo } from 'react'

import "./loading.css";

function Loading() {
  return (
    <div className='loading-container'>
        <h1>Loading...</h1>
    </div>
  )
}

export default memo(Loading);