function isSafeReport(levels) {
  let increasing = true;
  let decreasing = true;

  for (let i = 1; i < levels.length; i++) {
    const diff = levels[i] - levels[i - 1];

    if (diff > 3 || diff < -3 || diff === 0) {
      return false;
    }

    if (diff > 0) {
      decreasing = false;
    } else if (diff < 0) {
      increasing = false;
    }
  }

  return increasing || decreasing;
}

function problemDampener(data) {
  if (isSafeReport(data)) {
    return true;
  }

  var changed = [];
  for (let i = 0; i < data.length; i++) {
    changed = data.toSpliced(i, 1);
    if (isSafeReport(changed)) {
      return true;
    }
  }

  return false;
}

function RedNosedReports_02() {
  var fs = require("fs");
  // var data = fs.readFileSync("./day_02/description_input.txt", "utf-8");
  var data = fs.readFileSync("./day_02/input.txt", "utf-8");
  var lines = data.split("\r\n").filter((line) => line.trim() !== "");

  var reports = [];
  for (var line of lines) {
    reports.push(line.trim().split(/\s+/));
  }

  var result = 0;
  for (var r = 0; r < reports.length; r++) {
    if (problemDampener(reports[r])) {
      result++;
    }
  }

  console.log(result);
}

RedNosedReports_02();

// 493
// That's the right answer! You are one gold star closer to finding the Chief Historian.