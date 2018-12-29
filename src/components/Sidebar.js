import React from 'react';
import Title from './Title';
import Status from './Status';
import RestaurantsList from './RestaurantsList';
import Search from './Search';

function Sidebar(props) {
  return (
    <div id="sidebar">
      <Title />
      <Search updateQuery={query => props.updateQuery(query)} />
      <Status markersCount={props.markersCount} />
      <RestaurantsList 
        venues={props.venues} 
        openInfoWindow={i => props.openInfoWindow(i)} 
      />
    </div>
  );
}

export default Sidebar;