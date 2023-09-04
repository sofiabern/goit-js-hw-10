import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_Y6qNZkB4qAz1cD59ABnsakkQtB779qtC63Oq5U6Gc3lOaSewSaQIbLonLtUKHMuK';

const BASE_URL = 'https://api.thecatapi.com/v1';

export const fetchBreeds = function () {
  return axios.get(`${BASE_URL}/breeds`).then(response => {
    if (!response.data) {
      throw new Error(response.status);
    }
    return response.data;
  });
};

export const fetchCatByBreed = function (id) {
  let params = new URLSearchParams({
    breed_ids: id,
  });
  return axios.get(`${BASE_URL}/images/search?${params}`).then(response => {
    if (!response.data) {
      throw new Error(response.status);
    }
    return response.data[0];
  });
};
