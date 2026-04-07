import { renderComments, loadMoreComments, resetCommentsCount, COMMENT_STEP } from './comments.js';

const bigPictureContainer = document.querySelector('.big-picture');
const pictureCancel = document.querySelector('.big-picture__cancel');
const bigPicture = document.querySelector('.big-picture__img img');
const totalComments = document.querySelector('.social__comment-total-count');
const likesCount = document.querySelector('.likes-count');
const socialCaption = document.querySelector('.social__caption');
const body = document.body;
const commentsLoader = document.querySelector('.comments-loader');

let currentPhotoComments = [];

const closeBigPicture = () => {
  bigPictureContainer.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoader.removeEventListener('click', onLoadMoreClick);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

const onLoadMoreClick = () => {
  loadMoreComments(currentPhotoComments);
};

const openBigPicture = (photoData) => {
  currentPhotoComments = photoData.comments;

  bigPictureContainer.classList.remove('hidden');
  body.classList.add('modal-open');

  bigPicture.src = photoData.url;
  bigPicture.alt = photoData.description;

  likesCount.textContent = photoData.likes;
  socialCaption.textContent = photoData.description;
  totalComments.textContent = photoData.comments.length;

  resetCommentsCount();
  renderComments(photoData.comments);

  commentsLoader.removeEventListener('click', onLoadMoreClick);
  commentsLoader.addEventListener('click', onLoadMoreClick);
};

const initBigPicture = () => {
  document.addEventListener('keydown', onDocumentKeydown);
  pictureCancel.addEventListener('click', closeBigPicture);
};

export { openBigPicture, initBigPicture };
