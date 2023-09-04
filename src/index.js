import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
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
    showSearch: false,
    searchHighlight: true,
    showOptionTooltips: false,
    contentPosition: 'absolute',
  },
});
// Функція для створення HTML-коду для опцій селектора
function createSelectMarkup(arr) {
  return arr.map(({ id, name }) => ({ text: name, value: id }));
}
// Функція для створення HTML-коду для відображення інформації про котика
function createCatInfoMarkup(catObj) {
  refs.loaderEl.classList.add('visually-hidden');
  refs.catEl.classList.remove('visually-hidden');
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
    slim.setData(createSelectMarkup(data));
    refs.loaderEl.classList.add('visually-hidden'); // Приховуємо лоадер після завантаження селекту
    refs.selectEl.classList.remove('visually-hidden');
  })
  .catch(error => {
    Swal.fire({
      title: 'Error!',
      text: 'Oops! Something went wrong! Try reloading the page!',
      icon: 'error',
    }).finally(() => {
      refs.loaderEl.classList.add('visually-hidden');
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
    refs.catEl.classList.add('visually-hidden');
    refs.loaderEl.classList.remove('visually-hidden');
    fetchCatByBreed(catId)
      .then(data => {
        refs.catEl.innerHTML = createCatInfoMarkup(data);
      })
      .catch(error => {
        Swal.fire({
          title: 'Error!',
          text: 'Oops! Something went wrong! Try reloading the page!',
          icon: 'error',
        }).finally(() => {
          refs.loaderEl.classList.add('visually-hidden');
        });
      });
  }
}
// спроба н2
