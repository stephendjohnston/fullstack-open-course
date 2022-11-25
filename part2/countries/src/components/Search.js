import React from 'react'

const Search = ({newSearch, onChange}) =>
    <div>
        find countries <input value={newSearch} onChange={onChange} />
    </div>

export default Search