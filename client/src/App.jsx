/* eslint-disable no-unused-vars */
import { useState, React } from 'react';
import './app.css';

import { isEmpty, pathOr } from 'ramda';
import { styled } from '@mui/material/styles';
import {
  TextField, Box, Paper, Grid, Button, Autocomplete,
} from '@mui/material';
import BasicCard from './components/BasicCard/BasicCard';

import { findFlights, checkFlightDeal } from './api';
import PlaneLoader from './components/PlaneLoader';
import AirportSearch from './components/AirportSearch/AirportSearch';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App() {
  const [departureAirportCode, setDepartureAirportCode] = useState(null);
  const [arrivalAirportCode, setArrivalAirportCode] = useState(null);
  const [numberOfAdults, setNumberOfAdults] = useState('1');
  const [flightDate, setFlightDate] = useState(new Date().toISOString().substr(0, 10));
  const [flightResults, setFlightResults] = useState({});
  const [flightDealInfo, setFlightDealInfo] = useState({});
  const [isLoadingFlights, setFlightsLoading] = useState(false);

  async function handleFetchFlights() {
    console.log('about to load');
    setFlightsLoading(true);
    // core flight data
    const findFlightsRequest = findFlights({
      originLocationCode: departureAirportCode,
      destinationLocationCode: arrivalAirportCode,
    }).then((result) => {
      setFlightResults(result);
      setFlightsLoading(false);
    });
    // deal data
    checkFlightDeal({
      originIataCode: departureAirportCode,
      destinationIataCode: arrivalAirportCode,
    }).then((result) => {
      setFlightDealInfo(result);
      console.log('deal result', result);
    });

    console.log('all done');
  }

  function getFlightData() {
    return flightResults?.data?.data || [];
  }

  return (
    <div className="App">
      <section>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid item xs={6}>
              <Item>
                <AirportSearch label="Origin" handleSelection={setDepartureAirportCode} />
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <AirportSearch label="Destination" handleSelection={setArrivalAirportCode} />
              </Item>
            </Grid>
            <Grid item xs={2}>
              <Item>
                <TextField
                  label="Seats"
                  type="number"
                  value={numberOfAdults}
                  onChange={(evt) => setNumberOfAdults(evt.target.value)}
                />
              </Item>
            </Grid>
            <Grid item xs={5}>
              <Item>
                <TextField
                  label="Date"
                  placeholder={1}
                  type="date"
                  min={new Date().toISOString().substring(0, 10)}
                  value={flightDate}
                  onChange={(evt) => setFlightDate(evt.target.value)}
                />
              </Item>
            </Grid>
            <Grid item xs={5}>
              <Item>
                <Button
                  variant="contained"
                  disabled
                  onClick={() => handleFetchFlights()}
                  onChange={(evt) => setNumberOfAdults(evt.target.value)}
                >
                  Submit
                </Button>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </section>
      <section className="results">
        {isLoadingFlights && <PlaneLoader />}
        { isEmpty(flightResults) ? null : (
          <Box sx={{ flexGrow: 1 }}>
            {
              getFlightData().map((flight) => (
                <Grid item xs={12} sm={6} key={flight.id}>
                  <Item>
                    <BasicCard flight={flight} dictionaries={flightResults?.data?.dictionaries} />
                  </Item>
                </Grid>
              ))
            }
          </Box>
        )}
      </section>
      <footer>
        Built By Bennett for PSU SWENG 861
      </footer>
    </div>
  );
}

export default App;
