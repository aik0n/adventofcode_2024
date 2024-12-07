// object, result: array
function getInput() {
  var data = {};

  var fs = require("fs");
  // var text = fs.readFileSync("./day_07/description_input_01.txt", "utf-8");
  var text = fs.readFileSync("./day_07/input.txt", "utf-8");
  var lines = text.split("\r\n").filter((line) => line.trim() !== "");

  for (let l = 0; l < lines.length; l++) {
    let temp = lines[l].split(":");

    if (false === data.hasOwnProperty(temp[0])) {
      data[temp[0]] = temp[1].trim().split(" ");
    }
  }

  return data;
}

function calculator(numbers, operations) {
  let result = parseInt(numbers[0], 10);

  for (let i = 0; i < operations.length; i++) {
    if (operations[i] === "+") {
      result += parseInt(numbers[i + 1], 10);
    } else if (operations[i] === "*") {
      result *= parseInt(numbers[i + 1], 10);
    } else if (operations[i] === "||") {
      result = parseInt(result.toString() + numbers[i + 1], 10);
    }
  }

  return result;
}

function getCombinations(size) {
  // iterate each data entry
  // check edge case: all plus
  // check trailing asterisk
  // check cases when asterisk added to all asterisks
  // add || (concatenate support)

  let combinations = [];
  let total = Math.pow(3, size);

  for (let i = 0; i < total; i++) {
    let option = [];
    for (let j = 0; j < size; j++) {
      let op = (i % Math.pow(3, j + 1)) / Math.pow(3, j);
      option[j] = ["+", "*", "||"][Math.floor(op)];
    }
    combinations.push(option);
  }

  return combinations;
}

function canCalculate(result, numbers) {
  let combinations = getCombinations(numbers.length - 1);

  for (let operators of combinations) {
    if (calculator(numbers, operators) === result) {
      return true;
    }
  }

  return false;
}

function BridgeRepair_02() {
  var data = getInput();
  var total = 0;

  for (var property in data) {
    let result = parseInt(property, 10);
    let numbers = data[property];

    if (canCalculate(result, numbers)) {
      total += result;
    }
  }

  console.log(total);
}

BridgeRepair_02();

// 189207836795655
// That's the right answer! You are one gold star closer to finding the Chief Historian.
// 30 seconds to calculate :(