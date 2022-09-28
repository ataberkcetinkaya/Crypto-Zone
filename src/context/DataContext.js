import React, { createContext, useEffect, useContext, useRef }  from 'react'
import axios from 'axios'

const DataContext  = createContext();

const useData = () => useContext(DataContext); 

const Provider = ({ children }) => {

  const inputRef = useRef(null);
  const [crypto, setCrypto] = React.useState({});
  const [storage, setStorage] = React.useState([]);
  
  

    const getCrypto = async () => {
       const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250') //wait for data to reach (async and await)
       setCrypto(data);
    }
    //console.log(crypto);

    useEffect(() => {
        getCrypto();
    }, []);

    const addStar = (key) => {
      let a = JSON.parse(localStorage.getItem('crypto')) || [];

      if(a.indexOf(crypto[key].name) === -1) {
        a.push(crypto[key].name);
        localStorage.setItem('crypto', JSON.stringify(a));
      }
      setStorage(a);
      }


  const DataContextValues = {
    inputRef, crypto, getCrypto, addStar, storage
  }

return (
  <DataContext.Provider value={DataContextValues}>
    {children}
  </DataContext.Provider>
)
}

export default Provider;
export { useData };