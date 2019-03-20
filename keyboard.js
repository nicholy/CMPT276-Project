// key map
// Keypad                   Keyboard
// +-+-+-+-+                +-+-+-+-+
// |1|2|3|C|                |1|2|3|4|
// +-+-+-+-+                +-+-+-+-+
// |4|5|6|D|                |Q|W|E|R|
// +-+-+-+-+       =>       +-+-+-+-+
// |7|8|9|E|                |A|S|D|F|
// +-+-+-+-+                +-+-+-+-+
// |A|0|B|F|                |Z|X|C|V|
// +-+-+-+-+                +-+-+-+-+

// Keyboard input when keydown is detected
document.addEventListener("keydown", function(event) {
  if (event.keyCode == 49) { //1
    ch.setKey(0x1);
  }
  if (event.keyCode == 50) { //2
    ch.setKey(0x2);
  }
  if (event.keyCode == 51) { //3
    ch.setKey(0x3);
  }
  if (event.keyCode == 52) { //4
    ch.setKey(0xC);
  }
  if (event.keyCode == 81) { //Q
    ch.setKey(0x4);
  }
  if (event.keyCode == 87) { //W
    ch.setKey(0x5);
  }
  if (event.keyCode == 69) { //E
    ch.setKey(0x6);
  }
  if (event.keyCode == 82) { //R
    ch.setKey(0xD);
  }
  if (event.keyCode == 65) { //A
    ch.setKey(0x7);
  }
  if (event.keyCode == 83) { //S
    ch.setKey(0x8);
  }
  if (event.keyCode == 68) { //D
    ch.setKey(0x9);
  }
  if (event.keyCode == 70) { //F
    ch.setKey(0xE);
  }
  if (event.keyCode == 90) { //Z
    ch.setKey(0xA);
  }
  if (event.keyCode == 88) { //X
    ch.setKey(0x0);
  }
  if (event.keyCode == 67) { //C
    ch.setKey(0xB);
  }
  if (event.keyCode == 86) { //V
    ch.setKey(0xF);
  }
});

// When keyup is detected
document.addEventListener("keyup", function(event) {
  if (event.keyCode == 49) { //1
    ch.unsetKey(0x1);
  }
  if (event.keyCode == 50) { //2
    ch.unsetKey(0x2);
  }
  if (event.keyCode == 51) { //3
    ch.unsetKey(0x3);
  }
  if (event.keyCode == 52) { //4
    ch.unsetKey(0xC);
  }
  if (event.keyCode == 81) { //Q
    ch.unsetKey(0x4);
  }
  if (event.keyCode == 87) { //W
    ch.unsetKey(0x5);
  }
  if (event.keyCode == 69) { //E
    ch.unsetKey(0x6);
  }
  if (event.keyCode == 82) { //R
    ch.unsetKey(0xD);
  }
  if (event.keyCode == 65) { //A
    ch.unsetKey(0x7);
  }
  if (event.keyCode == 83) { //S
    ch.unsetKey(0x8);
  }
  if (event.keyCode == 68) { //D
    ch.unsetKey(0x9);
  }
  if (event.keyCode == 70) { //F
    ch.unsetKey(0xE);
  }
  if (event.keyCode == 90) { //Z
    ch.unsetKey(0xA);
  }
  if (event.keyCode == 88) { //X
    ch.unsetKey(0x0);
  }
  if (event.keyCode == 67) { //C
    ch.unsetKey(0xB);
  }
  if (event.keyCode == 86) { //V
    ch.unsetKey(0xF);
  }
});
