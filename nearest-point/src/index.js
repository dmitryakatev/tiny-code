import { getRectByX } from './rect/byX';
import { getRectByY } from './rect/byY';
import { getRectByFormula } from './rect/byFormula';

const defaults = {
  gap: 5,
  weight: 5,
  rects: false,
  clientRects: false,
};

function getRect(point1, point2, point, settings) {
  if (point1.x === point2.x) {
    return getRectByY(point1, point2, point, settings);
  }

  if (point1.y === point2.y) {
    return getRectByX(point1, point2, point, settings);
  }

  return getRectByFormula(point1, point2, point, settings);
}

function getRects(points, point, settings) {
  const rects = [];

  const ln = points.length;
  for (let i = 1; i < ln; ++i) {
    rects.push(getRect(points[i - 1], points[i], point, settings));
  }

  return rects;
}

export function calculate(points, point, settings) {
  settings = Object.assign({}, defaults, settings);

  const rects = getRects(points, point, settings);
  const inside = [];
  const ln = rects.length;

  let distance = Infinity;
  let nearestPoint = null;
  let nearestIndex = null;

  for (let i = 0; i < ln; ++i) {
    const rect = rects[i];

    if (rect.inside) {
      inside.push(rect);

      if (rect.distance < distance) {
        distance = rect.distance;
        nearestPoint = rect.nearest;
      }
    }
  }

  if (nearestPoint !== null) {
    nearestIndex = points.indexOf(nearestPoint);
  }

  return {
    rects, // array of rectangles
    inside, // point inside rectangles
    nearest: { // nearest point
      index: nearestIndex,
      point: nearestPoint,
    },
  }
}
