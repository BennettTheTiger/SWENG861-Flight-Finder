/* eslint-disable react/prop-types */
import * as React from 'react';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { FlightTakeoff, FlightLand } from '@mui/icons-material';

import './basic-card.scss';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function fixString(value) {
  const words = value.toLowerCase().split(' ');
  words.forEach((word, i) => {
    words[i] = word[0].toUpperCase() + word.substr(1);
  });

  return words.join(' ');
}

function getAircraft(segment, dictionaries) {
  const value = dictionaries.aircraft[segment.aircraft.code] || 'N/A';
  return fixString(value);
}

function getAirline(segment, dictionaries) {
  const value = dictionaries.carriers[segment.carrierCode] || 'N/A';
  return fixString(value);
}

function locationAtTimeHelper(info) {
  // eslint-disable-next-line prefer-template
  return ' ' + String(info?.iataCode) + ' ' + new Date(info.at).toLocaleDateString('en-US', { dateStyle: 'short' }) + ' ' + new Date(info.at).toLocaleTimeString('en-US', { timeStyle: 'short' });
}

function renderFlightPrice(flight) {
  return `$${flight.price.grandTotal}`;
}

function renderSegment(segment, dictionaries) {
  const { departure, arrival } = segment;
  return (
    <div className="segment">
      <div className="depart">
        <FlightTakeoff />
        {locationAtTimeHelper(departure)}
      </div>
      <div className="carrier-info">
        <div className="airline">{getAirline(segment, dictionaries)}</div>
        <div className="divider"> - </div>
        <div className="aircraft-type">{getAircraft(segment, dictionaries)}</div>
      </div>
      <div className="arive">
        <FlightLand />
        {locationAtTimeHelper(arrival)}
      </div>
    </div>
  );
}

export default function BasicCard(props) {
  const { flight, dictionaries } = props;
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Item>
                {renderFlightPrice(flight)}
              </Item>
            </Grid>
            <Grid item xs={9}>
              {flight.itineraries.map((itinerary) => {
                if (itinerary?.segments) {
                  return itinerary?.segments.map((segment) => (
                    <Item>
                      {renderSegment(segment, dictionaries)}
                    </Item>
                  ));
                }
                return null;
              })}
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
