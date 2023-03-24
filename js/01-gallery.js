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
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }
  const modalWindowImg = basicLightbox.create(`
      <img src="${event.target.dataset.source}" width="800" height="600">
  `);
  modalWindowImg.show(galleryListEl.addEventListener('click', closeOriginalImgByClick));
  function closeOriginalImgByClick() {
    modalWindowImg.close(galleryListEl.removeEventListener('keydown', closeOriginalImgByBtn));
  }

  // Закриття модального вікна після натискання клавіші Escape
  galleryListEl.addEventListener('keydown', closeOriginalImgByBtn);
  function closeOriginalImgByBtn(event) {
    if (event.code === 'Escape') {
      // console.log('Key');
      modalWindowImg.close(galleryListEl.removeEventListener('keydown', closeOriginalImgByBtn));
    }
  }
}
