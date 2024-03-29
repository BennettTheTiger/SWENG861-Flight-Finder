import React from 'react';
import './plane-loader.scss';

function PlaneLoader() {
  return (
    <div className="plane-loader">
      <div className="flight-preloader" id="flight-preloader">
        <svg width="86px" height="55px" viewBox="0 0 86 55" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <title>loading-flight</title>
          <desc>Created with Sketch.</desc>
          <defs />
          <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <path d="M79.8,1.8 C77.7,1.1 75.3,1.2 73.4,2.2 L52.9,11 L32.6,6.2 C31.8,6 31,6.1 30.3,6.5 L25.6,8.8 C24.4,9.4 23.6,10.6 23.6,12 C23.6,13.4 24.4,14.6 25.6,15.1 L36.1,19.9 L19.8,28.2 C19.7,28.3 19.5,28.3 19.4,28.2 L6.7,23.8 C5.6,23.4 4.4,23.5 3.3,24 C1.9,24.7 1,25.9 0.8,27.4 C0.6,28.9 1.2,30.4 2.3,31.4 L14.7,41.8 C15.7,42.6 17,42.8 18.2,42.4 L43.2,33.2 L38.5,48.4 C38,50.1 38.5,52 39.9,53.1 C40.7,53.8 41.8,54.2 42.8,54.2 C43.5,54.2 44.1,54 44.8,53.7 L48.7,51.8 C49.6,51.4 50.4,50.6 50.8,49.7 L62,26.1 L80.5,17.4 C82.5,16.4 84.1,14.7 84.8,12.5 C85.5,10.4 85.4,8 84.4,6 C83.6,4.1 81.9,2.5 79.8,1.8 Z" id="loading-flight" stroke="#F7B62F" fillRule="nonzero" />
          </g>
        </svg>
      </div>
      <div className="search-text">
        Searching for Flights
      </div>
    </div>
  );
}

export default PlaneLoader;
