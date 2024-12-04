// lines - array of strings
function howManySubstrings(lines) {
  let text = lines.join("|");
  let samples = ["XMAS", "SAMX"];
  let occurred = { XMAS: 0, SAMX: 0 };

  samples.forEach((substr) => {
    let pointer = 0;
    while ((pointer = text.indexOf(substr, pointer)) !== -1) {
      occurred[substr]++;
      pointer++;
    }
  });

  return occurred.XMAS + occurred.SAMX;
}

// lines - array of strings
function rotateClockwise(lines) {
  let columns = lines[0].length;
  let rows = lines.length;

  let result = Array.from({ length: columns }, () => []);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      result[c][rows - r - 1] = lines[r][c];
    }
  }

  let item;
  for (let i = 0; i < result.length; i++) {
    item = result[i].join("");
    result[i] = item;
  }

  return result;
}

// lines - array of strings
function diagonals(lines) {
  let rows = lines.length;
  let columns = lines[0].length;

  let result = [];

  // primary
  for (let d = 0; d < rows + columns - 1; d++) {
    let diagonal = [];
    for (let row = 0; row < rows; row++) {
      let col = d - row;
      if (col >= 0 && col < columns) {
        diagonal.push(lines[row][col]);
      }
    }
    if (diagonal.length >= 4) {
      result.push(diagonal.join(""));
    }
  }

  // secondary
  for (let d = 0; d < rows + columns - 1; d++) {
    let diagonal = [];
    for (let row = 0; row < rows; row++) {
      let col = d - (rows - row - 1);
      if (col >= 0 && col < columns) {
        diagonal.push(lines[row][col]);
      }
    }
    if (diagonal.length >= 4) {
      result.push(diagonal.join(""));
    }
  }

  return result;
}

function CeresSearch_01() {
  var fs = require("fs");
  // var text = fs.readFileSync("./day_04/description_input_01.txt", "utf-8");
  var text = fs.readFileSync("./day_04/input.txt", "utf-8");
  var lines = text.split("\r\n").filter((line) => line.trim() !== "");

  let result = 0;
  // forward and backward search ih horizontal lines
  result += howManySubstrings(lines);
  // forward and backward search in vertical lines
  let newlines = rotateClockwise(lines);
  result += howManySubstrings(newlines);
  // diagonal search
  let diag = diagonals(lines);
  result += howManySubstrings(diag);

  console.log(result);
}

CeresSearch_01();

// 2543
// That's the right answer! You are one gold star closer to finding the Chief Historian.