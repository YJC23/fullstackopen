import { useState, useEffect } from 'react'
import './index.css'
import Filter from './components/Filter'
import Countries from './components/Countries'
import dbService from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [names, setNames] = useState([])
  const [newFilter, setNewFilter] = useState('')  
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  useEffect(() => {
    dbService
      .getAll()
      .then(data => {
        setCountries(data)
        setNames(data.map(country => country.name.common))
      })
  }, [])

  const namesToShow = newFilter === '' ? names 
    : names.filter(name => name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <Filter 
        value={newFilter}
        onChange={handleFilterChange}
      />
      <Countries names={namesToShow} countries={countries} /> 
    </div>
  )
}

export default App