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

// Створення об'єкта SlimSelect
const slim = new SlimSelect({
  select: '.breed-select',
  settings: {
    // placeholderText: 'Search for pretty cats!',
    showSearch: false,
    searchHighlight: true,
    showOptionTooltips: false,
    contentPosition: 'absolute',
  },
});
slim.selectEl.classList.add('breed-select-hidden');
refs.selectEl.classList.replace('breed-select', 'breed-select-hidden');
// Функція для створення HTML-коду для опцій селектора
function createSelectMarkup(arr) {
  return arr.map(({ id, name }) => ({ text: name, value: id }));
}
// Функція для створення HTML-коду для відображення інформації про котика
function createCatInfoMarkup(catObj) {
  refs.loaderEl.classList.replace('loader', 'loader-hidden');

  refs.catEl.classList.replace('cat-info-hidden', 'cat-info');
  return `<div class="cat-box">
            <h1>${catObj.breeds[0].name}</h1>
            <p>${catObj.breeds[0].description}</p>
            <p>Temperament: ${catObj.breeds[0].temperament}</p>
          </div>
          <div><img src="${catObj.url}" alt="${catObj.breeds[0].name}" width="650px"></div>`;
}
let isFirstLoad = true; // ЗМІННА для першого завантаження сторінки

// Завантаження списку порід при завантаженні сторінки
fetchBreeds()
  .then(data => {
    refs.loaderEl.classList.replace('loader-hidden', 'loader');

    slim.setData(createSelectMarkup(data));
    refs.selectEl.classList.replace('breed-select-hidden', 'breed-select');
    slim.selectEl.classList.remove('breed-select-hidden');
    refs.loaderEl.classList.replace('loader', 'loader-hidden');
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
    if (isFirstLoad) {
      isFirstLoad = false;
      return;
    }
    refs.catEl.classList.replace('cat-info', 'cat-info-hidden');
    refs.loaderEl.classList.replace('loader-hidden', 'loader');
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
}
