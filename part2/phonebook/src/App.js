import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
		personService
			.getAll()
			.then(initialPersons => {    
				setPersons(initialPersons)
			})
	}, [])

  const addPerson = (event) => {
    event.preventDefault()
    
    if (isExistingContact()) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const regex = new RegExp(newName, 'i')
        const personToAdd = persons.find(({name}) => name.match(regex))
        const updatedPerson = { ...personToAdd, number: newNumber}
        console.log(personToAdd, updatedPerson)
        personService
          .update(updatedPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personToAdd.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            alert(`[ERROR] ${error}`)
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }
  
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          alert('[ERROR] failed to create new contact')
        })
    }
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(id)
        .then(data => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setErrorMessage(
            `Information of '${person.name}' has already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(n => n.id !== id))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange =  (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const isExistingContact = () => {
    return persons.some(({name}) => name.toLowerCase() === newName.toLowerCase())
  }

  return (
    <div>
      <Header name={'Phonebook'} />
      <Notification message={errorMessage} />
      <Filter newSearch={newSearch} onChange={handleSearchChange} />
      
      <Header name={'Add new contact'} />
      <PersonForm 
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <Header name={'Numbers'} />
      <Persons persons={persons} search={newSearch} deletePerson={deletePerson}/>
    </div>
  )
}

export default App