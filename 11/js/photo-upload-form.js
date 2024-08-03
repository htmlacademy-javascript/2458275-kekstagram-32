import {body} from './open-fullsize-photos.js';
import {isEscapeKey} from './utils.js';
import {isDescriptionValid, MAX_DESCRIPTION_LENGTH, isHashtagValid, generateErrorMessage} from './form-validation.js';
import {clearEffectPreview} from './effects-slider.js';
import {clearScaleControl} from './photo-scale-control.js';

const uploadForm = document.querySelector('.img-upload__form');

const photoUploadControl = uploadForm.querySelector('.img-upload__input');
const photoEditorForm = uploadForm.querySelector ('.img-upload__overlay');
const uploadFormClosingElement = uploadForm.querySelector('.img-upload__cancel');
const hashtagsField = uploadForm.querySelector('.text__hashtags');
const descriptionField = uploadForm.querySelector('.text__description');

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault ();
    if (document.activeElement === hashtagsField || document.activeElement === descriptionField) {
      evt.stopPropagation();
    } else {
      closePhotoEditor();
    }
  }
};

const onUploadFormClosingClick = () => closePhotoEditor();

function closePhotoEditor () {
  photoEditorForm.classList.add('hidden');
  body.classList.remove('modal-open');

  photoUploadControl.value = '';
  hashtagsField.value = '';
  descriptionField.value = '';

  uploadForm.reset();
  clearEffectPreview();
  clearScaleControl();

  document.removeEventListener('keydown', onEscKeydown);
  uploadFormClosingElement.removeEventListener('click', onUploadFormClosingClick);
}

const onUploadFormClick = () => {
  photoEditorForm.classList.remove('hidden');
  body.classList.add('modal-open');
  uploadFormClosingElement.addEventListener('click', onUploadFormClosingClick);
  document.addEventListener('keydown', onEscKeydown);
};

const openUploadForm = () => {
  photoUploadControl.addEventListener('change', onUploadFormClick);
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
});

pristine.addValidator(descriptionField, isDescriptionValid, `Длина комментария не должна превышать ${MAX_DESCRIPTION_LENGTH } симоволов`,);
pristine.addValidator(hashtagsField, isHashtagValid, generateErrorMessage);

uploadForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
  }
});

openUploadForm();

export {openUploadForm, hashtagsField, descriptionField};
