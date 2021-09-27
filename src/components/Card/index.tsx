import React, { CSSProperties } from 'react';

import { changeRotation } from '../../features/imagesSlice';
import { useAppDispatch } from '../../hooks';
import { ImageType } from '../../types';

type CardProps = {
  image: ImageType;
};

const Card = React.memo(({ image }: CardProps) => {
  const dispatch = useAppDispatch();

  const rotateImageHandler = () => {
    dispatch(changeRotation(image));
  };

  const getCardClasses = () => {
    const starClass = image.hasStar ? 'card--has-star' : '';
    return `card ${starClass}`;
  };

  const getImageStyles = (): CSSProperties => {
    return {
      transform: `rotate(${image.rotationAngle}deg)`,
    };
  };

  return (
    <div className={getCardClasses()}>
      <div className="img__container">
        <img
          className="card__img"
          style={getImageStyles()}
          src={image.url}
          alt="Card"
        />
      </div>
      <div className="card__content">
        <div className="card__info">
          <span className="card__header">Picture</span>
          <span className="card__description">Description</span>
        </div>
        <button onClick={rotateImageHandler} className="card__rotate-btn">
          <span className="visually-hidden">Rotate 90 deg</span>
        </button>
      </div>
    </div>
  );
});

export default Card;
