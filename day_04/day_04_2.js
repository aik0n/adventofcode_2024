// lines - array of strings
function convertLinesToArray(lines) {
  var result = [];

  for (var l = 0; l < lines.length; l++) {
    var row = lines[l];
    var temp = [];
    for (c = 0; c < row.length; c++) {
      temp.push(row[c]);
    }
    result.push(temp);
  }

  return result;
}

function isSubstring(input) {
  return input === "MAS" || input === "SAM";
}

function CeresSearch_02() {
  var fs = require("fs");
  // var text = fs.readFileSync("./day_04/description_input_02.txt", "utf-8");
  var text = fs.readFileSync("./day_04/input.txt", "utf-8");
  var lines = text.split("\r\n").filter((line) => line.trim() !== "");

  var grid = convertLinesToArray(lines);
  var result = 0;

  var rows = grid.length;
  var cols = grid[0].length;

  for (let row = 0; row < rows - 2; row++) {
    for (let col = 1; col < cols - 1; col++) {
      var topLeft = grid[row][col - 1] + grid[row + 1][col] + grid[row + 2][col + 1];
      var topRight = grid[row][col + 1] + grid[row + 1][col] + grid[row + 2][col - 1];

      // console.log(topLeft, topRight);

      if (isSubstring(topLeft) && isSubstring(topRight)) {
        result++;
      }
    }
  }

  console.log(result);
}

CeresSearch_02();

// 1930
// That's the right answer! You are one gold star closer to finding the Chief Historian.