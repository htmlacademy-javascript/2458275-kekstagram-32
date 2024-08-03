const checkLength = (string = '', maxLength = 1) => string.length <= maxLength;
checkLength('проверяемая строка', 20); // true
checkLength('проверяемая строка', 18); // true
checkLength('проверяемая строка', 10); // false


const checkLine = (line = '') => {
  line = line.replaceAll(' ','').toUpperCase();
  let reversedLine = '';

  for (let i = line.length - 1; i >= 0; i--) {
    reversedLine += line[i];
  }
  return line === reversedLine;
};
checkLine('топот'); // true
checkLine('ДовОд'); // true
checkLine('Кекс'); //false
checkLine('Лёша на полке клопа нашёл ');// true
