import React from 'react';

const SpecificPerson = ( { name, number, filter} ) => {
    if(name.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {

        return (
            <>
                <p>
                    {name} {number}
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