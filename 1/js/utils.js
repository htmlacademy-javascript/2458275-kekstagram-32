const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getUniqueRandomInteger = (min, max) => {
  const usedValues = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    if (usedValues.length >= max - min + 1) {
      return null;
    }
    while (usedValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    usedValues.push(currentValue);
    return currentValue;
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomInteger, getUniqueRandomInteger, getRandomArrayElement, isEscapeKey};
