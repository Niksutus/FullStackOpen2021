import React from 'react';
import SpecificPerson from './SpecificPerson'

const Persons = ({ persons, filter }) => {

    return (
        <>
            {persons.map(person => 
                <SpecificPerson key={person.name} name={person.name} number={person.number} filter={filter}/>
            )}
        </>
    )
}

export default Persons