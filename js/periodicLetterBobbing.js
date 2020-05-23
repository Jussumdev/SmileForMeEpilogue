var enabled = false;

var bob_chars = [];

var rate = 6;
var mag = 0.15;
var off = 0.06;

function AddNewBobElement(el) {
  var textInEl = el.innerHTML;
  var chars = textInEl.split("");
  var html = "";
  var offset = 0;
  for (var j=0; j<chars.length; j++) {
    var char;
    if (chars[j] == '&') {
      char = "&nbsp";
      j+=5;
    }
    else {
      char = chars[j]
    }
    html+= `<span class=bob_enabled data-offset='${offset}' data-rate='${rate}' data-magnitude='${mag}'>${char}</span>`;
    offset+=parseFloat(off);
  }
  el.innerHTML = html;
}

function updateAllBobChars() {
  bob_chars = document.getElementsByClassName("bob_enabled");
}

function setBob(){
  if (!enabled) {return;}
  for (var i=0; i<bob_chars.length; i++) {
    var el = bob_chars[i];
    var char_offset = numBob(
      0,
      el.getAttribute('data-rate'),
      el.getAttribute('data-magnitude'),
      roundDecimals(el.getAttribute('data-offset'), 2)
    );
    console.log(char_offset)
    el.style = "position:relative;top:"+char_offset+"em;"
  }
}

function setLetterBobbingEnabled(b) {
  enabled=b;
}

//Frames per second
var framerate = 60
window.setInterval(function(){
  setBob();
}, 1000 / framerate);
