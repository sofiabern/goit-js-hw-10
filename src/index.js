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
    showSearch: false,
    searchPlaceholder: 'Search for pretty cats!',
    searchHighlight: true,
    showOptionTooltips: true,
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
refs.selectEl.addEventListener('change', selectBreedHandler);
function selectBreedHandler(evt) {
  const selectedOptions = slim.data.selected();
  if (selectedOptions && selectedOptions.length > 0) {
    const selectedCatId = selectedOptions[0].value;
    fetchCatByBreed(selectedCatId)
      .then(data => (refs.catEl.innerHTML = createCatInfoMarkup(data)))
      .catch(error => {
        Swal.fire({
          title: 'Error!',
          text: 'Oops! Something went wrong! Try reloading the page!',
          icon: 'error',
        });
      });
  }
  refs.loaderEl.classList.replace('loader-hidden', 'loader');
  refs.catEl.classList.replace('cat-info', 'cat-info-hidden');
}
