import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from "./components/Persons"
import dbService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  useEffect(() => {
    dbService
      .getAll()
      .then(persons => setPersons(persons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const exists = persons.find(person => person.name === newName)

    if (exists) {
      if (!window.confirm(`${exists.name} has been already added to the phonebook, replace the old number with a new one?`)) { 
        return
      }

      const changedPerson = { ...exists, number: newNumber }
      dbService
        .update(exists.id, changedPerson)
        .then(returnedPerson => {
          console.log(`Changed ${exists.name}'s number from: ${exists.number} to ${returnedPerson.number}`)
          setPersons(persons.map(person => 
            person.id === exists.id ? returnedPerson : person
          ))
        })

    } else {
      dbService
        .create({ name: newName, number: newNumber })
        .then(returnedPerson => {
          console.log(`Added successfully: ${returnedPerson.name}`)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = id => {
    const person = persons.find(p => p.id === id)
    if (!window.confirm(`Delete ${person.name}?`)) return
    
    dbService
      .deletePerson(id)
      .then(returnedPerson => {
        console.log(`Deleted successfully: ${returnedPerson.name}`)
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        alert(`${person.name} was already removed from the server`)
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  const personsToShow = newFilter === '' ? persons 
    : persons.filter(person =>person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        value={newFilter} 
        onChange={handleFilterChange}
      />

      <h3> Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons 
        persons={personsToShow}
        deletePerson={deletePerson} 
      />
    </div>
  )
}

export default App