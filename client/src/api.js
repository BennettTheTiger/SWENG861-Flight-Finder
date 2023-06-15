import axios from 'axios';

const search = (input) => {
  if (input) {
    try {
      const controller = new AbortController();
      return {
        async process(callback) {
          axios.get(`/api/search/location?keyword=${input}`, {
            signal: controller.signal,
          }).then((response) => {
            console.log(response);
            callback(response.data);
          });
        },
        cancel() {
          controller.abort();
        },
      };
    } catch (error) {
      console.error(error);
    }
  }
  return {
    process() {
      return [];
    },
    cancel() {},
  };
};

const findFlights = (params) => axios.post('/api/findFlights', { ...params, currencyCode: 'USD' }).then(
  (response) => response,
).catch((error) => {
  console.log(error);
  console.log('handle errors here');
});

const checkFlightDeal = (params) => axios.post('/api/checkFlightDeal', { ...params, currencyCode: 'USD' }).then(
  (response) => response,
).catch((error) => {
  console.log(error);
  console.log('handle errors here');
});

export { search, findFlights, checkFlightDeal };
