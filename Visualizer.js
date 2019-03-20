//forward function - goes forward by one opcode - if pastPointer is at the top(the most current part of the opcode), then it will start performing opcode
function forward() {
  if(ch.oddTick % 2 == 0){
    pause();
  }
  if (ch.pastPointer == ch.pastTotal) {
    ch.past.push((ch.memory[ch.pc] << 8 | ch.memory[ch.pc + 1]));
    for (var i = 0; i < 16; i++) {
      ch.pastStack.push(ch.stack[i]);
      ch.pastReg.push(ch.v[i]);
    }
    ch.pastPc.push(ch.pc);
    ch.pastI.push(ch.i);
    ch.pastSp.push(ch.sp);
    ch.pastSt.push(ch.soundTimer);
    ch.pastDt.push(ch.delayTimer);
    ch.pastPointer++;
    ch.pastTotal++;
    ch.opCycle();
    ch.beep();
  }
  else {
    ch.pastPointer++;
    ch.parseOpcode(ch.past[ch.pastPointer]);
    ch.beep();
    //Register
    for (let i = 0; i < 16; i++) {
      let temp = ch.pastReg[(ch.pastPointer * 16) + i].toString(16);
      if (temp.length === 1) {
        temp = "0" + ch.pastReg[(ch.pastPointer * 16) + i].toString(16);
      }
      document.getElementById("v" + i.toString(16)).innerHTML = temp;
    }
    // //Timers, i, pc, sp
    if (ch.pastDt[ch.pastPointer].toString(16).length !== 2) {
      document.getElementById("dt").innerHTML = "0" + ch.pastDt[ch.pastPointer].toString(16);
    }
    if (ch.pastSt[ch.pastPointer].toString(16).length !== 2) {
      document.getElementById("st").innerHTML = "0" + ch.pastSt[ch.pastPointer].toString(16);
    }
    if (ch.pastI[ch.pastPointer].toString(16).length !== 4) {
      document.getElementById("i").innerHTML = "0" * (4 - ch.pastI[ch.pastPointer].toString(16).length) + ch.pastI[ch.pastPointer].toString(16);
    }
    if (ch.pastPc[ch.pastPointer].toString(16).length !== 4) {
      document.getElementById("pc").innerHTML = "0" * (4 - ch.pastPc[ch.pastPointer].toString(16).length) + ch.pastPc[ch.pastPointer].toString(16);
    }
    if (ch.pastSp[ch.pastPointer].toString(16).length !== 2) {
      document.getElementById("sp").innerHTML = "0" + ch.pastSp[ch.pastPointer].toString(16);
    }
    //Stack
    for (let i = 0; i < 16; i++) {
      let result;
      if (ch.pastStack[(ch.pastPointer * 16) + i] === undefined) {
        result = "undefined";
      } else {
        result = ch.pastStack[(ch.pastPointer * 16) + i].toString(16);
        if (result.length !== 4) {
          result = "0" * (4 - result.length) + result;
        }
      }
      document.getElementById("s" + i.toString(16)).innerHTML = result;
    }
  }
}

//backward function - goes back by one opcode
function backward() {
  if(ch.oddTick % 2 == 0){
    pause();
  }
  if (ch.pastPointer > 1) {
    ch.parseOpcode(ch.past[ch.pastPointer]);
    ch.pastPointer--;
    ch.beep();
    // Register
    for (let i = 0; i < 16; i++) {
      let temp = ch.pastReg[(ch.pastPointer * 16) + i].toString(16);
      if (temp.length === 1) {
        temp = "0" + ch.pastReg[(ch.pastPointer * 16) + i].toString(16);
      }
      document.getElementById("v" + i.toString(16)).innerHTML = temp;
    }
    // //Timers, i, pc, sp
    if (ch.pastDt[ch.pastPointer].toString(16).length !== 2) {
      document.getElementById("dt").innerHTML = "0" + ch.pastDt[ch.pastPointer].toString(16);
    }
    if (ch.pastSt[ch.pastPointer].toString(16).length !== 2) {
      document.getElementById("st").innerHTML = "0" + ch.pastSt[ch.pastPointer].toString(16);
    }
    if (ch.pastI[ch.pastPointer].toString(16).length !== 4) {
      document.getElementById("i").innerHTML = "0" * (4 - ch.pastI[ch.pastPointer].toString(16).length) + ch.pastI[ch.pastPointer].toString(16);
    }
    if (ch.pastPc[ch.pastPointer].toString(16).length !== 4) {
      document.getElementById("pc").innerHTML = "0" * (4 - ch.pastPc[ch.pastPointer].toString(16).length) + ch.pastPc[ch.pastPointer].toString(16);
    }
    if (ch.pastSp[ch.pastPointer].toString(16).length !== 2) {
      document.getElementById("sp").innerHTML = "0" + ch.pastSp[ch.pastPointer].toString(16);
    }
    //Stack
    for (let i = 0; i < 16; i++) {
      let result;
      if (ch.pastStack[(ch.pastPointer * 16) + i] === undefined) {
        result = "undefined";
      }
      else {
        result = ch.pastStack[(ch.pastPointer * 16) + i].toString(16);
        if (result.length !== 4) {
          result = "0" * (4 - result.length) + result;
        }
      }
      document.getElementById("s" + i.toString(16)).innerHTML = result;
    }
  }
}

//speeds up the game by 1(caps at 100)
function upSpeed() {
  if (ch.speed < 100) {
    ch.speed = ch.speed + 0.2;
  }
  console.log("Speed: " + ch.speed);
  document.getElementById("output").innerHTML = "Speed:" + Math.round(ch.speed * 100) / 100;
}

//slows down the game(stop at 0)
function downSpeed() {
  if (ch.speed > 1) {
    ch.speed = ch.speed - 0.2;
  }
  console.log("Speed: " + ch.speed);
  document.getElementById("output").innerHTML = "Speed:" + Math.round(ch.speed * 100) / 100;
}

//resets speed to a unit of 10
function resetSpeed() {
  ch.oddTick++;
  ch.speed = 10;
  console.log("Speed:" + ch.speed);
  document.getElementById("pause").src = "images/button8.jpg";
  document.getElementById("output").innerHTML = "Speed:" + Math.round(ch.speed * 100) / 100;
}

//toggles pause/unpause for the game
function pause() {
  ch.oddTick++;
  if (ch.oddTick % 2 == 1) {
    ch.temppause = ch.speed;
    ch.speed = 0;
    console.log("Speed: " + ch.speed);
    document.getElementById("pause").src = "images/button9.jpg";
    document.getElementById("output").innerHTML = "Speed:" + Math.round(ch.speed * 100) / 100;
  }
  else {
    ch.speed = ch.temppause;
    console.log("Speed: " + ch.speed);
    document.getElementById("pause").src = "images/button8.jpg";
    document.getElementById("output").innerHTML = "Speed:" + Math.round(ch.speed * 100) / 100;
  }
}
