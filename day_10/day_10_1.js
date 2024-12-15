// get all 9 positions
// for each 9 position try to find 0
// each found trail increase total count by one
// calculate all trails count

// right, down, left, up
const directions = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

class Matrix {
  constructor(data) {
    this.rows = data.length;
    this.columns = data[0].length;
    this.data = data;
  }

  getValue(x, y) {
    return parseInt(this.data[y][x]); // rows then column
  }

  isInBounds(x, y) {
    return x >= 0 && y >= 0 && x < this.columns && y < this.rows;
  }
}

function getMatrix() {
  var fs = require("fs");
  // var text = fs.readFileSync("./day_10/description_input_01.txt", "utf-8");
  var text = fs.readFileSync("./day_10/input.txt", "utf-8");
  var lines = text.split("\r\n").filter((line) => line.trim() !== "");

  var data = [];
  for (let l = 0; l < lines.length; l++) {
    let temp = lines[l].split("");

    data.push(temp);
  }

  return new Matrix(data);
}

function getTrailValue(startX, startY, matrix) {
  let visited = new Set();
  let queue = [[startX, startY, 0]];
  let reachable = new Set();

  while (queue.length) {
    let position = queue.shift(); // [x, y, height]
    let key = getPositionKey(position);

    if (visited.has(key)) {
      continue;
    }

    visited.add(key);

    // --- // --- //
    if (matrix.getValue(position[0], position[1]) === 9) {
      reachable.add(key);
      continue;
    }

    // --- // --- //
    for (let [deltaX, deltaY] of directions) {
      let newX = position[0] + deltaX;
      let newY = position[1] + deltaY;

      if (
        matrix.isInBounds(newX, newY) &&
        false === visited.has(getPositionKey([newX, newY])) &&
        matrix.getValue(newX, newY) === position[2] + 1
      ) {
        queue.push([newX, newY, position[2] + 1]);
      }
    }
  }

  return reachable.size;
}

function getPositionKey(position) {
  return position[0].toString() + position[1].toString();
}

function HoofIt_01() {
  let matrix = getMatrix();

  let result = 0;

  for (let row = 0; row < matrix.rows; row++) {
    for (let col = 0; col < matrix.columns; col++) {
      if (matrix.getValue(col, row) === 0) {
        result += getTrailValue(col, row, matrix);
      }
    }
  }

  console.log(result);
}

HoofIt_01();


// 538
// That's the right answer! You are one gold star closer to finding the Chief Historian.