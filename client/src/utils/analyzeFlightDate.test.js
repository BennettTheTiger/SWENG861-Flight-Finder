import analyzeFlightData from './analyzeFlightData';

describe('analyzeFlightData', () => {
  it('returns with no flight data', () => {
    expect(analyzeFlightData({})).toEqual({ avg: NaN, median: NaN });
  });
  it('returns right values with no flight data', () => {
    expect(analyzeFlightData({
      data: [
        { price: { grandTotal: 100 } },
        { price: { grandTotal: 10 } },
        { price: { grandTotal: 1000 } },
      ],
    })).toEqual({ avg: 370, median: 100 });
  });
  it('returns right values with no flight data', () => {
    expect(analyzeFlightData({
      data: [
        { price: { grandTotal: 123 } },
      ],
    })).toEqual({ avg: 123, median: 123 });
  });
});
