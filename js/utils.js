import { DESCRIPTIONS, MESSAGES, NAMES } from './temporary-data.js';

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getSequenceId = () => {
  let lastGeneratedId = 0;

  return function () {
    return lastGeneratedId += 1;
  };
};

const createUniqueId = (min, max) => {
  const usedIds = [];

  return function () {
    let currentRandomNumber = getRandomNumber(min, max);

    if (usedIds.length >= (max - min + 1)) {
      return null;
    }

    while (usedIds.includes(currentRandomNumber)) {
      currentRandomNumber = getRandomNumber(min, max);
    }

    usedIds.push(currentRandomNumber);
    return currentRandomNumber;
  };
};

const generateId = getSequenceId();
const UniqueId = createUniqueId(1, 2000);

const createMessage = () => {
  const count = getRandomNumber(1, 2);
  const firstMessage = MESSAGES[getRandomNumber(0, MESSAGES.length - 1)];

  if (count === 1) {
    return firstMessage;
  }

  let secondMessage = MESSAGES[getRandomNumber(0, MESSAGES.length - 1)];

  while (secondMessage === firstMessage) {
    secondMessage = MESSAGES[getRandomNumber(0, MESSAGES.length - 1)];
  }

  return `${firstMessage} ${secondMessage}`;
};

const createObjectComment = () => ({
  id: UniqueId(),
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  message: createMessage(),
  name: NAMES[getRandomNumber(0, NAMES.length - 1)]
});

const createPhotoDescription = () => {
  const id = generateId();

  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length - 1)],
    likes: getRandomNumber(15, 200),
    comments: Array.from({ length: getRandomNumber(0, 30) }, createObjectComment)};
};

export { createPhotoDescription };
