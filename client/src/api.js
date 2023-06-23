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
  (response) => response.data,
).catch((error) => {
  console.log(error);
});

const checkFlightDeal = (params) => axios.post('/api/checkFlightDeal', { ...params, currencyCode: 'USD' }).then(
  (response) => response.data,
).catch((error) => {
  console.log(error);
});

export { search, findFlights, checkFlightDeal };
