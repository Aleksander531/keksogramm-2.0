const COMMENT_STEP = 5;
const socialComments = document.querySelector('.social__comments');
const shownCountElement = document.querySelector('.social__comment-shown-count');
const totalCountElement = document.querySelector('.social__comment-total-count');
const commentsLoader = document.querySelector('.comments-loader');

let currentCommentsCount = COMMENT_STEP;

const createCommentElement = (commentObject) => {
  const newCommentsElement = document.createElement('li');
  newCommentsElement.classList.add('social__comment');

  const newCommentsImg = document.createElement('img');
  newCommentsImg.classList.add('social__picture');
  newCommentsImg.src = commentObject.avatar;
  newCommentsImg.alt = commentObject.name;
  newCommentsImg.width = 35;
  newCommentsImg.height = 35;

  const newCommentsParagraph = document.createElement('p');
  newCommentsParagraph.classList.add('social__text');
  newCommentsParagraph.textContent = commentObject.message;

  newCommentsElement.append(newCommentsImg);
  newCommentsElement.append(newCommentsParagraph);

  return newCommentsElement;
};

const renderComments = (comments) => {
  const totalComments = comments.length;
  totalCountElement.textContent = totalComments;

  if (totalComments > currentCommentsCount) {
    shownCountElement.textContent = currentCommentsCount;
    commentsLoader.classList.remove('hidden');
  } else {
    shownCountElement.textContent = totalComments;
    commentsLoader.classList.add('hidden');
  }

  socialComments.innerHTML = '';

  const commentsToShow = comments.slice(0, currentCommentsCount);
  commentsToShow.forEach((comment) => {
    socialComments.appendChild(createCommentElement(comment));
  });
};

const loadMoreComments = (comments) => {
  const totalComments = comments.length;

  currentCommentsCount += COMMENT_STEP;

  if (currentCommentsCount > totalComments) {
    currentCommentsCount = totalComments;
  }

  shownCountElement.textContent = currentCommentsCount;

  const commentsToAdd = comments.slice(0, currentCommentsCount);
  socialComments.innerHTML = '';
  commentsToAdd.forEach((comment) => {
    socialComments.appendChild(createCommentElement(comment));
  });

  if (currentCommentsCount === totalComments) {
    commentsLoader.classList.add('hidden');
  }
};

const resetCommentsCount = () => {
  currentCommentsCount = COMMENT_STEP;
};

export { createCommentElement, renderComments, loadMoreComments, resetCommentsCount, COMMENT_STEP };
