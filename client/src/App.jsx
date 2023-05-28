/* eslint-disable no-unused-vars */
import { useState, React } from 'react';
import Button from '@mui/material/Button';
import './app.css';

// eslint-disable-next-line import/no-extraneous-dependencies
import { isEmpty, pathOr } from 'ramda';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import BasicCard from './components/BasicCard';
import { Search } from './components/AirportAutoComplete';

import { findFlights } from './api';

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
  const [flightResults, setFlightResults] = useState({});

  function getFlightData() {
    return flightResults?.data?.data || [];
  }

  return (
    <div className="App">
      <section>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <Item>
                <Search setValue={setDepartureAirportCode} label="Departure" />
              </Item>
            </Grid>
            <Grid item xs={5}>
              <Item>
                <Search setValue={setArrivalAirportCode} label="Arrival" />
              </Item>
            </Grid>
            <Grid item xs={2}>
              <Item>
                <Button
                  variant="contained"
                  onClick={() => {
                    console.log({
                      originLocationCode: departureAirportCode,
                      destinationLocationCode: arrivalAirportCode,
                    });
                    findFlights({
                      originLocationCode: departureAirportCode,
                      destinationLocationCode: arrivalAirportCode,
                    }, setFlightResults);
                  }}
                >
                  Submit
                </Button>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </section>
      <section className="results">
        { Object.keys(flightResults).length === 0 ? null : (
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
