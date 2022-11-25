import Person from './Person'

const Persons = ({ persons, search, deletePerson }) => {
  const regex = new RegExp(search, 'i')
  const filtered = persons.filter(({name}) => name.match(regex))

  if (search === '') {
    return (
      <div>
        {persons.map(person =>
          <Person id={person.id} key={person.id} name={person.name} number={person.number} deletePerson={deletePerson}/>  
        )}
      </div>
    )
  }

  if (filtered.length === 0) {
    return <div><p>There are no contacts that match with <b>{search}</b></p></div>
  }
  
  return (
    <div>
      {filtered.map(person =>
        <Person id={person.id} key={person.id} name={person.name} number={person.number} deletePerson={deletePerson}/>  
      )}
    </div>
  )
}

export default Persons