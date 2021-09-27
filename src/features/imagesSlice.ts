import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMAGE_URL, LoadingState, PositionDegree } from '../constants';
import { ImageBackendType, ImageType } from '../types';
import {
  getLocalStorageImagesState,
  saveLocalStorageImages,
} from '../helpers/localstorage';
import { calcRotationAngle, initStatusStar } from '../helpers/imagesAttributes';

type ImagesState = {
  images: ImageType[];
  loading: LoadingState;
};

const initialState: ImagesState = {
  images: [],
  loading: LoadingState.Loading,
};

const NAME_SLICE = 'images';

export const fetchImages = createAsyncThunk(
  `${NAME_SLICE}/fetchImages`,
  async () => {
    const response = await fetch(IMAGE_URL);
    return await response.json();
  }
);

export const imagesSlice = createSlice({
  name: NAME_SLICE,
  initialState,
  reducers: {
    changeRotation: (state, action: PayloadAction<ImageType>) => {
      state.images = state.images.map((image): ImageType => {
        if (image.id !== action.payload.id) {
          return image;
        }

        return {
          ...image,
          rotationAngle: calcRotationAngle(action.payload.rotationAngle),
        };
      });

      saveLocalStorageImages(state.images);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchImages.pending, (state) => {
      state.loading = LoadingState.Loading;
    });

    builder.addCase(
      fetchImages.fulfilled,
      (state, action: PayloadAction<ImageBackendType[]>) => {
        const imagesLocalStorageState = getLocalStorageImagesState();

        state.images = action.payload.map(
          (image): ImageType => ({
            id: image.id,
            url: image.download_url,
            hasStar: initStatusStar(),
            rotationAngle:
              imagesLocalStorageState[image.id] || PositionDegree.Init,
          })
        );
        state.loading = LoadingState.Success;
      }
    );

    builder.addCase(fetchImages.rejected, (state, action) => {
      state.loading = LoadingState.Failed;
    });
  },
});

export const { changeRotation } = imagesSlice.actions;
export default imagesSlice.reducer;
