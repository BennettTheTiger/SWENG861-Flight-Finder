import { useState, React } from 'react';
import './app.scss';

import { isEmpty, omit } from 'ramda';
import {
  TextField, Box, Grid, Button,
} from '@mui/material';
import BasicCard from './components/BasicCard/BasicCard';

import { findFlights, checkFlightDeal } from './api';
import PlaneLoader from './components/PlaneLoader/PlaneLoader';
import AirportSearch from './components/AirportSearch/AirportSearch';
import { dateIsTodayOrFuture, getLocalDate } from './utils/date';
import DealSummary from './components/DealScore/DealSummary';
import NoFlightsFound from './components/NoFlightsFound/NoFlightsFound';

function App() {
  const [departureAirportCode, setDepartureAirportCode] = useState('');
  const [arrivalAirportCode, setArrivalAirportCode] = useState('');
  const [numberOfAdults, setNumberOfAdults] = useState('1');
  const [departureDate, setFlightDate] = useState(getLocalDate());
  const [flightResults, setFlightResults] = useState({});
  const [flightDealInfo, setFlightDealInfo] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoadingFlights, setFlightsLoading] = useState(false);

  function isInvalid() {
    return !isEmpty(errors) || isEmpty(departureAirportCode) || isEmpty(arrivalAirportCode);
  }

  async function handleFetchFlights() {
    setFlightsLoading(true);
    // core flight data
    const flightResult = findFlights({
      originLocationCode: departureAirportCode,
      destinationLocationCode: arrivalAirportCode,
      adults: numberOfAdults,
      departureDate,
    }).then((result) => {
      console.log(result);
      setFlightResults(result);
    });
    // deal data
    const dealResult = checkFlightDeal({
      originIataCode: departureAirportCode,
      destinationIataCode: arrivalAirportCode,
      departureDate,
    }).then((result) => setFlightDealInfo(result));

    await Promise.all([flightResult, dealResult]);
    setFlightsLoading(false);
  }

  function getFlightData() {
    return flightResults?.data || [];
  }

  console.log(flightDealInfo);

  return (
    <div className="App">
      <section>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid item sm={6} xs={12}>
              <AirportSearch label="Origin" handleSelection={setDepartureAirportCode} />
            </Grid>
            <Grid item sm={6} xs={12}>
              <AirportSearch label="Destination" handleSelection={setArrivalAirportCode} />
            </Grid>
            <Grid item xs={4} sm={2}>
              <TextField
                error={Object.keys(errors).includes('seats')}
                helperText={errors.seats}
                label="Seats"
                type="number"
                min={1}
                max={50}
                value={numberOfAdults}
                onChange={(evt) => {
                  const value = Number(evt.target.value);
                  if (value < 1 || value > 50) {
                    const newErrors = { ...errors, seats: 'Seats must be between 1-50' };
                    setErrors(newErrors);
                  } else {
                    setErrors(omit(['seats', errors]));
                  }
                  setNumberOfAdults(value);
                }}
              />
            </Grid>
            <Grid item sm={5} xs={8}>
              <TextField
                error={Object.keys(errors).includes('date')}
                helperText={errors.date}
                label="Date"
                type="date"
                min={getLocalDate()}
                value={departureDate}
                onChange={(evt) => {
                  const { value } = evt.target;
                  if (!dateIsTodayOrFuture(value)) {
                    setErrors({ ...errors, date: 'Date must be today or in the future' });
                  } else if (Object.keys(errors).includes('date')) {
                    setErrors(omit(['date'], errors));
                  }
                  setFlightDate(evt.target.value);
                }}
              />
            </Grid>
            <Grid item sm={5} xs={12}>
              <Button
                variant="contained"
                disabled={isInvalid()}
                onClick={() => handleFetchFlights()}
                onChange={(evt) => setNumberOfAdults(evt.target.value)}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </section>
      <DealSummary flightDealInfo={flightDealInfo} />
      <section className="results">
        { isEmpty(flightResults)
          ? <NoFlightsFound isLoadingFlights={isLoadingFlights} />
          : (
            <Box sx={{ flexGrow: 1 }}>
              {
              getFlightData().map((flight) => (
                <Grid item xs={12} sm={6} key={flight.id}>
                  <BasicCard flight={flight} dictionaries={flightResults?.dictionaries} />
                </Grid>
              ))
            }
            </Box>
          )}
        {isLoadingFlights && <PlaneLoader />}
      </section>
      <footer> Built By Bennett for PSU SWENG 861 </footer>
    </div>
  );
}

export default App;
