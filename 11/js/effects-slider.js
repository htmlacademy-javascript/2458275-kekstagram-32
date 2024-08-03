const effectSliderContainer = document.querySelector('.img-upload__effect-level');
const effectSlider = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const effectPreview = document.querySelector('.effects__list');
const picturePreview = document.querySelector('.img-upload__preview');

const SLIDER_DEFAULT_VALUES = {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
};

const SLIDER_EFFECTS_VALUES = {
  none: {},
  chrome: {
    range: { min: 0, max: 1},
    start: 1,
    step: 0.1
  },
  sepia: {
    range: { min: 0, max: 1},
    start: 1,
    step: 0.1
  },
  marvin: {
    range: { min: 0, max: 100},
    start: 100,
    step: 1
  },
  phobos: {
    range: { min: 0, max: 3},
    start: 3,
    step: 0.1
  },
  heat: {
    range: { min: 1, max: 3},
    start: 3,
    step: 0.1
  }
};

effectSlider.classList.add('hidden');
effectSliderContainer.classList.add('hidden');

noUiSlider.create(effectSlider, SLIDER_DEFAULT_VALUES);

const onEffectPreviewClick = (evt) => {
  const effect = evt.target.value;
  const chosenEffect = SLIDER_EFFECTS_VALUES[effect];

  effectSlider.noUiSlider.on('update', () => {
    effectValue.value = effectSlider.noUiSlider.get();
    const filterValues = {
      none: 'none',
      chrome: `grayscale(${effectValue.value})`,
      sepia: `sepia(${effectValue.value})`,
      marvin: `invert(${effectValue.value}%)`,
      phobos: `blur(${effectValue.value}px)`,
      heat: `brightness(${effectValue.value})`,
    };
    if (effect === 'none') {
      picturePreview.style.filter = 'none';
      effectSlider.classList.add('hidden');
      effectSliderContainer.classList.add('hidden');
    } else {
      effectSlider.classList.remove('hidden');
      effectSliderContainer.classList.remove('hidden');
      picturePreview.style.filter = (filterValues[effect]);
    }
  });
  effectSlider.noUiSlider.updateOptions(chosenEffect);
};
const clearEffectPreview = () => {
  picturePreview.style.filter = 'none';
  effectSlider.classList.add('hidden');
  effectSliderContainer.classList.add('hidden');
};
effectPreview.addEventListener('change', onEffectPreviewClick);


export {clearEffectPreview};
