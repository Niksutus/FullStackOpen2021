import React from 'react';


const Search = (props) => {
    
    const changeFilter = (event) => {
        props.changeFilter(event.target.value)
    }

    return(
        <>
            find countries <input onChange={changeFilter}/>
        </>
    )
}

export default Search;