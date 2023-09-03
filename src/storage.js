// refs.selectEl.addEventListener('change', selectBreedHandler);
// function selectBreedHandler(evt) {
//   const selectedOptions = slim.data.selected();
//   if (selectedOptions && selectedOptions.length > 0) {
//     const selectedCatId = selectedOptions[0].value;
//     fetchCatByBreed(selectedCatId)
//       .then(data => (refs.catEl.innerHTML = createCatInfoMarkup(data)))
//       .catch(error => {
//         Swal.fire({
//           title: 'Error!',
//           text: 'Oops! Something went wrong! Try reloading the page!',
//           icon: 'error',
//         });
//       });
//   }
//   refs.loaderEl.classList.replace('loader-hidden', 'loader');
//   refs.catEl.classList.replace('cat-info', 'cat-info-hidden');
// }
