import React from 'react';

function Status(props) {
  return (
    <p className="status">
      You have {props.markersCount} markers on the map.
    </p>
  );
}

export default Status;
