import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useData } from '../context/DataContext';
 
const CryptoTable = () => {

    const { crypto, addStar, setInfo, handleType, inputText, filteredResults, addStarFiltered } = useData();

    const inputRef = useRef(null);

    return (
    <>
      <div className="flex justify-center mt-5 h-10">
        <input onChange={(e) => handleType(e.target.value)} ref={inputRef} type="text" className='bg-black text-white w-64 border-solid border-2 border-slate-400' placeholder='  Type Crypto...'></input>
        <Link to="/stars">
            <FontAwesomeIcon onClick={setInfo} icon={faStar} className="iconColor fa-xl ml-4 mt-1.5"></FontAwesomeIcon>
        </Link>
      </div>

      <div className="flex justify-center mt-10 ml-96 mr-96">
          <table className="w-full text-sm text-center">
              <thead className="text-xs uppercase bg-gray-700 text-gray-100" >
                  <tr>
                      <th className="py-4 px-6">
                          Rank
                      </th>
                      <th className="py-4 px-6">
                          Crypto
                      </th>
                      <th className="py-3 px-6">
                          Price
                      </th>
                      <th className="py-3 px-6">
                          Change
                      </th>
                      <th className="py-3 px-6">
                         Volume
                      </th>
                  </tr>
              </thead>
              
              <tbody>
                {inputText.length > 1 ? ( Object.keys(filteredResults).map((key, index) => {
                    return (
                        <tr className="bg-gray-800 text-center border-b border-stone-500" key={index}>
                            <th className="py-4 px-6 font-medium text-white">
                                <span>{filteredResults[key].market_cap_rank}</span>
                                <button onClick={() => addStarFiltered(key)} className='ml-4 border border-yellow-400 bg-yellow-400 text-black w-12'>Add</button>
                            </th>
                            <td className="py-4 px-6 text-white flex items-center place-content-center">
                                <img width={40} height={40} src={filteredResults[key].image} className="mr-5"></img>
                                <span>{filteredResults[key].name}</span>
                            </td>
                            <td className="py-4 px-6 text-white">
                                {filteredResults[key].current_price}
                            </td>
                            <td className="py-4 px-6 text-white">
                                {filteredResults[key].price_change_24h}
                            </td>
                            <td className="py-4 px-6 text-white">
                                {filteredResults[key].total_volume}
                            </td>
                        </tr>
                         )
                        })
                    ) : (
                        Object.keys(crypto).map((key, index) => {
                            return (
                                <tr className="bg-gray-800 text-center border-b border-stone-500" key={index}>
                                    <th className="py-4 px-6 font-medium text-white">
                                        <span>{crypto[key].market_cap_rank}</span>
                                        <button onClick={() => addStar(key)} className='ml-4 border border-yellow-400 bg-yellow-400 text-black w-12'>Add</button>
                                    </th>
                                    <td className="py-4 px-6 text-white flex items-center place-content-center">
                                        <img width={40} height={40} src={crypto[key].image} className="mr-5"></img>
                                        <span>{crypto[key].name}</span>
                                    </td>
                                    <td className="py-4 px-6 text-white">
                                        {crypto[key].current_price}
                                    </td>
                                    <td className="py-4 px-6 text-white">
                                        {crypto[key].price_change_24h}
                                    </td>
                                    <td className="py-4 px-6 text-white">
                                        {crypto[key].total_volume}
                                    </td>
                                </tr>
                            )
                        })
                    )}
              </tbody>
          </table>
        </div>
    </>
  )
}

export default CryptoTable