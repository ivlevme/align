import React, { useEffect } from 'react';
import { Card } from './components';
import { fetchImages } from './features/imagesSlice';
import Skeleton from 'react-loading-skeleton';
import { LoadingState } from './constants';
import { useAppDispatch, useAppSelector } from './hooks';

function App() {
  const { images, loading } = useAppSelector((state) => state.images);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  const renderCards = () => {
    switch (loading) {
      case LoadingState.Loading:
        const skeletonStyles = { borderRadius: '24px 0 24px 24px' };

        return Array.from({ length: 6 }).map((_, idx) => (
          <Skeleton style={skeletonStyles} key={idx} height={252} width={240} />
        ));

      case LoadingState.Failed:
        return <div>The cards could not be loaded</div>;

      case LoadingState.Success:
        if (!images.length) {
          return <div>There are no cards</div>;
        }

        return images.map((image) => {
          return <Card key={image.id} image={image} />;
        });
    }
  };

  return (
    <div className="App">
      <div className="cards">{renderCards()}</div>
    </div>
  );
}

export default App;
