import { PositionDegree } from '../constants';

export const initStatusStar = () => {
  return Math.random() * 1 >= 0.5 ? true : false;
};

export const calcRotationAngle = (currentRotationAngle: number) => {
  return currentRotationAngle + PositionDegree.Angle;
};
