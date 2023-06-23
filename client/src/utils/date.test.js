import {
  dateIsTodayOrFuture,
  getLocalDate,
  convertMsToTime,
} from './date';

describe('date.js', () => {
  it('works ok for dateIsTodayOrFuture', () => {
    expect(dateIsTodayOrFuture(Date.now())).toEqual(true);
    expect(dateIsTodayOrFuture(Date.now() - 864000000)).toEqual(false);
  });

  it('works ok for getLocalDate', () => {
    const d = new Date();
    const month = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
    const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    const dateString = `${d.getFullYear()}-${month}-${day}`;

    expect(getLocalDate()).toEqual(dateString);
  });

  it('works ok for convertMsToTime', () => {
    expect(convertMsToTime(60000)).toEqual({ hours: 0, minutes: 1, seconds: 0 });
    expect(convertMsToTime(61000)).toEqual({ hours: 0, minutes: 1, seconds: 1 });
    expect(convertMsToTime(123456789)).toEqual({ hours: 34, minutes: 17, seconds: 36 });
  });
});
