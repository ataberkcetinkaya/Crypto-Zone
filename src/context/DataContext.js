import React, { createContext, useEffect, useContext, useRef }  from 'react'
import axios from 'axios'

const DataContext  = createContext();

const useData = () => useContext(DataContext); 

const Provider = ({ children }) => {

  const inputRef = useRef(null);
  const [crypto, setCrypto] = React.useState({});
  const [storage, setStorage] = React.useState([]);
  const [image, setImage] = React.useState([]);

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
        a.push(crypto[key].name);
        localStorage.setItem('crypto', JSON.stringify(a));
      }

      let b = JSON.parse(localStorage.getItem('image')) || [];

      if(b.indexOf(crypto[key].image) === -1) {
        b.push(crypto[key].image);
        localStorage.setItem('image', JSON.stringify(b));
      }
      setImage(b);
 
      setStorage(a);
      }

    const setInfo = () => {
      let a = JSON.parse(localStorage.getItem('crypto')) || [];
      setStorage(a);

      let b = JSON.parse(localStorage.getItem('image')) || [];
      setImage(b);
    }

    const onRemove = (key) => {
      let a = localStorage.getItem('crypto');
      let b = localStorage.getItem('image');
      let newList = JSON.parse(a);
      let newList2 = JSON.parse(b);
      newList.splice(key, 1);
      newList2.splice(key, 1);
      localStorage.setItem('crypto', JSON.stringify(newList));
      localStorage.setItem('image', JSON.stringify(newList2));
      setStorage(newList);
      setImage(newList2);
    }


  const DataContextValues = {
    inputRef, crypto, getCrypto, addStar, storage, setStorage, setInfo, onRemove, image
  }

return (
  <DataContext.Provider value={DataContextValues}>
    {children}
  </DataContext.Provider>
)
}

export default Provider;
export { useData };