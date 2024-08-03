const bigPicture = document.querySelector('.big-picture');
const commentsContainer = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('.social__comment');
const shownComments = bigPicture.querySelector('.social__comment-shown-count');
const totalComments = bigPicture.querySelector('.social__comment-total-count');
const commentsLoader = bigPicture.querySelector('.social__comments-loader');


const COUNT_STEP = 5;
let currentCount = 0;
let comments = [];

const showMoreComments = () => {
  const commentsFragment = document.createDocumentFragment();
  const visibleComments = comments.slice(currentCount, currentCount + COUNT_STEP);
  const visibleCommentsLength = visibleComments.length + currentCount;

  visibleComments.forEach((comment) => {
    const commentSample = commentTemplate.cloneNode(true);
    const author = commentSample.querySelector('.social__picture');
    author.src = comment.avatar;
    author.name = comment.name;
    commentSample.querySelector('.social__text').textContent = comment.message;
    commentsFragment.append(commentSample);
  });

  commentsContainer.append(commentsFragment);

  shownComments.textContent = `${visibleCommentsLength} из `;
  totalComments.textContent = comments.length;

  if (visibleCommentsLength >= comments.length) {
    commentsLoader.classList.add('hidden');
  }
  currentCount += COUNT_STEP;
};

const onCommentsLoaderClick = () => {
  showMoreComments();
};

const removeComments = () => {
  currentCount = 0;
  commentsContainer.innerHTML = '';
  commentsLoader.classList.remove('hidden');
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
};

const showComments = (currentPictureComments) => {
  commentsContainer.innerHTML = '';
  comments = currentPictureComments;
  showMoreComments();
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

export {removeComments, showComments};
