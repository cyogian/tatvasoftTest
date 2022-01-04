import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from './components/DataTable/DataTable';

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchField, setSearchField] = useState("");
  const onSearchChange = e => {
    setSearchField(e.target.value)
  }
  useEffect(() => {
    // fetches data on App Start
    axios.get("https://randomuser.me/api/?results=5000")
      .then(res => {
        console.log(res.data)
        setData(res.data.results)
      })
  }, [])
  useEffect(() => {
    // runs when data or search string changes
    // implements search
    const searchString = searchField.trim()
    if (searchString.length === 0) {
      setFilteredData(data)
      return
    }
    let fData = data.filter(user => {
      const name = user.name.first + " " + user.name.last
      const email = user.email
      return name.includes(searchString) || email.includes(searchString)
    })
    setFilteredData(fData)
  }, [data, searchField])

  return (
    <div className="App">
      <input onChange={onSearchChange} value={searchField} />
      <DataTable rows={filteredData} />
    </div>
  );
}

export default App;
