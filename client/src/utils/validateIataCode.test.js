import validateIataCode from './validateIataCode';

describe('validateIataCode', () => {
  it('returns false when code is not 3', () => {
    expect(validateIataCode('no')).toEqual(false);
    expect(validateIataCode('no way')).toEqual(false);
  });
  it('returns false when code is lowercase', () => {
    expect(validateIataCode('yes')).toEqual(false);
  });
  it('returns true when code is lowercase', () => {
    expect(validateIataCode('YES')).toEqual(true);
  });
});
