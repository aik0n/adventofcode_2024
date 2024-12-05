function isValidRule(change, rules) {
  var p1 = 0;
  var p2 = 1;
  var isValid = true;
  while (p2 < change.length) {
    var temp = change[p1].toString() + "|" + change[p2].toString();
    if (rules.indexOf(temp) < 0) {
      isValid = false;
    }

    p1++;
    p2++;
  }
  return isValid;
}

function PrintQueue_02() {
  var fs = require("fs");
  // var text = fs.readFileSync("./day_05/description_input_01.txt", "utf-8");
  var text = fs.readFileSync("./day_05/input.txt", "utf-8");

  var data = text.split("\r\n\r\n");
  var rules = data[0].split("\r\n");
  var updates = data[1].split("\r\n");
  var notValid = [];

  for (var i = 0; i < updates.length; i++) {
    var change = updates[i].split(",");

    if (!isValidRule(change, rules)) {
      notValid.push(change);
    }
  }

  // rule fixes (swap values)
  // !!! O(n^3) obviously it is not optimal ...
  for (var n = 0; n < notValid.length; n++) {
    var change = notValid[n];
    while (!isValidRule(change, rules)) {
      var p1 = 0;
      var p2 = 1;
      while (p2 < change.length) {
        var temp = change[p1].toString() + "|" + change[p2].toString();
        if (rules.indexOf(temp) < 0) {
          // need swap if true
          temp = change[p2].toString() + "|" + change[p1].toString();
          if (rules.indexOf(temp) > -1) {
            var keeper = change[p1];
            change[p1] = change[p2];
            change[p2] = keeper;
          }
        }

        p1++;
        p2++;
      }
    }
  }

  var result = 0;
  for (var v = 0; v < notValid.length; v++) {
    var temp = notValid[v];
    result += parseInt(temp[Math.floor(temp.length / 2)]);
  }

  console.log(result);
}

PrintQueue_02();

// 6938
// That's the right answer! You are one gold star closer to finding the Chief Historian.