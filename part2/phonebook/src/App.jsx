import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from "./components/Persons"
import dbService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  
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
      if (!window.confirm(`${exists.name} has been already added to the phonebook, replace the old number with a new one?`)) return
      const changedPerson = { ...exists, number: newNumber }
      
      dbService
        .update(exists.id, changedPerson)
        .then(returnedPerson => {
          setMessage(`Changed ${exists.name}'s number from ${exists.number} to ${returnedPerson.number}`)
          setTimeout(() => setMessage(''), 5000)

          setPersons(persons.map(person => 
            person.id === exists.id ? returnedPerson : person
          ))
        })
        .catch(error => {
          setError(`${exists.name} was already deleted from server!`)
          setTimeout(() => setError(''), 5000)

          setPersons(persons.filter(person => person.id !== exists.id))
        })
    } else {
      dbService
        .create({ name: newName, number: newNumber })
        .then(returnedPerson => {
          setMessage(`Added : ${returnedPerson.name}`)
          setTimeout(() => setMessage(''), 5000)

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
        setMessage(`Deleted : ${returnedPerson.name}`)
        setTimeout(() => setMessage(''), 5000)

        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        console.log("Was already deleted!")
        setError(`${person.name} was already deleted from server!`)
        setTimeout(() => setError(''), 5000)

        setPersons(persons.filter(person => person.id !== id))
      })
  }

  const personsToShow = newFilter === '' ? persons 
    : persons.filter(person =>person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type="success" />
      <Notification message={error} type="error" />
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