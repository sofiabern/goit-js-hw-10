import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Swal from 'sweetalert2';
const refs = {
  selectEl: document.querySelector('.breed-select'),
  loaderEl: document.querySelector('.loader'),
  errorEl: document.querySelector('.error'),
  catEl: document.querySelector('.cat-info'),
};
const slim = new SlimSelect({
  select: '.breed-select',
  settings: {
    placeholderText: 'Search for pretty cats!',
    showSearch: false,
    searchHighlight: true,
    showOptionTooltips: false,
    contentPosition: 'absolute',
  },
});
function createSelectMarkup(arr) {
  // Опції для SlimSelect
  return arr.map(({ id, name }) => ({ text: name, value: id }));
}
function createCatInfoMarkup(catObj) {
  refs.loaderEl.classList.replace('loader', 'loader-hidden');
  refs.catEl.classList.replace('cat-info-hidden', 'cat-info');
  return `<div>
            <h1>${catObj.name}</h1>
            <p>${catObj.description}</p>
            <p>Temperament: ${catObj.temperament}</p>
          </div>
          <div><img src="${catObj.url}" alt="${catObj.name}" width="400px" height="400px"></div>`;
}
fetchBreeds()
  .then(data => {
    slim.setData(createSelectMarkup(data)); // Встановлюємо опції для SlimSelect
  })
  .catch(error => {
    Swal.fire({
      title: 'Error!',
      text: 'Oops! Something went wrong! Try reloading the page!',
      icon: 'error',
    });
  });
