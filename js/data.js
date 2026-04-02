import { createPhotoDescription } from './utils.js';
import { MAX_ID } from './temporary-data.js';

const photos = Array.from({length: MAX_ID}, createPhotoDescription);

export {photos};
