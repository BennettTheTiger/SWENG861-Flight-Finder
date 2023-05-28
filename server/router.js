// router.js
const Amadeus = require('amadeus');
const express = require('express');
const { API_KEY, API_SECRET } = require('./config');
// Create router
const router = express.Router();

const amadeus = new Amadeus({
  clientId: API_KEY,
  clientSecret: API_SECRET,
});

const API = 'api';
// airport search suggestions
router.get(`/${API}/search/location`, async (req, res) => {
  const { keyword, subType } = req.query;
  if (!keyword) {
    res.sendStatus(400);
  }
  const response = await amadeus.referenceData.locations.get({
    keyword,
    subType: subType || Amadeus.location.any, // Amadeus.location.airport
  });
  try {
    await res.json(JSON.parse(response.body));
  } catch (err) {
    await res.json(err);
  }
});

// finds flights
router.post(`/${API}/findFlights`, async (req, res) => {
  console.log(req.body);
  return amadeus.shopping.flightOffersSearch.get({
    ...req.body,
    departureDate: new Date().toISOString().substring(0, 10), // NOW
    adults: '1',
  }).then(async (response) => {
    try {
      await res.json(JSON.parse(response.body));
    } catch (err) {
      await res.json(err);
    }
  }).catch((error) => {
    res.json(error);
  });
});
// ...
module.exports = router;
