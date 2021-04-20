//              _______________________________
// distance = \/ (x2 - x1) ^ 2 + (y2 - y1) ^ 2
//

export function calcDistance(p1, p2) {
  return ((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2) ** 0.5;
}
