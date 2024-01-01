import React, { memo } from 'react'

function ErrorOccured() {
  return (
    <div className='loading-container'>
        <h1>Some error occured try after some time!...</h1>
    </div>
  )
}

export default memo(ErrorOccured);