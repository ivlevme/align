import { ImageLocalStorageStageType, ImageType } from '../types';
import { IMAGES_LOCAL_STORAGE_KEY } from '../constants';
import { serializeImagesForLocalStorage } from './adapter';

export const saveLocalStorageImages = (images: ImageType[]) => {
  const serializedImages = serializeImagesForLocalStorage(images);

  localStorage.setItem(
    IMAGES_LOCAL_STORAGE_KEY,
    JSON.stringify(serializedImages)
  );
};

export const getLocalStorageImagesState = (): ImageLocalStorageStageType => {
  const imagesFromLocalStorage = localStorage.getItem(IMAGES_LOCAL_STORAGE_KEY);

  if (imagesFromLocalStorage === null) {
    return {};
  }

  return JSON.parse(imagesFromLocalStorage);
};
