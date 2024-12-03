function MullItOver_02() {
  var fs = require("fs");
  // var text = fs.readFileSync("./day_03/description_input_02.txt", "utf-8");
  var text = fs.readFileSync("./day_03/input.txt", "utf-8");

  let regex = /do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\)/g;
  let isEnabled = true;
  let instruction = "";
  let match;

  let result = 0;
  let a = 0;
  let b = 0;

  while ((match = regex.exec(text)) !== null) {
    instruction = match[0];

    if (instruction === "do()") {
      isEnabled = true;
    } else if (instruction === "don't()") {
      isEnabled = false;
    } else if (isEnabled && instruction.startsWith("mul(")) {
      a = parseInt(match[1], 10);
      b = parseInt(match[2], 10);

      result += a * b;
    }
  }

  console.log(result);
}

MullItOver_02();

// 53783319
// That's the right answer! You are one gold star closer to finding the Chief Historian.