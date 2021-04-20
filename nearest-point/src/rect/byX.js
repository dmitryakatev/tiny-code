import { findPointByX } from './../distance/byX';
import { calcDistance } from './../utils/distance';

export function getRectByX(point1, point2, point, settings) {
  if (point2.x >= point1.x) {
    return calcRectByX(point1, point2, point, settings);
  }

  return calcRectByX(point2, point1, point, settings);
}

function calcRectByX(point1, point2, p, settings) {
  const p1 = findPointByX(point2, point1, settings.gap);
  const p2 = findPointByX(point1, point2, settings.gap);

  const d = Math.abs(point1.y - p.y);
  const inside = p1.x <= p.x && p2.x >= p.x && d <= settings.weight;

  let nearest = null;
  let distance = null;

  if (inside) {
    const d1 = calcDistance(point1, p);
    const d2 = calcDistance(point2, p);

    if (d1 < d2) {
      nearest = point1;
      distance = d1;
    } else {
      nearest = point2;
      distance = d2;
    }
  }

  const result = {
    inside,
    nearest,
    distance,
  };

  if (settings.rects) {
    result.rect = [{
      x: p1.x,
      y: p1.y + settings.weight,
    }, {
      x: p2.x,
      y: p2.y + settings.weight,
    }, {
      x: p2.x,
      y: p2.y - settings.weight,
    }, {
      x: p1.x,
      y: p1.y - settings.weight,
    }];
  }

  if (settings.clientRects) {
    const p3 = {
      x: p1.x,
      y: p.y,
    };

    const p4 = {
      x: p2.x,
      y: p.y,
    };

    result.clientRect = [p1, p3, p4, p2];
  }

  return result;
}
