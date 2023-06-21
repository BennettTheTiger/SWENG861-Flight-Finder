function getMockDealSuccess() {
  return {
    warnings: [],
    data: [
      {
        type: 'itinerary-price-metric',
        origin: {
          iataCode: 'JFK',
        },
        destination: {
          iataCode: 'SFO',
        },
        departureDate: '2023-06-15',
        transportType: 'FLIGHT',
        currencyCode: 'USD',
        oneWay: false,
        priceMetrics: [
          {
            amount: '74.90',
            quartileRanking: 'MINIMUM',
          },
          {
            amount: '528.07',
            quartileRanking: 'FIRST',
          },
          {
            amount: '540.26',
            quartileRanking: 'MEDIUM',
          },
          {
            amount: '649.58',
            quartileRanking: 'THIRD',
          },
          {
            amount: '666.76',
            quartileRanking: 'MAXIMUM',
          },
        ],
      },
    ],
    meta: {
      count: 1,
      links: {
        self: 'https://test.api.amadeus.com/v1/analytics/flight-price-metrics?originIataCode=JFK&destinationIataCode=SFO&departureDate=2023-06-15&currencyCode=USD&oneWay=False',
      },
    },
  };
}

export default getMockDealSuccess;
