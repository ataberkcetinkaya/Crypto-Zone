import React from 'react'
import { useData } from '../context/DataContext';

const Stars = () => {

  const { stars } = useData();

  return (
    <div className='text-white'>
        {stars}
    </div>
  )
}

export default Stars