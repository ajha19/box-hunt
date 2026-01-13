// Box Hunt Game
document.addEventListener("DOMContentLoaded", function () {

  var playArea = document.getElementById("playArea");
  var box = document.getElementById("box");
  var tableBody = document.getElementById("tableBody");
  var intervalInput = document.getElementById("intervalInput");

  var startBtn = document.getElementById("start");
  var pauseBtn = document.getElementById("pause");
  var resetBtn = document.getElementById("reset");

  var intervalId = null;
  var clickCount = 0;
  var appearTime = 0;

  // Generate random position inside play area
  function getRandomPosition() {
    var areaRect = playArea.getBoundingClientRect();
    var boxSize = 30;

    return {
      left: Math.random() * (areaRect.width - boxSize),
      top: Math.random() * (areaRect.height - boxSize)
    };
  }

  // Show box at random position
  function showBox() {
    var pos = getRandomPosition();
    box.style.left = pos.left + "px";
    box.style.top = pos.top + "px";
    box.style.display = "block";
    appearTime = Date.now();
  }

  // Start game
  startBtn.onclick = function () {
    if (intervalId) return;

    var intervalTime = Number(intervalInput.value) || 1000;

    showBox();
    intervalId = setInterval(showBox, intervalTime);
  };

  // Pause game
  pauseBtn.onclick = function () {
    clearInterval(intervalId);
    intervalId = null;
  };

  // Reset game
  resetBtn.onclick = function () {
    clearInterval(intervalId);
    intervalId = null;
    box.style.display = "none";
    tableBody.innerHTML = "";
    clickCount = 0;
  };

  // On clicking the box
  box.onclick = function () {
    clickCount++;

    var reactionTime = ((Date.now() - appearTime) / 1000).toFixed(2);

    var row = document.createElement("tr");
    row.innerHTML =
      "<td>" + clickCount + "</td>" +
      "<td>" + reactionTime + " sec</td>";

    tableBody.appendChild(row);
    showBox();
  };

});