import { findPointByFormula } from './../distance/byFormula';
import { calcDistance } from './../utils/distance';

// ОПИСАНИЕ:
//
// формула прямой линии:
// y = k * x + b;
//
// где k - угол наклона линии
//     b - смещение относительно оси Y 
//
// если у нас есть 2 координаты [x1, y1] и [x2, y2],
// то мы можем найти формулу прямой линии: k, b
//
//      y1 - y2
// k = ---------  
//      x1 - x2
//
// b = y1 - k * x1
//
// так же мы можем найти точку пересечения двух линий
// y = k1 * x + b1;
// y = k2 * x + b2;
//
// по этим формулам:
//
//       b3 - b2
// x = ----------
//       k2 - k3
//
// y = k * x + b
//
//
// /\ (Y)
// |    
// |    
// |                                        point4: (x4; y4)        ФОРМУМЛА ДЛЯ ЧЕТВЕРТОЙ ЛИНИИ
// |                                       /\              /          -1
// |     ФОРМУМЛА ДЛЯ ВТОРОЙ ЛИНИИ        /  \             |   k4 =  ----
// |                      \              /    \            |          k1
// |     k2 = k1           |            /      \ line(4): {
// |                        } line(2)  /        \          |   b4 = y2 - k4 * x2
// |     b2 = y - k2 * x   |          /          \         \
// |                      /          /            \      
// |                                o point: (x; y)\ - ТРЕТЬЯ ТОЧКА В ПАРАМЕТРЕ
// |                               /                \
// |                              /                  o point2: (x2; y2) - ВТОРАЯ ТОЧКА В ПАРАМЕТРЕ
// |            point3: (x3; y3) /                  /
// |                             \                 /           ФОРМУМЛА ДЛЯ ПЕРВОЙ ЛИНИИ
// |       -1          \          \               /            /         y1 - y2
// | k3 = -----         |          \             /             |   k1 = --------- 
// |       k1           |           \           /              |         x1 - x2
// |                     } line(3)   \         /      line(1) {
// | b3 = y1 - k3 * x1  |             \       /                |   b1 = y1 - k * x1
// |                   /               \     /                 \
// |    ФОРМУМЛА ДЛЯ ТРЕТЬЕЙ ЛИНИИ      \   /
// |                                     \ /
// |                                      o point1: (x1; y1) - ПЕРВАЯ ТОЧКА В ПАРАМЕТРЕ
// | 
// ---------------------------------------------------------------------------------------------------> (X)
//

export function getRectByFormula(point1, point2, point, settings) {
  if (point2.x > point1.x) {
    return calcRectByFormula(point1, point2, point, settings);
  }

  return calcRectByFormula(point2, point1, point, settings);
}

function calcRectByFormula(point1, point2, p, settings) {
  const p1 = findPointByFormula(point2, point1, settings.gap);
  const p2 = findPointByFormula(point1, point2, settings.gap);

  // найдем коэффициенты k, b для 4х линий

  // line1:
  const k1 = calcK(p1, p2);
  // const b1 = calcB(point1, k1);

  // line2:
  // const k2 = k1;
  const b2 = calcB(p, k1);

  // line3:
  const k3 = -1 / k1;
  const b3 = calcB(p1, k3);

  // line4:
  // const k4 = k3;
  const b4 = calcB(p2, k3);

  // ----------------------------

  const p3 = {};
  p3.x = calcX(k1, b2, k3, b3);
  p3.y = calcY(k1, p3.x, b2);

  const p4 = {};
  p4.x = calcX(k1, b2, k3, b4);
  p4.y = calcY(k1, p4.x, b2);

  // ----------------------------

  const d = calcDistance(p1, p3);
  const inside = p3.x <= p.x && p4.x >= p.x && d <= settings.weight;

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
    const dir1 = {};
    dir1.x = p1.x + settings.weight;
    dir1.y = k3 * dir1.x + b3;

    const dir2 = {};
    dir2.x = p2.x + settings.weight;
    dir2.y = k3 * dir2.x + b4;

    const rect2 = findPointByFormula(dir1, p1, settings.weight);
    const rect3 = findPointByFormula(dir2, p2, settings.weight);
    const rect1 = findPointByFormula(rect2, p1, settings.weight);
    const rect4 = findPointByFormula(rect3, p2, settings.weight);

    result.rect = [
      rect1,
      rect2,
      rect3,
      rect4,
    ];
  }

  if (settings.clientRects) {
    result.clientRect = [p1, p3, p4, p2];
  }

  return result;
}

// ------------------------------

function calcK(point1, point2) {
  return (point1.y - point2.y) / (point1.x - point2.x);
}

function calcB(point, k) {
  return point.y - k * point.x;
}

// ------------------------------

function calcX(line1K, line1B, line2K, line2B) {
  return (line2B - line1B) / (line1K - line2K);
}

function calcY(k, x, b) {
  return k * x + b;
}
