import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const Stars = () => {

  const { storage, setInfo, onRemove } = useData();

  useEffect(() => {
    setInfo();
  }, []);


  return (
    <>
    <div className='text-white text-center mt-5 text-xl justify-center mt-5'>
      <Link to="/">
        <button>Home</button>
      </Link>
    </div>

      <div className='flex justify-center mt-10 ml-96 mr-96'>
        <table className="w-full text-center">
              <thead className="uppercase bg-gray-700 text-gray-100 ">
                <tr>
                    <th className="py-4 px-6">
                      Crypto
                    </th>
                   
                    <th></th>
                </tr>
              </thead>
              
              <tbody>
              {storage.map((item, index) => (
                <tr className="bg-gray-800 text-center border-b border-stone-500" key={index} >
                    <th className="py-4 px-6 text-white flex items-center place-content-center">
                    <img width={40} height={40} className="mr-5" src={item[1]}></img>
                      <span>{item[0]}</span>
                    </th>
                   
                    <td className="py-4 px-6 text-white">
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