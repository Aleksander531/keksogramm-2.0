import { photos } from './data.js';
import { openBigPicture } from './big-picture.js';

export const renderPhotos = (photosArray) => {
  const templatePictureElement = document.querySelector('#picture').content;
  const templateLinkElement = templatePictureElement.querySelector('.picture');

  const containerImg = document.querySelector('.pictures');

  const fragment = document.createDocumentFragment();

  photosArray.forEach((photo) => {
    const clone = templateLinkElement.cloneNode(true);
    const img = clone.querySelector('.picture img');
    img.src = photo.url;
    img.alt = photo.description;

    const likes = clone.querySelector('.picture__likes');
    likes.textContent = photo.likes;

    const comments = clone.querySelector('.picture__comments');
    comments.textContent = photo.comments.length;

    fragment.appendChild(clone);
  });

  containerImg.appendChild(fragment);
  const thumbnails = document.querySelectorAll('.picture');

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture(photos[index]);
    });
  });
};


