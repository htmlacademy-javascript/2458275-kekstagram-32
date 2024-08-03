import {createThumbnails, userPictures} from './create-thumbnails.js';
import {showBigPictureInfo} from './open-fullsize-photos.js';
import './photo-upload-form.js';


createThumbnails(userPictures);
showBigPictureInfo(userPictures);

