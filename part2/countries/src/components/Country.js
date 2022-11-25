const Country = ({country}) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map(language => {
          return <li key={language}>{language}</li>
        })}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common} flag`}></img>
    </div>
  )
}

export default Country