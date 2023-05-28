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
import Typography from '@mui/material/Typography';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function getAircraft(segment, dictionaries) {
  return dictionaries.aircraft[segment.aircraft.code] || 'N/A';
}

function getAirline(segment, dictionaries) {
  return dictionaries.carriers[segment.carrierCode] || 'N/A';
}

function locationAtTimeHelper(info) {
  // eslint-disable-next-line prefer-template
  return ' ' + String(info?.iataCode) + ' ' + new Date(info.at).toLocaleDateString('en-US', { dateStyle: 'short' }) + ' ' + new Date(info.at).toLocaleTimeString('en-US', { timeStyle: 'short' });
}

function renderFlightPrice(flight) {
  return <Typography>{`$${flight.price.grandTotal}`}</Typography>;
}

function renderSegment(segment, dictionaries) {
  const { departure, arrival } = segment;
  const departureString = `Depart ${locationAtTimeHelper(departure)}`;
  const arrivalString = `Arrive ${locationAtTimeHelper(arrival)}`;
  return (
    <>
      <Typography>{departureString}</Typography>
      <Typography>{arrivalString}</Typography>
      <Typography>{getAirline(segment, dictionaries)}</Typography>
      <Typography>{getAircraft(segment, dictionaries)}</Typography>
    </>
  );
}

/*

      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>

*/

export default function BasicCard(props) {
  console.log(props);
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
