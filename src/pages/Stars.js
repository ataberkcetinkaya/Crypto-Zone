import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const Stars = () => {

  const { storage,onRemove, getLocalStorage } = useData();

  useEffect(() => {
    getLocalStorage();
  }, []);

  return (
    <>
    <div className='text-white text-center mt-5 text-xl justify-center mt-5'>
      <Link to="/">
        <button>Home</button>
      </Link>
    </div>

      <div className='flex justify-center mt-10'>
        <table className="w-3/5 md:w-2/5 text-center">
              <thead className="uppercase bg-gray-700 text-gray-100 ">
                <tr>
                    <th className="py-4 px-6">
                      Crypto
                    </th>
                </tr>
              </thead>
              
              <tbody>
              {storage.map((item, index) => (
                <tr className="bg-gray-800 text-center border-b border-stone-500" key={index}>
                  <td className="py-4 px-6 text-white flex items-center place-content-center">
                    <img width={40} height={40} src={item.image} alt={item.name} />
                  </td>
                  <td className="text-white">
                    <span>{item.name}</span>
                  </td>
                  <td className="text-white">
                    <span>{item.usd} $</span>
                  </td>
                  {/* <td className="text-white">
                    <span className='w-36'>{item.usd_24h_change}</span>
                  </td>
                  <td className="text-white">
                    <span className='w-36'>{item.usd_24h_vol}</span>
                  </td> */}
                  <td className="text-white" key={index}>
                    <button onClick={() => onRemove(index)} className='text-red-400 w-24'><u>Delete</u></button>
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