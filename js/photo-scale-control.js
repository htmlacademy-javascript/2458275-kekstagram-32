const SCALE_STEP = 0.25;
const MAX_SCALE = 1;

const zoomInBtn = document.querySelector('.scale__control--bigger');
const zoomOutBtn = document.querySelector('.scale__control--smaller');
const previewImage = document.querySelector('.img-upload__preview img');
const scaleControl = document.querySelector('.scale__control--value');

let currentScale = 1;

const onZoomOutBtnClick = () => {
  if (currentScale > SCALE_STEP) {
    currentScale -= SCALE_STEP;
    previewImage.style.transform = `scale(${currentScale})`;
    scaleControl.value = `${currentScale * 100}%`;
  }
};
const onZoomInBtnClick = () => {
  if (currentScale < MAX_SCALE) {
    currentScale += SCALE_STEP;
    previewImage.style.transform = `scale(${currentScale})`;
    scaleControl.value = `${currentScale * 100}%`;
  }
};
const clearScaleControl = () => {
  previewImage.style.transform = `scale(${MAX_SCALE})`;
  scaleControl.value = `${MAX_SCALE * 100}%`;
};
zoomInBtn.addEventListener('click', onZoomInBtnClick);
zoomOutBtn.addEventListener('click', onZoomOutBtnClick);

export {clearScaleControl};
