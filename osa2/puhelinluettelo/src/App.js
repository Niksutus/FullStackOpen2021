import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import personsService from './services/personsService'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notification, setNotification ] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
          personsService
            .edit(person.id, changedPerson)
            .then(returnedPerson => {
              console.log(returnedPerson)
              setPersons(persons.map(a => a.id !== person.id ? a : returnedPerson))
              setNotification(`Phone number of ${newName} has been changed succesfully`);
              setNewName('');
              setNewNumber('');
              setTimeout(() => {
                setNotification(null)
              }, 5000)
            })
            .catch(error => {
              setErrorMessage(`Information of ${changedPerson.name} has already been removed from server`)
              setPersons(persons.filter(person => person.id !== changedPerson.id));
              setNewName('');
              setNewNumber('');
              setTimeout(()=> {
                setErrorMessage(null)
              }, 5000)
            })
        }
    } else {
      personsService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response))
        setNotification(`${newName} has been added successfully`)
        setNewName('')
        setNewNumber('')
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
    }
  }

  const deletePerson = (id, name) => {

    if (window.confirm(`Delete ${name}?`)) {
      personsService.deletePerson(id);
      setPersons(persons.filter(n => n.id !== id))
      setNotification(`${name} has been deleted succesfully`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
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
      
      <ErrorMessage message={errorMessage}/>
      <Notification message={notification}/>

      <Filter handleFilterChange = {(e)=>handleFilterChange(e)}/>
        
      <h2>add a new</h2>
      <PersonForm addPerson ={addPerson} handleNameChange = {(e) => {handleNameChange(e)}} handleNumberChange = {(e)=>{handleNumberChange(e)}} newName = {newName} newNumber = {newNumber}/>

      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson}/>
    </div>
  )

}

export default App;
