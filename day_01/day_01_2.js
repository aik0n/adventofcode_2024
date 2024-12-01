function HistorianHysteria_02() {
  var fs = require("fs");
  // var data = fs.readFileSync("./day_01/description_input.txt", "utf-8");
  var data = fs.readFileSync("./day_01/input.txt", "utf-8");
  var lines = data.split("\r\n").filter((line) => line.trim() !== "");

  var inputLeft = [];
  var inputRight = [];

  for (var line of lines) {
    var [left, right] = line.split(/\s+/);

    inputLeft.push(left);
    inputRight.push(right);
  }

  var map = {};
  for (var i = 0; i < inputRight.length; i++) {
    if (map.hasOwnProperty(inputRight[i])) {
      map[inputRight[i]] += 1;
    } else {
      map[inputRight[i]] = 1;
    }
  }

  var result = 0;
  for (var i = 0; i < inputLeft.length; i++) {
    if (map.hasOwnProperty(inputLeft[i])) {
      result += map[inputLeft[i]] * parseInt(inputLeft[i]);
    }
  }

  console.log(result);
}

HistorianHysteria_02();

// 23082277
// That's the right answer! You are one gold star closer to finding the Chief Historian.