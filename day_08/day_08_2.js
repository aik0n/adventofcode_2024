const { count } = require("console");

class Matrix {
  constructor(data) {
    this.rows = data.length;
    this.columns = data[0].length;
    this.data = data;
  }
}

function getMatrix() {
  var fs = require("fs");
  var text = fs.readFileSync("./day_08/description_input_01.txt", "utf-8");
  // var text = fs.readFileSync("./day_08/input.txt", "utf-8");
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

function isInbound(matrix, node) {
  let rows = matrix.rows;
  let cols = matrix.columns;
  let x = node[0];
  let y = node[1];

  // console.log("rows:",rows,"cols:",cols,"x:",x,"y:",y);
  if (x < 0 || x > cols - 1 || y < 0 || y > rows - 1) {
    return false;
  }

  return true;
}

function getAntiNodes(matrix, coords, inbound) {
  if (coords.length <= 1) {
    return;
  }

  // each antenna with others ...
  for (let a = 0; a < coords.length; a++) {
    let one = coords[a];
    for (let b = a + 1; b < coords.length; b++) {
      let two = coords[b];

      someMath(matrix, one, two, inbound);
    }
  }
}

function someMath(matrix, one, two, inbound) {
  // some kind of vector algebra
  let deltaX = Math.abs(two[0] - one[0]);
  let deltaY = Math.abs(two[1] - one[1]);
  
  // Y always subtract from first in pair and sum with second in pair
  // X sum if first coord x in pair is greater, subtract if first coord x is lower
  let flag = true;
  let counter = 0;
  
  let newNode1 = [];
  let newNode2 = [];

  if (one[0] > two[0]) {
    while (flag) {
      newNode1[0] = one[0] + deltaX * counter;
      newNode1[1] = one[1] - deltaY * counter;
      newNode2[0] = two[0] - deltaX * counter;
      newNode2[1] = two[1] + deltaY * counter;

      let node1 = newNode1[0].toString() + "-" + newNode1[1].toString();
      if (isInbound(matrix, newNode1)) {
        if (inbound.indexOf(node1) < 0) {
          inbound.push(node1);
        }
      } else {
        flag = false;
      }

      let node2 = newNode2[0].toString() + "-" + newNode2[1].toString();
      if (isInbound(matrix, newNode2)) {
        if (inbound.indexOf(node2) < 0) {
          inbound.push(node2);
        }
      } else {
        flag = false;
      }

      counter++;
    }
  } else {
    while (flag) {
      newNode1[0] = one[0] - deltaX * counter;
      newNode1[1] = one[1] - deltaY * counter;
      newNode2[0] = two[0] + deltaX * counter;
      newNode2[1] = two[1] + deltaY * counter;

      let node1 = newNode1[0].toString() + "-" + newNode1[1].toString();
      if (isInbound(matrix, newNode1)) {
        if (inbound.indexOf(node1) < 0) {
          inbound.push(node1);
        }
      } else {
        flag = false;
      }

      let node2 = newNode2[0].toString() + "-" + newNode2[1].toString();
      if (isInbound(matrix, newNode2)) {
        if (inbound.indexOf(node2) < 0) {
          inbound.push(node2);
        }
      } else {
        flag = false;
      }

      counter++;
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

  for (var ant in antennas) {
    getAntiNodes(matrix, antennas[ant], nodesInbound);
  }

  // printNewMatrix(matrix, nodesInbound);

  // console.log(nodesInbound);
  console.log(nodesInbound.length);
}

ResonantCollinearity_01();

// 1233
// That's the right answer! You are one gold star closer to finding the Chief Historian.
