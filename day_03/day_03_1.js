function MullItOver_01() {
  var fs = require("fs");
  // var text = fs.readFileSync("./day_03/description_input_01.txt", "utf-8");
  var text = fs.readFileSync("./day_03/input.txt", "utf-8");

  let regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
  let matches = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    matches.push(match[0]);
  }

  let result = 0;
  let item;
  let a = 0;
  let b = 0;
  for (let i = 0; i < matches.length; i++) {
    item = matches[i].replace("mul(", "").replace(")", "");
    a = item.split(",")[0];
    b = item.split(",")[1];

    result += parseInt(a) * parseInt(b);
  }

  console.log(result);
}

MullItOver_01();

// 162813399
// That's the right answer! You are one gold star closer to finding the Chief Historian.