import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchField, setSearchField] = useState("");
  const onSearchChange = e => {
    setSearchField(e.target.value)
  }
  useEffect(() => {
    axios.get("https://randomuser.me/api/?results=5000")
      .then(res => {
        console.log(res.data)
        setData(res.data.results)
      })
  }, [])
  useEffect(() => {
    const searchString = searchField.trim()
    if (searchString.length === 0) return [...data]
    let fData = data.filter(user => {
      const name = user.name.first + " " + user.name.last
      const email = user.email
      return name.includes(searchString) || email.includes(searchString)
    })
    console.log(fData)
  }, [data, searchField])

  return (
    <div className="App">
      <input onChange={onSearchChange} value={searchField} />

    </div>
  );
}

export default App;
