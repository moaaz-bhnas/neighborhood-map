import React from 'react';

function Restaurant(props) {
  return (
    <li onClick={props.openInfoWindow}>
      {props.name}
    </li>
  );
}

export default Restaurant;
