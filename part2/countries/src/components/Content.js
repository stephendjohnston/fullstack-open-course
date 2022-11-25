import Country from './Country'

const Content = ({allCountries, newSearch, country, setCountry}) => {
  const regex = new RegExp(newSearch, 'i')
  const filtered = allCountries.filter(({name}) => name.common.match(regex))

  if (newSearch === '') {
    return <></>
  }

  if (country.length === 1) {
    return (
      <Country country={country[0]} />
    )
  }

  if (filtered.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (filtered.length === 1) {
    return (
      <Country country={filtered[0]}/>
    )
  } else if (filtered.length > 1 && filtered.length <= 10) {
    return (
      <ul>
        {filtered.map(country => {
          return <li key={country.name.common}>{country.name.common}<button onClick={() => setCountry([country])}>show</button></li>
        })}
      </ul>
    )
  }
}

export default Content