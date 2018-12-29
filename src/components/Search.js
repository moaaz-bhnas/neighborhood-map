import React from 'react';

function Search(props) {
  return (
    <form role="search">
      <input 
        className="search-restaurants"
        type="text"
        placeholder="Search Restaurants"
        value={props.query}
        onChange={event => props.updateQuery(event.target.value)}
      />
    </form>
  );
}

export default Search;