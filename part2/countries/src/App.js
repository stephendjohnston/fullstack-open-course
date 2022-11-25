import { useState, useEffect } from 'react'
import axios from 'axios'
import Content from './components/Content'
import Search from './components/Search'

const App = () => {  
	const [country, setCountry] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
    setCountry([])
  }

  useEffect(() => {     
		axios      
			.get('https://restcountries.com/v3.1/all')      
			.then(response => {
				setAllCountries(response.data)      
			})
	}, [])

  return (
    <div>
      <Search newSearch={newSearch} onChange={handleSearchChange}/>
      <Content 
        allCountries={allCountries} 
        newSearch={newSearch} 
        country={country} 
        setCountry={setCountry}
      />
    </div>
  )
}

export default App 