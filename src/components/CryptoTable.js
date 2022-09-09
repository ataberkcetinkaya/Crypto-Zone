import React, { useRef } from 'react'
import axios from 'axios'

const CryptoTable = () => {

    const inputRef = useRef(null);
    const [crypto, setCrypto] = React.useState({});
    //const [logo, setLogo] = React.useState('');

    const getCrypto = async () => {
       const { data } = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum&vs_currencies=usd&include_24hr_vol=true&include_24hr_change=true') //wait for data to reach (async and await)
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
                {Object.keys(crypto).map(key => {
                return (
                  <tr className="bg-gray-800 text-center ">
                        <th className="py-4 px-6 font-medium whitespace-normal text-white">
                           {key}
                        </th>
                    <td className="py-4 px-6 text-white">
                        {crypto[key].usd}
                    </td>
                    <td className="py-4 px-6 text-white">
                        {crypto[key].usd_24h_change}
                    </td>
                    <td className="py-4 px-6 text-white">
                        {crypto[key].usd_24h_vol}
                    </td>
                  </tr>
                  )})}
              </tbody>
          </table>
        </div>
    </>
  )
}

export default CryptoTable