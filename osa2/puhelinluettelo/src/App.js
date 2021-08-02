import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  // const [ filteredNameList, setFilteredNameList ] = useState([])

  
  const nameArray = persons.map(person => person.name)

  const addPerson = (event) => {
    event.preventDefault()
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
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  // Filter 
  
  // const handleFilterChange = (event) => {
    
  //   for(let i = 0; i < filteredNameList.length; i++){
  //     setFilteredNameList(filteredNameList.pop(filteredNameList[i]))
  //     return
  //   }

  //   let filter = event.target.value.toLowerCase();
  //   let array = [];

  //   for(let i = 0; i < persons.length; i++){
  //     if (persons[i].name.toLowerCase().includes(filter)) {
  //       array.push(persons[i])
  //     }
  //   }

  //   setFilteredNameList(filteredNameList.concat(array));
  // }
 
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          filter shown with: <input/>
        </div>
      <h2>add a new</h2>
      <form onSubmit = {addPerson}>
        <div>
          name: <input onChange={handleNameChange} value={newName}/>
        </div>
        <div>number: <input onChange={handleNumberChange} value={newNumber}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person => 
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        )}
    </div>
  )

}

export default App
