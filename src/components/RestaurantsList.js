import React from 'react';
import Restaurant from './Restaurant';

function RestaurantsList(props) {
  return (
    <ul className="restaurants-list">
      {
        props.venues.map((item, index) => {
          return (
            <Restaurant 
              name={item.venue.name}
              key={index} 
              openInfoWindow={() => props.openInfoWindow(index)} 
            />
          );
        })
      }
    </ul>
  );
}

export default RestaurantsList;