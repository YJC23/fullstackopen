const Country = ({ name }) => {


  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <p>{name}</p>
      <button onClick={() => {}}> show </button>
    </div>
  )
}

const CountryDetails = ({ country }) => {
  return (
    <div> 
      <h1> {country.name.common} </h1>
      <p> Capital: {country.capital} </p>
      <p> Area: {country.area} </p>
      <h2> Languages </h2> 
      {Object.values(country.languages).map(value => (<p key={value}> {value} </p>))}
      <img 
        src={country.flags.png}
        alt={country.flags.alt}  
      />
    </div> 
  )
}

const Countries = ({ names, countries }) => {
    if (names.length > 10) return <p>Too many matches, specify another filter</p>

    if (names.length === 1) {
        const country = countries.find(c => c.name.common === names[0])
        return <CountryDetails country={country} />
    }

    return (
      <div>
          {names.map(name => (
            <Country key={name} name={name}/>
          ))}
      </div>
    )
}

export default Countries