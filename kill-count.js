var h1 = document.getElementsByTagName('h1')[0],
    table = document.getElementsByTagName('table')[0],
    start = document.getElementById('start'),
    record = document.getElementById('record'),
    killStart = document.getElementById('kill-start'),
    kill = document.getElementById('kill'),
    t;

var tStart;
var cnt = 0;
var last= 0;

function timer() {
  var now = Date.now() / 1000 | 0;
  h1.textContent = getTimestamp(now - tStart);
  t = setTimeout(timer, 200);
}

function getTimestamp(seconds) {
  var h = Math.floor(seconds / (60*60));
  var m = Math.floor(seconds % (60*60) / 60);
  var s = seconds % 60;
  return (h ? (h > 9 ? h : "0" + h) : "00") + ":" + (m ? (m > 9 ? m : "0" + m) : "00") + ":" + (s > 9 ? s : "0" + s);
}

start.onclick = function() {
  if (start.innerHTML == "중단") {
    start.innerHTML = "재개";
    start.classList.remove("btn-danger");
    start.classList.add("btn-success");
    record.setAttribute("disabled", "disabled");
    killStart.removeAttribute("disabled");
    clearTimeout(t);

  } else {
    start.innerHTML = "중단";
    start.classList.remove("btn-success");
    start.classList.add("btn-danger");
    var c = parseInt(killStart.value);
    if (c < 0) {
      alert("0 이상의 숫자를 입력해주세요!");
      return
    }
    killStart.setAttribute("disabled", "disabled");
    record.removeAttribute("disabled");
    cnt = c;
    tStart = Date.now() / 1000 | 0;
    t = setTimeout(timer, 200);
  }
};

record.onclick = function() {
  var now = (Date.now() / 1000 | 0) - tStart;
  var r = now - last;
  var d = kill.value;
  if (d < 0 || !d) {
    alert("0 이상의 숫자를 입력해주세요!");
    return;
  }
  var dt = d - cnt;

  var row = table.insertRow(table.rows.length);
  var cell0 = row.insertCell(0);
  var cell1 = row.insertCell(1);
  var cell2 = row.insertCell(2);
  var cell3 = row.insertCell(3);
  cell0.innerHTML = getTimestamp(now);
  cell1.innerHTML = getTimestamp(r);
  cell2.innerHTML = dt;
  cell3.innerHTML = Math.round(dt/(r/60)*100)/100;

  cnt = d;
  last = now;
  kill.select();
};

killStart.onfocus = function() {
  $(this).select();
};

kill.onfocus = function() {
  $(this).select();
};