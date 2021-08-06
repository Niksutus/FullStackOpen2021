import React from 'react';
import Result from './Result'

const AllResults = ({ countries, filter }) => {
    
    // figure out a futher filtering system here

    return (

        <div id="filterScreen">
            {countries.map(country =>
                <Result key={country.alpha2Code} name={country.name} filter={filter}/>
                )}
        </div>
    )
}

export default AllResults;