import React from 'react';
import SpecificPerson from './SpecificPerson'

const Persons = ({ persons, filter, deletePerson }) => {

    return (
        <>
            {persons.map(person => 
                <SpecificPerson key={person.id} id={person.id} name={person.name} number={person.number} filter={filter} deletePerson = {deletePerson}/>
            )}
        </>
    )
}

export default Persons