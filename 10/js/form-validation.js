const MAX_HASHTAGS_AMOUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_DESCRIPTION_LENGTH = 140;
const VALID_HASHTAG_SYMBOLS = /[a-zа-яё0-9#]{1,19}$/i;

let errorMessage = '';
const generateErrorMessage = () => errorMessage;

const isDescriptionValid = (value) => value.length <= MAX_DESCRIPTION_LENGTH;

const isHashtagValid = (value) => {
  const hashtagText = value.toLowerCase().trim();

  if (hashtagText.length === 0) {
    return true;
  }

  const hashtagsArray = hashtagText.split(/\s+/);

  const rules = [
    {
      check: hashtagsArray.every((item) => item[0] !== '#'),
      error:  'Хэштег должен начинаться с символа # (решётка)',
    },

    {
      check: hashtagsArray.every((item) => !VALID_HASHTAG_SYMBOLS.test(item)),
      error: 'Пробелы, спецсимволы, символы пунктуации, эмодзи недопустимы. Хэштег должен состоять только из букв и чисел',
    },

    {
      check: hashtagsArray.every((item) => item === '#'),
      error: 'Хэштег не может состоять только из одной решётки',
    },

    {
      check: hashtagsArray.every((item) => item.length > MAX_HASHTAG_LENGTH),
      error: `Максимальная длина одного хэштега ${MAX_HASHTAG_LENGTH} символов, включая решётку`,
    },

    {
      check: hashtagsArray.every((item) => item.slice(1).includes('#')),
      error: 'Хэштеги разделяются пробелами',
    },

    {
      check: hashtagsArray.length !== new Set(hashtagsArray).size,
      error: 'Хэштеги не должны повторяться',
    },
    {
      check: hashtagsArray.length > MAX_HASHTAGS_AMOUNT,
      error: `Нельзя указать больше ${MAX_HASHTAGS_AMOUNT} хэштегов`,
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

export {isDescriptionValid, MAX_DESCRIPTION_LENGTH, isHashtagValid, generateErrorMessage};
