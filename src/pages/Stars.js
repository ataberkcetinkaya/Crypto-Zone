import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const Stars = () => {

  const { storage, setInfo } = useData();

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
                    <th className="py-4 px-6">
                        Submit ID
                    </th>
                    <th>
                        Survey ID
                    </th>
                    <th className="py-4 px-4">
                        Score
                    </th>
                    <th className="py-3 px-6">
                        Feedback
                    </th>
                    <th></th>
                </tr>
              </thead>
              
              <tbody>
              {storage.map((item, index) => (
                <tr className="bg-gray-800 text-center"  key={index} >
                    <th className="py-4 px-6 font-medium text-white">
                      {item}
                    </th>
                    <td className="py-4 px-6 text-white">
                      123
                    </td>
                    <td className="py-4 px-6 text-white">
                      111
                    </td>
                    <td className="py-4 px-6 text-white">
                      111
                    </td>
                    <td>
                        <button className='mr-5 text-red-400'><u>Delete</u></button>
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