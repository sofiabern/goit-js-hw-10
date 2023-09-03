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
  slim.selectEl.classList.replace('breed-select-hidden', 'breed-select');
  refs.loaderEl.classList.replace('loader', 'loader-hiden');
  return arr
    .map(({ id, name }) => ` <option value="${id}">${name}</option>`)
    .join('');
}

function createCatInfoMarkup(catObj) {
  refs.loaderEl.classList.replace('loader', 'loader-hiden');
  refs.catEl.classList.replace('cat-info-hiden', 'cat-info');
  return `<div>
            <h1>${catObj.name}</h1>
            <p>${catObj.description}</p>
            <p>Temperament: ${catObj.temperament}</p>
          </div>
          <div><img src="${catObj.url}" alt="${catObj.name}" width="400px" height="400px"></div>`;
}

fetchBreeds()
  .then(data => {
    slim.selectEl.innerHTML = createSelectMarkup(data);
  })
  .catch(error => {
    Swal.fire({
      title: 'Error!',
      text: 'Oops! Something went wrong! Try reloading the page!',
      icon: 'error',
      // confirmButtonText: 'Cool',
    });
    refs.loaderEl.classList.replace('loader', 'loader-hiden');
  });

slim.selectEl.addEventListener('change', selectBreedHandler);

function selectBreedHandler(evt) {
  evt.preventDefault();
  let cat = slim.selected();
  fetchCatByBreed(cat)
    .then(
      data => (refs.catEl.innerHTML = createCatInfoMarkup(data)),
      console.log(slim.selectEl.value)
    )
    .catch(error => {
      Swal.fire({
        title: 'Error!',
        text: 'Oops! Something went wrong! Try reloading the page!',
        icon: 'error',
        // confirmButtonText: 'Cool',
      });
    });
  refs.loaderEl.classList.replace('loader-hiden', 'loader');
  refs.catEl.classList.replace('cat-info', 'cat-info-hiden');
}
