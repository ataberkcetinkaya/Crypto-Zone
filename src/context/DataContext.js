import React, { createContext, useEffect, useContext, useState }  from 'react'
import axios from 'axios'

const DataContext  = createContext();

const useData = () => useContext(DataContext); 

const Provider = ({ children }) => {

  const [crypto, setCrypto] = useState({});
  const [storage, setStorage] = useState([]);
  const [image, setImage] = useState([]);

  const [inputText, setInputText] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);


  const getLocalStorage = async () => {
    let storage = localStorage.getItem('crypto');
    if (storage) {
      const list = [];
      storage = JSON.parse(storage);
      let img = JSON.parse(localStorage.getItem('image')) || [];

      
      for(let i = 0; i < storage.length; i++) {
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${storage[i]}&vs_currencies=usd&include_24hr_vol=true&include_24hr_change=true`) //wait for data to reach (async and await)
        const key = Object.keys(data);
        const value = Object.values(data);
        //console.log(key, value);

        list.push({
          image: img[i],
          name: key[0],
          ...value[0] //destructuring
          });
      }
      //console.log(list);
      setStorage(list);
    }
  }

  const handleType = (searchValue) => {

    setInputText(searchValue);

    if(inputText !== '') {
        const filteredData = crypto.filter((item) =>  Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase()));
        setFilteredResults(filteredData);
    }
    else {
        setFilteredResults(crypto);
    }
}

    const getCrypto = async () => {
       const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250') //wait for data to reach (async and await)
       setCrypto(data);
    }

    useEffect(() => {
        getCrypto();
    }, []);

    const addStarFiltered = (key) => {
      let a = JSON.parse(localStorage.getItem('crypto')) || [];

      if(a.indexOf(filteredResults[key].id) === -1) {
        a.push(filteredResults[key].id);
        localStorage.setItem('crypto', JSON.stringify(a));
      }
     
      let b = JSON.parse(localStorage.getItem('image')) || [];

      if(b.indexOf(filteredResults[key].image) === -1) {
        b.push(filteredResults[key].image);
        localStorage.setItem('image', JSON.stringify(b));
      }
      setImage(b);
 
      setStorage(a);
      }


    const addStar = (key) => {
      let a = JSON.parse(localStorage.getItem('crypto')) || [];

      if(a.indexOf(crypto[key].id) === -1) {
        a.push(crypto[key].id);
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
    crypto, getCrypto, addStar, storage, setStorage,  onRemove, image, handleType, inputText, filteredResults, addStarFiltered, getLocalStorage
  }

return (
  <DataContext.Provider value={DataContextValues}>
    {children}
  </DataContext.Provider>
)
}

export default Provider;
export { useData };