function asNumbers(a, b) {
  return a > b;
}

function HistorianHysteria() {
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

  inputLeft.sort();
  inputRight.sort();

  var result = 0;
  for (var i = 0; i < inputLeft.length; i++) {
    result += Math.abs(parseInt(inputLeft[i]) - parseInt(inputRight[i]));
  }

  console.log(result);
}

HistorianHysteria();


// 2375403
// That's the right answer! You are one gold star closer to finding the Chief 