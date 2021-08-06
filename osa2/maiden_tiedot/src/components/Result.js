import React from 'react';

const Result = ({ name, filter }) => {
    
    if(name.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return(
            <div>
                <p>{name}</p>
            </div>
        )
    }

    return (
        <>
        </>
    )
    
}

export default Result;