export type Matrix3x3 = number[][];

export function translation(dx: number, dy: number): Matrix3x3 {
  return [
    [1, 0, dx],
    [0, 1, dy],
    [0, 0, 1],
  ];
}

export function rotation(theta: number): Matrix3x3 {
  const cos = Math.cos(theta);
  const sin = Math.sin(theta);
  return [
    [cos, -sin, 0],
    [sin, cos, 0],
    [0, 0, 1],
  ];
}

export function multiply(a: Matrix3x3, b: Matrix3x3): Matrix3x3 {
  const result: Matrix3x3 = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      result[i][j] = 0;
      for (let k = 0; k < 3; k++) {
        result[i][j] += a[i][k] * b[k][j];
      }
    }
  }
  return result;
}
