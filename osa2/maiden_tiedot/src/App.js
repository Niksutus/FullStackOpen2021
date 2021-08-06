import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import AllResults from './components/AllResults'


const App = () => {
  
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  
  useEffect(() =>{
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  })

  const changeFilter = (e) => {
    setFilter(e)
  }

  return (
    <div>
      <Search changeFilter = {(e) => changeFilter(e)}/>
      <AllResults countries ={countries} filter={filter}/>
    </div>
  );
}

export default App;
