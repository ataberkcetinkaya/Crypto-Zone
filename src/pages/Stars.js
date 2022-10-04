import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const Stars = () => {

  const { storage, setInfo, onRemove, image } = useData();

  useEffect(() => {
    setInfo();
  }, []);

  // <button className='text-green-400'><u>Details</u></button>

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
              
              <tbody className='flex'>
                     
                <tr className="bg-gray-800 text-center w-32 md:w-full">
                  {image.map((img, indx) => (
                    <th className="h-16 text-white flex items-center place-content-center border-b border-stone-500" key={indx}>
                        <img width={25} src={img} alt="cryptoLogo"></img>
                    </th>
                    ))}
                </tr>

                <tr className="bg-gray-800 text-center w-38 md:w-full">
                  {storage.map((item, index) => (
                    <th className="h-16 text-white flex items-center place-content-center border-b border-stone-500" key={index}>
                      <span className='w-36'>{item}</span>
                      <button onClick={() => onRemove(index)} className='text-red-400 w-24'><u>Delete</u></button>
                    </th>
                    ))}
                </tr>

              </tbody>
            </table>
      </div>
    </>
  )
}

export default Stars