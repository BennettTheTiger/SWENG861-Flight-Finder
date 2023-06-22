import { mean, median } from 'ramda';

/**
 * Takes a flight response and digests the data for ui comparison
 * @param {} flights data from api response
 */
function analyzeFlightData(flights) {
  const flightPrices = (flights?.data || []).reduce((results, offer) => {
    const result = offer?.price?.grandTotal;
    if (result) {
      results.push(Number(result));
      return results;
    }
    return results;
  }, []);

  return {
    avg: mean(flightPrices),
    median: median(flightPrices),
  };
}

export default analyzeFlightData;
