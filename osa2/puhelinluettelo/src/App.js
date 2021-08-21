import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/personsService'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    personsService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  
  const nameArray = persons.map(person => person.name.toLowerCase())

  const addPerson = () => {
    const personObject = {
      name: newName,
      number: newNumber,
    }

    if(nameArray.indexOf(newName.toLocaleLowerCase()) !== -1){
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
          const person = persons.find(n => n.name.toLowerCase() === newName.toLowerCase())
          const changedPerson = {...person, number: newNumber};
          personsService.edit(person.id, changedPerson);
          setPersons(persons.map(a => a.id !== person.id ? a : changedPerson))
        }
    } else {
      personsService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
      })
    }
    
  }

  const deletePerson = (id, name) => {

    if (window.confirm(`Delete ${name}?`)) {
      personsService.deletePerson(id);
      setPersons(persons.filter(n => n.id !== id))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event);
  }

  const handleFilterChange = (event) => {
    setFilter(event)
  }

 
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange = {(e)=>handleFilterChange(e)}/>
        
      <h2>add a new</h2>
      <PersonForm addPerson ={addPerson} handleNameChange = {(e) => {handleNameChange(e)}} handleNumberChange = {(e)=>{handleNumberChange(e)}} newName = {newName} newNumber = {newNumber}/>

      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson}/>
    </div>
  )

}

export default App
