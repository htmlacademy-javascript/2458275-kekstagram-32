import {createPhotosArray} from './create-photos-array.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const createPictureThumbnail = ({id, url, description, likes, comments}) => {
  const pictureThumbnail = pictureTemplate.cloneNode(true);
  const image = pictureThumbnail.querySelector('.picture__img');

  image.src = url;
  image.alt = description;
  pictureThumbnail.dataset.pictureId = id;
  pictureThumbnail.querySelector('.picture__likes').textContent = likes;
  pictureThumbnail.querySelector('.picture__comments').textContent = comments.length;

  return pictureThumbnail;
};

const userPictures = createPhotosArray();
const picturesFragment = document.createDocumentFragment();

const createThumbnails = () => {
  userPictures.forEach(({id, url, description, likes, comments}) => {
    picturesFragment.append(createPictureThumbnail({id, url, description, likes, comments}));
  });
  picturesContainer.append(picturesFragment);
};

export {picturesContainer, createThumbnails,userPictures};
