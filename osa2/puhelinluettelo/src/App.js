import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  
  const nameArray = persons.map(person => person.name)

  const addPerson = () => {
    const personObject = {
      name: newName,
      number: newNumber,
    }

    if(nameArray.indexOf(newName) !== -1){
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
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
      <Persons persons={persons} filter={filter}/>
    </div>
  )

}

export default App
