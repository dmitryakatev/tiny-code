// /\ (Y)
// |
// |
// |
// |      o p3 (x3, y3)
// |      |
// |      |
// |      |
// |      /\  DISTANCE
// |      |
// |      |
// |      o p2 (x2, y2)
// |      |
// |      |
// |      |
// |      |
// |      |
// |      o p1 (x1, y1)
// |
// -------------------------------> (X)
//
// даны две точки p1, p2 и дана дистанция (distance)
// найти точку p3 лежащую на этой прямой
//
// РЕШЕНИЕ:
// т.к. точка p1 и точка p2 находятся параллельно оси Y
// то x1 === x2 и следовательно равно x3
// для того чтобы найти y3 нам нужно к y2 прибавить дистанцию
// 
// x3 = p2.x
// y3 = p2.y + DISTANCE
//

export function findPointByY(p1, p2, distance) {
  const dirY = p2.y >= p1.y ? 1 : -1;

  return {
    x: p2.x,
    y: p2.y + dirY * distance,
  };
}