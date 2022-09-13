import React, { createContext, useState, useEffect, useContext, useRef }  from 'react'
import axios from 'axios'

const DataContext  = createContext();

const useData = () => useContext(DataContext); 

const Provider = ({ children }) => {

  const inputRef = useRef(null);
  const [crypto, setCrypto] = React.useState({});

    const getCrypto = async () => {
       const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250') //wait for data to reach (async and await)
       setCrypto(data);
    }
    console.log(crypto);

    useEffect(() => {
        getCrypto();
    }, []);

    const addStar = (key) => {
      console.log(crypto[key].market_cap_rank);

      {
        let stars = JSON.parse(localStorage.getItem("thestars") || "[]"); // get current objects
        let star = crypto[key].market_cap_rank;
    
        stars.push(star); //push new one
 
        localStorage.setItem("thestars" ,JSON.stringify(stars))
      }
    }


  const DataContextValues = {
    inputRef, crypto, getCrypto, addStar
  }

return (
  <DataContext.Provider value={DataContextValues}>
    {children}
  </DataContext.Provider>
)
}

export default Provider;
export { useData };