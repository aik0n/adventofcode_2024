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
  
  var rows = 0;
  var cols = 0;
  
  function getTheMatrix() {
    var matrix = [];
  
    var fs = require("fs");
    // var text = fs.readFileSync("./day_06/description_input_01.txt", "utf-8");
    var text = fs.readFileSync("./day_06/input.txt", "utf-8");
    var lines = text.split("\r\n").filter((line) => line.trim() !== "");
  
    return lines;
  }
  
  function inBounds(position) {
    return (
      position[0] >= 0 &&
      position[0] < rows &&
      position[1] >= 0 &&
      position[1] < cols
    );
  }
  
  function simulate(map, guardPos, guardDir) {
    const visited = new Set();
    let pos = [...guardPos];
    let dir = guardDir;
  
    while (true) {
      const state = `${pos.join(",")},${dir}`;
      if (visited.has(state)) {
        return true; // Loop detected
      }
  
      visited.add(state);
  
      const [dr, dc] = directions[dir];
      const nextPos = [pos[0] + dr, pos[1] + dc];
  
      if (inBounds(nextPos, rows, cols) && map[nextPos[0]][nextPos[1]] !== "#") {
        pos = nextPos;
      } else {
        dir = turns[dir];
      }
  
      if (!inBounds(nextPos, rows, cols)) {
        return false; // OUT
      }
    }
  }
  
  // This is extremely not optimal
  // And, it is still work ...
  function GuardGallivant_02() {
    var matrix = getTheMatrix();
    rows = matrix.length;
    cols = matrix[0].length;
  
    let guardPos = null;
    let guardDir = null;
  
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (["^", ">", "v", "<"].includes(matrix[r][c])) {
          guardPos = [r, c];
          guardDir = matrix[r][c];
          break;
        }
      }
      if (guardPos) break;
    }
  
    let validObstructions = 0;
  
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (matrix[r][c] === "." && !(r === guardPos[0] && c === guardPos[1])) {
          // new obstacle
          const newMap = matrix.map((row, rowIndex) =>
            rowIndex === r ? row.slice(0, c) + "#" + row.slice(c + 1) : row
          );
  
          if (simulate(newMap, guardPos, guardDir)) {
            validObstructions++;
          }
        }
      }
    }
  
    console.log(validObstructions);
  }
  
  GuardGallivant_02();
  
  // 1443
  // That's the right answer! You are one gold star closer to finding the Chief Historian.