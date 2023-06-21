import React from 'react';

import './NoFlightsFound.scss';

function NoFlightsFound(props) {
  const text = props?.isLoadingFlights ? 'Checking Flights' : 'No flights match your search parameters';
  return (
    <section className="no-flights-found">
      <div>{text}</div>
    </section>
  );
}

NoFlightsFound.propTypes = {
  isLoadingFlights: Boolean,
};

NoFlightsFound.defaultProps = {
  isLoadingFlights: false,
};

export default NoFlightsFound;
