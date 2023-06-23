import useWordCasing from './wordCase';

describe('wordCase', () => {
  it('returns the proper sentence ', () => {
    const expected = 'Yes This Should Be Fixed';
    expect(useWordCasing('YES THIS SHOULD BE FIXED')).toEqual(expected);
  });
});
