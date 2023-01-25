var startTime, endTime;
var clicks = 0;
start();

function start() {
  startTime = new Date();
  console.log("Time has started");
}

function end() {
  endTime = new Date();
  var timeSpent = endTime - startTime;
  timeSpent /= 1000;
  var seconds = Math.round(timeSpent);
  var minutes = 0;
  if (seconds > 60) {
    minutes = Math.round(seconds / 60);
    seconds = seconds - (minutes * 60);
  }
  console.log("Total time spent on the page: " + minutes + " minutes and " + seconds + " seconds");
  var time = "Total time spent on the page: " + minutes + " minutes and " + seconds + " seconds";
  document.getElementById("time_spent").innerHTML = time;
  return false;
}
