import React from 'react';

const PersonForm = (props) => {

    const addPerson = (event) => {
        event.preventDefault();
        props.addPerson()
    }

    const handleNameChange = (event) => {
        props.handleNameChange(event.target.value)
    }

    const handleNumberChange = (event) => {
        props.handleNumberChange(event.target.value)
    }


    return (
        <div>
            <form onSubmit = {addPerson}>
                <div>
                name: <input onChange={handleNameChange} value= {props.newName}/>
                </div>
                <div>number: <input onChange={handleNumberChange} value={props.newNumber}/></div>
                <div>
                <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm