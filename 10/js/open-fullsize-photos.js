import {isEscapeKey} from './utils.js';
import {picturesContainer} from './create-thumbnails.js';
import {removeComments, showComments} from './show-comments.js';

const body = document.body;
const bigPicture = document.querySelector('.big-picture');
const bigPictureClosingElement = bigPicture.querySelector('.big-picture__cancel');

const onEscKeydown = (evt) => {
  evt.preventDefault();
  if (isEscapeKey(evt)) {
    closeBigPicture();
  }
};

const onPictureClosingClick = () => closeBigPicture();

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
  document.removeEventListener('click', onPictureClosingClick);
  removeComments ();
}

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onEscKeydown);
  bigPictureClosingElement.addEventListener('click', onPictureClosingClick);
};

const onThumbnailClick = (array) => (evt) => {
  const currentPictureThumbnail = evt.target.closest('.picture');

  if (evt.target.className !== 'picture__img') {
    return;
  }
  const pictureId = currentPictureThumbnail.dataset.pictureId;
  const currentPicture = array.find((item) => item.id === Number(pictureId));

  bigPicture.querySelector('.big-picture__img img').src = currentPicture.url;
  bigPicture.querySelector('.likes-count').textContent = currentPicture.likes;
  bigPicture.querySelector('.social__comment-shown-count').textContent = currentPicture.comments.length;
  bigPicture.querySelector('.social__comment-total-count').textContent = currentPicture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = currentPicture.description;

  showComments(currentPicture.comments);
  openBigPicture();

};

const showBigPictureInfo = (array) => {
  picturesContainer.addEventListener ('click', onThumbnailClick(array));
};

export {showBigPictureInfo, body};
