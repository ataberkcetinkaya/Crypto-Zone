import React, { useRef } from 'react'
import axios from 'axios'

const CryptoTable = () => {

    const inputRef = useRef(null);
    const [crypto, setCrypto] = React.useState({});

    const getCrypto = async () => {
       const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250') //wait for data to reach (async and await)
       setCrypto(data);
    }
    console.log(crypto);
    
  return (
    <>
      <div className="flex justify-center mt-5  h-10">
      <input ref={inputRef} type="text" className='bg-black text-white w-64 h-10 border-solid border-2 border-slate-400' placeholder='  Type Crypto...'></input>
        <button onClick={() => getCrypto()} className='ml-5 w-28 border-solid bg-black text-white border-2 border-slate-400'>Get Crypto</button>
      </div>

      <div className="ml-24 mr-24 flex justify-center mt-12">
          <table className="w-full text-sm text-center  ">
              <thead className="text-xs uppercase bg-gray-700 text-gray-100">
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
                {Object.keys(crypto).map((key, index) => {
                    return (
                        <tr className="bg-gray-800 text-center ">
                            <th className="py-4 px-6 font-medium whitespace-normal text-white">
                                {1 + index}
                            </th>
                            <td className="py-4 px-6 text-white">
                                {crypto[key].name}
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
                        })}
              </tbody>
          </table>
        </div>
    </>
  )
}

export default CryptoTable