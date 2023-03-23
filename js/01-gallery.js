import { galleryItems } from './gallery-items.js';
// Change code below this line
// console.log(galleryItems);

// Створення і рендер розмітки на підставі масиву даних galleryItems
const galleryListEl = document.querySelector('.gallery');
galleryListEl.insertAdjacentHTML('beforeend', createGalleryItem(galleryItems));

function createGalleryItem(galleryItems) {
  return galleryItems
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
      <a class="gallery__link" href="${original}">
      <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}">
      </a>
      </li>`,
    )
    .join('');
}

// Отримання url великого зображення та відкриття модального вікна по кліку на елементі галереї
galleryListEl.addEventListener('click', onClick);

function onClick(event) {
  event.preventDefault();

  const modalWindowImg = basicLightbox.create(`
      <img src="${event.target.dataset.source}" width="800" height="600">
  `);
  modalWindowImg.show();

  // Закриття модального вікна після натискання клавіші Escape
  galleryListEl.addEventListener('keydown', closeOriginalImg);
  function closeOriginalImg(event) {
    if (event.code === 'Escape') {
      modalWindowImg.close();
    }
  }
}
