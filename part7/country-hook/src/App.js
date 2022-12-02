import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v2/name/${name}?fullText=true`)
      .then(response => {
        setCountry(response.data)
      })
      .catch(error => setCountry([]))
  }, [name])

  if ( name === '') {
    return null
  }

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (country.length === 0) {
    return (
      <div>not found...</div>
    )
  }

  const countryObject = country[0]

  return (
    <div>
      <h3>{countryObject.name}</h3>
      <div>population {countryObject.population}</div> 
      <div>capital {countryObject.capital}</div>
      <img src={countryObject.flag} height='100' alt={`flag of ${countryObject.name}`}/> 
    </div>
  )  
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
    console.log(nameInput)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
