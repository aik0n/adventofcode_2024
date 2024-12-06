class Matrix {
  constructor(data) {
    this.data = data;
    this.rows = data.length;
    this.columns = this.data[0].length;
  }
}

function getTheMatrix() {
  var matrix = [];

  var fs = require("fs");
  // var text = fs.readFileSync("./day_06/description_input_01.txt", "utf-8");
  var text = fs.readFileSync("./day_06/input.txt", "utf-8");
  var lines = text.split("\r\n").filter((line) => line.trim() !== "");

  for (let l = 0; l < lines.length; l++) {
    matrix.push(lines[l].split(""));
  }

  return new Matrix(matrix);
}

function inBounds(position, rows, columns) {
  return (
    position[0] >= 0 &&
    position[0] < rows &&
    position[1] >= 0 &&
    position[1] < columns
  );
}

function GuardGallivant_01() {
  var matrix = getTheMatrix();

  const directions = {
    "^": [-1, 0],
    ">": [0, 1],
    v: [1, 0],
    "<": [0, -1],
  };

  const turns = {
    "^": ">",
    ">": "v",
    v: "<",
    "<": "^",
  };

  var guardPos = null;
  var guardDir = null;

  for (let r = 0; r < matrix.rows; r++) {
    for (let c = 0; c < matrix.columns; c++) {
      if (["^", ">", "v", "<"].includes(matrix.data[r][c])) {
        guardPos = [r, c];
        guardDir = matrix.data[r][c];
        break;
      }
    }
    if (guardPos) {
      break;
    }
  }

  var visited = new Set();
  visited.add(guardPos.join(","));

  // Simulate guard movement
  while (true) {
    const [dr, dc] = directions[guardDir];
    const nextPos = [guardPos[0] + dr, guardPos[1] + dc];

    if (
      inBounds(nextPos, matrix.rows, matrix.columns) &&
      matrix.data[nextPos[0]][nextPos[1]] !== "#"
    ) {
      guardPos = nextPos;
      visited.add(guardPos.join(","));
    } else {
      guardDir = turns[guardDir];
    }

    if (!inBounds(nextPos, matrix.rows, matrix.columns)) {
      break;
    }
  }

  console.log(visited.size);
}

GuardGallivant_01();

// 4617
// Wrong answer (too low)

// 4696
// That's the right answer! You are one gold star closer to finding the Chief Historian.
