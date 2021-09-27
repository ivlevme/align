import { ImageType } from '../types';

export const serializeImagesForLocalStorage = (images: ImageType[]) => {
  return images.reduce((obj, item) => {
    return {
      ...obj,
      [item.id]: item.rotationAngle,
    };
  }, {});
};
