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
  return `<div class="cat-box">
            <h1>${catObj.breeds[0].name}</h1>
            <p>${catObj.breeds[0].description}</p>
            <p>Temperament: ${catObj.breeds[0].temperament}</p>
          </div>
          <div><img src="${catObj.url}" alt="${catObj.breeds[0].name}" width="800px"></div>`;
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

refs.selectEl.addEventListener('change', showCatHandler);

function showCatHandler(evt) {
  const catId = refs.selectEl.value;
  if (catId) {
    fetchCatByBreed(catId)
      .then(data => {
        refs.catEl.innerHTML = createCatInfoMarkup(data);
      })
      .catch(error => {
        Swal.fire({
          title: 'Error!',
          text: 'Oops! Something went wrong! Try reloading the page!',
          icon: 'error',
        });
      });
  }
  //   refs.loaderEl.classList.replace('loader-hidden', 'loader');
  //   refs.catEl.classList.replace('cat-info', 'cat-info-hidden');
}

showCatHandler();
