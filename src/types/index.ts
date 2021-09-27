export type ImageBackendType = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

export type ImageType = {
  id: string;
  url: string;
  hasStar: boolean;
  rotationAngle: number;
};

export type ImageLocalStorageStageType = {
  [id: string]: number;
};
