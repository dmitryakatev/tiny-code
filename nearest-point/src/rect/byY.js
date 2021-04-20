import { findPointByY } from './../distance/byY';
import { calcDistance } from './../utils/distance';

export function getRectByY(point1, point2, point, settings) {
  if (point2.y >= point1.y) {
    return calcRectByY(point1, point2, point, settings);
  }

  return calcRectByY(point2, point1, point, settings);
}

function calcRectByY(point1, point2, p, settings) {
  const p1 = findPointByY(point2, point1, settings.gap);
  const p2 = findPointByY(point1, point2, settings.gap);

  const d = Math.abs(point1.x - p.x);
  const inside = p1.y <= p.y && p2.y >= p.y && d <= settings.weight;

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
      x: p1.x - settings.weight,
      y: p1.y,
    }, {
      x: p2.x - settings.weight,
      y: p2.y,
    }, {
      x: p2.x + settings.weight,
      y: p2.y,
    }, {
      x: p1.x + settings.weight,
      y: p1.y,
    }];
  }

  if (settings.clientRects) {
    const p3 = {
      x: p.x,
      y: p2.y,
    };

    const p4 = {
      x: p.x,
      y: p1.y,
    };

    result.clientRect = [p1, p2, p3, p4];
  }

  return result;
}
