import React from 'react'
import { useData } from '../context/DataContext';

const Stars = () => {

  return (
    <div className='text-white'>
       {localStorage.getItem("thestars")}
    </div>
  )
}

export default Stars