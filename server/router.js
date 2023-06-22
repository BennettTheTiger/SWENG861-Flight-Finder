// router.js
const Amadeus = require('amadeus');
const express = require('express');
const { API_KEY, API_SECRET } = require('./config');
// Create router
const router = express.Router();
// config amadeus
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
  await amadeus.referenceData.locations.get({
    keyword,
    subType: subType || Amadeus.location.airport,
  }).then(async (response) => {
    try {
      await res.json(JSON.parse(response.body));
    } catch (err) {
      await res.json(err);
    }
  }).catch((err) => {
    console.log(err);
  });
});

// Am I getting a good deal on this flight?
router.post(`/${API}/checkFlightDeal`, async (req, res) => {
  amadeus.analytics.itineraryPriceMetrics.get({
    ...req.body,
  }).then(async (response) => {
    await res.json(JSON.parse(response.body));
  }).catch((error) => {
    res.json(error);
  });
});

// finds flights
router.post(`/${API}/findFlights`, async (req, res) => amadeus.shopping.flightOffersSearch.get({
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
  console.log(error);
  res.json(error);
}));

module.exports = router;
