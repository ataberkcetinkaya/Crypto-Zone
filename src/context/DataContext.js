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

    useEffect(() => {
        getCrypto();
    }, []);


    const addStar = (key) => {
      let a = JSON.parse(localStorage.getItem('crypto')) || [];

      if(a.indexOf(crypto[key].name) === -1) {
        a.push([crypto[key].name, crypto[key].image]);
        localStorage.setItem('crypto', JSON.stringify(a));
      }
        setStorage(a);
      }

    const setInfo = () => {
      let a = JSON.parse(localStorage.getItem('crypto')) || [];
      setStorage(a);
    }

    const onRemove = (key) => {
      let a = localStorage.getItem('crypto');
      let newList = JSON.parse(a);
      newList.splice(key, 1);
      localStorage.setItem('crypto', JSON.stringify(newList));
      setStorage(newList);
    }


  const DataContextValues = {
    inputRef, crypto, getCrypto, addStar, storage, setStorage, setInfo, onRemove
  }

return (
  <DataContext.Provider value={DataContextValues}>
    {children}
  </DataContext.Provider>
)
}

export default Provider;
export { useData };