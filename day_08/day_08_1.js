// read data as matrix
// create a structure grouped: unique antennas + their coords
// for each unique antennas calculate anti nodes positions
// check anti nodes position for a validity
// keep (array) and count anti nodes, inbound and outbound

class Matrix {
  constructor(data) {
    this.rows = data.length;
    this.columns = data[0].length;
    this.data = data;
  }
}

function getMatrix() {
  var fs = require("fs");
  // var text = fs.readFileSync("./day_08/description_input_01.txt", "utf-8");
  var text = fs.readFileSync("./day_08/input.txt", "utf-8");
  var lines = text.split("\r\n").filter((line) => line.trim() !== "");

  var data = [];
  for (let l = 0; l < lines.length; l++) {
    let temp = lines[l].split("");

    data.push(temp);
  }

  return new Matrix(data);
}

function getAntennas(matrix) {
  // A: [[x1,y1], [x2,y2], ....]
  var result = {};

  for (let r = 0; r < matrix.columns; r++) {
    for (let c = 0; c < matrix.rows; c++) {
      let symbol = matrix.data[r][c];
      if (symbol !== ".") {
        if (result.hasOwnProperty(symbol)) {
          let temp1 = result[symbol];
          temp1.push([c, r]);
          result[symbol] = temp1;
        } else {
          let temp2 = [];
          temp2.push([c, r]);
          result[symbol] = temp2;
        }
      }
    }
  }

  return result;
}

function isInbound(matrix, x, y) {
  let rows = matrix.rows;
  let cols = matrix.columns;

  // console.log("rows:",rows,"cols:",cols,"x:",x,"y:",y);
  if (x < 0 || x > cols - 1 || y < 0 || y > rows - 1) {
    return false;
  }

  return true;
}

function getAntiNodes(matrix, coords, inbound, outbound) {
  if (coords.length <= 1) {
    return;
  }

  // each antenna with others ...
  for (let a = 0; a < coords.length; a++) {
    let one = coords[a];
    for (let b = a + 1; b < coords.length; b++) {
      let two = coords[b];

      someMath(matrix, one[0], two[0], one[1], two[1], inbound, outbound);
    }
  }
}

function someMath(matrix, x1, x2, y1, y2, inbound, outbound) {
  // some kind of vector algebra
  let deltaX = Math.abs(x2 - x1) * 2;
  let deltaY = Math.abs(y2 - y1) * 2;
  let nx1;
  let ny1;
  let nx2;
  let ny2;

  // Y always subtract from first in pair and sum with second in pair
  // X sum if first coord x in pair is greater, subtract if first coord x is lower
  if (x1 > x2) {
    nx1 = x1 - deltaX;
    ny1 = y1 + deltaY;
    nx2 = x2 + deltaX;
    ny2 = y2 - deltaY;
  } else {
    nx1 = x1 + deltaX;
    ny1 = y1 + deltaY;
    nx2 = x2 - deltaX;
    ny2 = y2 - deltaY;
  }

  let node1 = nx1.toString() + "-" + ny1.toString();
  if (isInbound(matrix, nx1, ny1)) {
    if (inbound.indexOf(node1) < 0) {
      inbound.push(node1);
    }
  } else {
    if (outbound.indexOf(node1) < 0) {
      outbound.push(node1);
    }
  }

  let node2 = nx2.toString() + "-" + ny2.toString();
  if (isInbound(matrix, nx2, ny2)) {
    if (inbound.indexOf(node2) < 0) {
      inbound.push(node2);
    }
  } else {
    if (outbound.indexOf(node2) < 0) {
      outbound.push(node2);
    }
  }
}

function printNewMatrix(matrix, inbound) {
  for (let n = 0; n < inbound.length; n++) {
    let node = inbound[n].split("-");
    let x = node[0];
    let y = node[1];

    let current = matrix.data[y][x];
    if (current === ".") {
      matrix.data[y][x] = "#";
    }
  }

  console.log(matrix);
}

function ResonantCollinearity_01() {
  var matrix = getMatrix();
  var antennas = getAntennas(matrix);

  // X-Y | 1-2, 3-8, etc
  var nodesInbound = [];
  var nodesOutbound = [];

  for (var ant in antennas) {
    getAntiNodes(matrix, antennas[ant], nodesInbound, nodesOutbound);
  }

  // printNewMatrix(matrix, nodesInbound);

  // console.log(nodesOutbound);
  // console.log(nodesInbound);
  console.log(nodesInbound.length);
}

ResonantCollinearity_01();

// 327
// That's the right answer! You are one gold star closer to finding the Chief Historian.