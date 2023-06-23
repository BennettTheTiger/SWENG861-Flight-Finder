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

// eslint-disable-next-line import/no-extraneous-dependencies
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

/**
 *  Gets flight data from the api response and fixes casing
 * @param {Obect} segment
 * @param {Object} dictionaries
 * @returns Aircraft types string with uppercase words in the sentence
 */
function getAircraft(segment, dictionaries) {
  const value = dictionaries?.aircraft?.[segment.aircraft.code] || 'N/A';
  return useWordCasing(value);
}

/**
 *  Gets flight data from the api response and fixes casing
 * @param {Obect} segment
 * @param {Object} dictionaries
 * @returns Airline types string with uppercase words in the sentence
 */
function getAirline(segment, dictionaries) {
  const value = dictionaries?.carriers?.[segment?.carrierCode] || 'N/A';
  return useWordCasing(value);
}

/**
 * Builds a string to show what local time you will arive at an airport
 * @param {*} info
 * @returns {String}
 */
function locationAtTimeHelper(info) {
  // eslint-disable-next-line prefer-template
  return ' ' + String(info?.iataCode) + ' ' + new Date(info.at).toLocaleDateString('en-US', { dateStyle: 'short' }) + ' ' + new Date(info.at).toLocaleTimeString('en-US', { timeStyle: 'short' });
}

/**
 * Get flight grandTotal from price object
 * @param {*} flight
 * @returns {String}
 */
function renderFlightPrice(flight) {
  return `$${flight.price.grandTotal}`;
}

/**
 * Helper to convert amadeaus api response time to human readable format
 * @param {String} amadeusTime
 * @returns {String}
 */
function getTotalTimeAsString(amadeusTime) {
  const parsedTime = parse(amadeusTime);
  const timeParts = convertMsToTime(parsedTime);
  const hoursPlural = `${timeParts.hours} ${timeParts.hours === 1 ? 'Hour ' : 'Hours'}`;
  const minutesPlural = `${timeParts.minutes} ${timeParts.minutes === 1 ? 'Minute ' : 'Minutes'}`;
  return `${hoursPlural} ${minutesPlural}`;
}

/**
 * Helper to get the flight itinerary as a human readable string
 * @param {Object} flight
 * @param {Number} index defaults to first itinerary
 * @returns {String}
 */
function getItineraryDurationString(flight, index = 0) {
  const flightItineraryDuration = flight?.itineraries?.[index]?.duration;
  if (!flightItineraryDuration) {
    return '';
  }
  return getTotalTimeAsString(flightItineraryDuration);
}

/**
 * Render function for a flight itineraries segment
 * @param {*} segment
 * @param {*} dictionaries
 * @returns {JSX}
 */
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

/**
 * Renders information for a flight
 * @param {*} props
 * @returns {JSX}
 */
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
