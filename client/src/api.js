import axios from 'axios';

const { CancelToken } = axios;
const search = (input) => {
  if (input) {
    try {
      const source = CancelToken.source();
      const request = axios.get(`/api/search/location?keyword=${input}`, {
        cancelToken: source.token,
      });
      return {
        async process(callback) {
          request.then((response) => {
            const json = response.data;
            if (json && json.data) {
              callback(
                json.data.map((item) => item),
              );
            }
          });
        },
        cancel() {
          source.cancel();
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

const findFlights = (params, callback) => {
  axios.post('/api/findFlights', { ...params, currencyCode: 'USD' }).then(
    (response) => callback(response),
  ).catch((error) => {
    console.log(error);
    console.log('handle errors here');
  });
};

export { search, findFlights };
