import { useState, useEffect } from 'react'
import dbService from '../services/weather'

const CountryDetails = ({ country, temp, wind, icon }) => {
  const celsius = Math.round((temp - 273.15) * 100) / 100

  return (
    <div> 
      <h1> {country.name.common} </h1>
      <p> Capital: {country.capital} </p>
      <p> Area: {country.area} </p>
      <h2> Languages </h2> 
      {Object.values(country.languages).map(value => (<p key={value}> {value} </p>))}
      <img src={country.flags.png} alt={country.flags.alt} />
      <h2> Weather in {country.capital} </h2>
      <p> Temperature: {celsius} Celsius </p>
      <img src={`https://openweathermap.org/payload/api/media/file/${icon}.png`} />
      <p> Wind: {wind} m/s </p>
    </div> 
  )
}

const Country = ({ name, country, showDetails }) => {
  const [show, setShow] = useState(showDetails) 
  const [coord, setCoord] = useState({ lat: null, lon: null })
  const [temp, setTemp] = useState(0)
  const [wind, setWind] = useState(0)
  const [icon, setIcon] = useState('')
  const handleShow = () => setShow(true)

  useEffect(() => {
    if (show) {
      dbService
        .getCity(country.capital[0])
        .then(response => {
          setCoord({ lat: response[0].lat, lon: response[0].lon})
        })
    }
  }, [show, country])

  useEffect(() => {
    if (coord.lat !== null && coord.lon !== null) {
      dbService
        .getWeather(coord.lat, coord.lon)
        .then(response => {
          setIcon(response.weather[0].icon)
          setTemp(response.main.temp)
          setWind(response.wind.speed)
        })
    }
  }, [coord])


  if (show) {
    return <CountryDetails country={country} temp={temp} wind={wind} icon={icon}/>
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <p>{name}</p>
      <button onClick={handleShow}> show </button>
    </div>
  )
}

const Countries = ({ names, countries }) => {
    if (names.length > 10) return <p>Too many matches, specify another filter</p>

    if (names.length === 1) {
        return (
          <Country 
            name={names[0]} 
            country={countries.find(c => c.name.common === names[0])} 
            showDetails={true}
          />
        )
    }

    return (
      <div>
          {names.map(name => (
            <Country 
              key={name} 
              name={name} 
              country={countries.find(c => c.name.common === name)} 
              showDetails={false}
            />
          ))}
      </div>
    )
}

export default Countries