import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const Stars = () => {

  const { storage, setInfo, onRemove } = useData();

  useEffect(() => {
    setInfo();
  })


  return (
    <>
    <div className='text-white text-center mt-5 text-xl justify-center mt-5'>
      <Link to="/">
        <button>Home</button>
      </Link>
    </div>

      <div className='text-white text-center mt-5 text-xl justify-center mt-12'>
        <table className="w-screen text-center">
              <thead className="uppercase bg-gray-700 text-gray-100 ">
                <tr>
                    <th>
                      Rank
                    </th>
                    <th className="py-4 px-6">
                      Crypto
                    </th>
                    <th>
                      Price
                    </th>
                    <th className="py-4 px-4">
                      Change
                    </th>
                    <th className="py-3 px-6">
                      Volume
                    </th>
                    <th></th>
                </tr>
              </thead>
              
              <tbody>
              {storage.map((item, index) => (
                <tr className="bg-gray-800 text-center" key={index} >
                    <th className='py-4 px-6 font-medium text-white'>
                      {item[1]}
                    </th>
                    <th className="py-4 px-6 text-white">
                      {item[0]}
                    </th>
                    <td className="py-4 px-6 text-white">
                      {item[2]}
                    </td>
                    <td className="py-4 px-6 text-white">
                      {item[3]}
                    </td>
                    <td className="py-4 px-6 text-white">
                      {item[4]}
                    </td>
                    <td>
                        <button onClick={() => onRemove(index)} className='mr-5 text-red-400'><u>Delete</u></button>
                    </td>
                </tr>
              ))}
              </tbody>
            </table>
      </div>
    </>
  )
}

export default Stars