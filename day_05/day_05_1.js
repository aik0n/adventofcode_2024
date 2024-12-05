function PrintQueue_01() {
  var fs = require("fs");
  // var text = fs.readFileSync("./day_05/description_input_01.txt", "utf-8");
  var text = fs.readFileSync("./day_05/input.txt", "utf-8");

  var data = text.split("\r\n\r\n");
  var rules = data[0].split("\r\n");
  var updates = data[1].split("\r\n");
  var validated = [];

  for (var i = 0; i < updates.length; i++) {
    var change = updates[i].split(",");
    var isValid = true;
    var p1 = 0;
    var p2 = 1;
    while (p2 < change.length) {
      var temp = change[p1].toString() + "|" + change[p2].toString();
      if (rules.indexOf(temp) < 0) {
        isValid = false;
      }

      p1++;
      p2++;
    }

    if (isValid) {
      validated.push(change);
    }
  }

  var result = 0;
  for (var v = 0; v < validated.length; v++) {
    var temp = validated[v];
    result += parseInt(temp[Math.floor(temp.length / 2)]);
  }

  console.log(result);
}

PrintQueue_01();

// 4957
// That's the right answer! You are one gold star closer to finding the Chief Historian.