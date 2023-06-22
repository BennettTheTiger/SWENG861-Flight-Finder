/**
 * Gets date as YYYY-MM-DD
 * @returns {String}
 */
function getLocalDate() {
  const d = new Date();
  const month = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
  const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
  return `${d.getFullYear()}-${month}-${day}`;
}

/**
 * returns true if the date is today or in the future
 * @param {String} date YYYY-MM-DD
 * @returns {Boolean}
 */
function dateIsTodayOrFuture(date) {
  return new Date(getLocalDate()) <= new Date(date);
}

function convertMsToTime(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  seconds %= 60;
  minutes %= 60;

  return {
    hours,
    minutes,
    seconds,
  };
}

export {
  dateIsTodayOrFuture,
  getLocalDate,
  convertMsToTime,
};
