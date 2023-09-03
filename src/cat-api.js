import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_Y6qNZkB4qAz1cD59ABnsakkQtB779qtC63Oq5U6Gc3lOaSewSaQIbLonLtUKHMuK';

export const fetchBreeds = function () {
  return axios.get('https://api.thecatapi.com/v1/breeds').then(response => {
    if (!response.data) {
      throw new Error(response.status);
    } else {
      return response.data;
    }
  });
};

export const fetchCatByBreed = function (id) {
  const params = new URLSearchParams({
    breed_ids: id,
  });
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${params}`)
    .then(response => {
      if (!response.data) {
        throw new Error(response.status);
      } else {
        return response.data[0];
      }
    });
};