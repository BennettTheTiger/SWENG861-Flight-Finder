/* eslint-disable react/prop-types */
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {
  FlightTakeoff, FlightLand, AccessTime, Airlines, Flight,
} from '@mui/icons-material';

import parse from 'parse-duration';
import useWordCasing from '../../utils/wordCase';

import './basic-card.scss';
import { convertMsToTime } from '../../utils/date';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1a535cff',
  ...theme.typography.body2,
  margin: 5,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: '#f7fff7ff',
}));

function getAircraft(segment, dictionaries) {
  const value = dictionaries.aircraft[segment.aircraft.code] || 'N/A';
  return useWordCasing(value);
}

function getAirline(segment, dictionaries) {
  const value = dictionaries.carriers[segment.carrierCode] || 'N/A';
  return useWordCasing(value);
}

function locationAtTimeHelper(info) {
  // eslint-disable-next-line prefer-template
  return ' ' + String(info?.iataCode) + ' ' + new Date(info.at).toLocaleDateString('en-US', { dateStyle: 'short' }) + ' ' + new Date(info.at).toLocaleTimeString('en-US', { timeStyle: 'short' });
}

function renderFlightPrice(flight) {
  return `$${flight.price.grandTotal}`;
}

function getTotalTimeAsString(amadeusTime) {
  const parsedTime = parse(amadeusTime);
  const timeParts = convertMsToTime(parsedTime);
  const hoursPlural = `${timeParts.hours} ${timeParts.hours === 1 ? 'Hour ' : 'Hours'}`;
  const minutesPlural = `${timeParts.minutes} ${timeParts.minutes === 1 ? 'Minute ' : 'Minutes'}`;
  return `${hoursPlural} ${minutesPlural}`;
}

function getItineraryDurationString(flight, index = 0) {
  const flightItineraryDuration = flight?.itineraries?.[index]?.duration;
  if (!flightItineraryDuration) {
    return '';
  }
  return getTotalTimeAsString(flightItineraryDuration);
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
        <Airlines />
        {getAirline(segment, dictionaries)}
      </div>
      <div className="carrier-info">
        <Flight />
        {getAircraft(segment, dictionaries)}
      </div>
      <div className="duration">
        <AccessTime />
        {getTotalTimeAsString(segment.duration)}
      </div>
      <div className="arive">
        <FlightLand />
        {locationAtTimeHelper(arrival)}
      </div>
    </div>
  );
}

export default function BasicCard(props) {
  const { flight, dictionaries, flightPriceData } = props;
  const avgDifference = Number(flight.price.grandTotal - flightPriceData.avg).toFixed(2);
  const textStyleColor = { color: avgDifference < 0 ? '#4fb477ff' : '#ff6b6bff' };
  return (
    <Card sx={{ minWidth: 275, backgroundColor: '#ffe66dff' }}>
      <CardContent>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <Item>
                <div className="price">{renderFlightPrice(flight)}</div>
                <div className="total-time">{getItineraryDurationString(flight)}</div>
                <div className="price">{`Bookable Seats: ${flight.numberOfBookableSeats || 'N/A'}`}</div>
                <div className="price-avg-diff">
                  <span style={textStyleColor}>{`$${avgDifference}`}</span>
                  {` ${avgDifference < 0 ? 'below' : 'above'} average`}
                </div>
              </Item>
            </Grid>
            <Grid item sm={6} xs={12}>
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
