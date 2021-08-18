import React from 'react';

const SpecificPerson = ( { name, number, filter, deletePerson, id} ) => {
    
    const deleteButtonClick = () => {
        deletePerson(id, name)
    }

    if(name.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {

        return (
            <>
                <p>
                    {name} {number} <button onClick={deleteButtonClick}>delete</button>
                </p>
            </>
        )
    }

    return (
        <>
        </>
    )

}

export default SpecificPerson