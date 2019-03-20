var chip8 = function() {

  // Display ( 64 * 32 )
  this.displayWidth = 64;
  this.displayHeight = 32;
  this.display = new Array(this.displayWidth * this.displayHeight);

  // Memory
  this.memory = new Uint8Array(4096);

  // Register
  this.v = new Array(16);
  this.i = null;

  // Stack
  this.stack = new Array(16);
  this.sp = null;

  // Variable Initializer
  this.temp = "0x00E0";

  this.step = null;
  this.running = null;
  this.delayTimer = null;
  this.soundTimer = null;

  this.keys = {};
  this.speed = 10;
  this.oddTick = 1;

  //history array index for visulizer
  this.pastPointer = -1;
  this.pastTotal = -1;

  //history array for visulizer
  this.past = [];
  this.pastStack = [];
  this.pastReg = [];
  this.pastPc = [];
  this.pastI = [];
  this.pastSp = [];
  this.pastSt = [];
  this.pastDt = [];
  this.temppause = 0;
  // Reset Function
  this.reset();
};

chip8.prototype = {

  // Loads program into memory
  loadProgram: function(program) {
    this.speed = 10;
    this.oddTick = 1;
    if (ch.oddTick % 2 == 1) {
      document.getElementById("pause").src = "images/button8.jpg";
    }
    this.oddTick = 2;
    i = 0;
    while (i < program.length) {
      this.memory[i + 0x200] = program[i];
      i++;
    }
  },

  //put key into keys array and set true to that key
  setKey: function(key) {
    this.keys[key] = true;
  },


  //delete the key in the array
  unsetKey: function(key) {
    delete this.keys[key];
  },


  //Fills the canvas display with pixels according to the game
  loadCanvas: function() {
    var i, x, y;
    dot.fillStyle = "black";
    dot.clearRect(0, 0, 640, 320);
    dot.save();
    for (i = 0; i < this.display.length; i++) {
      x = (i % 64) * 10;
      y = Math.floor(i / 64) * 10;
      if (this.display[i] == 1) {
        dot.fillRect(x, y, 10, 10);
      }
    }
  },


  //Displays opcode, registers, variables, stack
  listOpcode: function(s) {
    //Opcode
    if (this.temp != s) {
      document.getElementById(this.temp).style.backgroundColor = "black";
    } else {
      return;
    }
    document.getElementById(s).style.backgroundColor = "green";
    this.temp = s;
    //Register
    for (let i = 0; i < 16; i++) {
      let temp = this.v[i].toString(16);
      if (temp.length === 1) {
        temp = "0" + this.v[i].toString(16);
      }
      document.getElementById("v" + i.toString(16)).innerHTML = temp;
    }
    //Timers, i, pc, sp
    if (this.delayTimer.toString(16).length !== 2) {
      document.getElementById("dt").innerHTML = "0" + this.delayTimer.toString(16);
    }
    if (this.soundTimer.toString(16).length !== 2) {
      document.getElementById("st").innerHTML = "0" + this.soundTimer.toString(16);
    }
    if (this.i.toString(16).length !== 4) {
      document.getElementById("i").innerHTML = "0" * (4 - this.i.toString(16).length) + this.i.toString(16);
    }
    if (this.pc.toString(16).length !== 4) {
      document.getElementById("pc").innerHTML = "0" * (4 - this.pc.toString(16).length) + this.pc.toString(16);
    }
    if (this.sp.toString(16).length !== 2) {
      document.getElementById("sp").innerHTML = "0" + this.sp.toString(16);
    }
    //Stack
    for (let i = 0; i < 16; i++) {
      let result;
      if (this.stack[i] === undefined) {
        result = "undefined";
      } else {
        result = this.stack[i].toString(16);
        if (result.length !== 4) {
          result = "0" * (4 - result.length) + result;
        }
      }
      document.getElementById("s" + i.toString(16)).innerHTML = result;
    }
  },


  // Starts the program
  start: function() {
    this.running = true;
    this.draw();
  },


  draw: function() {
    for (var k = 0; k < ch.speed; k++) {
      if (ch.running) {
        //runs the opcode
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
      }
    }
    //cycle timers
    if (!(ch.step++ % 2)) {
      ch.handleTimers();
    }
    window.requestAnimationFrame(ch.draw);
  },


  handleTimers: function() {
    if (this.delayTimer > 0) {
      this.delayTimer--;
    }
    if (this.soundTimer > 0) {
      if (this.soundTimer == 1) {
        this.beep();
      }
      this.soundTimer--;
    }
  },


  beep: function() {
    var sound = document.getElementById("audio");
    sound.play();
  },


  // Stops the Program ( Do not have working keys yet so function is not usable )
  stop: function() {
    this.running = false;
  },


  reset: function() {
    var i;
    // Reset memory.
    for (i = 0; i < this.memory.length; i++) {
      this.memory[i] = 0;
    }

    var hexChars = [
      0xF0, 0x90, 0x90, 0x90, 0xF0, // 0
      0x20, 0x60, 0x20, 0x20, 0x70, // 1
      0xF0, 0x10, 0xF0, 0x80, 0xF0, // 2
      0xF0, 0x10, 0xF0, 0x10, 0xF0, // 3
      0x90, 0x90, 0xF0, 0x10, 0x10, // 4
      0xF0, 0x80, 0xF0, 0x10, 0xF0, // 5
      0xF0, 0x80, 0xF0, 0x90, 0xF0, // 6
      0xF0, 0x10, 0x20, 0x40, 0x40, // 7
      0xF0, 0x90, 0xF0, 0x90, 0xF0, // 8
      0xF0, 0x90, 0xF0, 0x10, 0xF0, // 9
      0xF0, 0x90, 0xF0, 0x90, 0x90, // A
      0xE0, 0x90, 0xE0, 0x90, 0xE0, // B
      0xF0, 0x80, 0x80, 0x80, 0xF0, // C
      0xE0, 0x90, 0x90, 0x90, 0xE0, // D
      0xF0, 0x80, 0xF0, 0x80, 0xF0, // E
      0xF0, 0x80, 0xF0, 0x80, 0x80 // F
    ];

    for (i = 0; i < hexChars.length; i++) {
      this.memory[i] = hexChars[i];
    }

    // Reset registers.
    for (i = 0; i < this.v.length; i++) {
      this.v[i] = 0;
    }

    // Reset display.
    for (i = 0; i < this.display.length; i++) {
      this.display[i] = 0;
    }

    // Reset stack pointer, I
    this.sp = 0;
    this.i = 0;

    // The program counter starts at 0x200, as
    // that is the start location of the program.
    this.pc = 0x200;
    this.delayTimer = 0;
    this.step = 0;
    this.running = false;
    this.soundTimer = 0;
  },


  setPixel: function(x, y) {
    var location,
      width = this.displayWidth,
      height = this.displayHeight;

    // If the pixel exceeds the dimensions, wrap it back around.
    if (x > width) {
      x = x - width;
    }
    else if (x < 0) {
      x = x + width;
    }

    if (y > height) {
      y = y - height;
    }
    else if (y < 0) {
      y = y + height;
    }
    location = x + (y * width);
    this.display[location] = this.display[location] ^ 1;
    return !this.display[location];
  },


  parseOpcode: function(opcode) {
    switch (opcode & 0xf000) {

      case 0x0000:
        switch (opcode) {

          // 00E0(Clears the Screen):
          case 0x00E0:
            this.listOpcode("0x00E0");
            break;

            // 00EE(Returns from Subroutine):
          case 0x00EE:
            this.listOpcode("0x00EE");
            break;
        }
        break;

        // 1NNN(Jumps to Address NNN):
      case 0x1000:
        this.listOpcode("0x1NNN");
        break;

        // 2NNN(Calls Subroutine at NNN):
      case 0x2000:
        this.listOpcode("0x2NNN");
        break;

        // 3XNN(Skips the next instruction if VX == NN):
      case 0x3000:
        this.listOpcode("0x3XNN");
        break;

        // 4XNN(Skips the next instruction if VX == NN):
      case 0x4000:
        this.listOpcode("0x4XNN");
        break;

        // 5XY0(Skips instruction if Vx == Vy):
      case 0x5000:
        this.listOpcode("0x5XY0");
        break;

        // 6XNN(Sets Vx to NN):
      case 0x6000:
        this.listOpcode("0x6XNN");
        break;

      // 7XNN(Adds NN to Vx):
      case 0x7000:
        this.listOpcode("0x7XNN");
        break;

      //NUMERICAL OPERATIONS
      case 0x8000:
        switch (opcode & 0x000f) {

        // 8XY0(Sets Vx to the value of Vy)
          case 0x0000:
            this.listOpcode("0x8XY0");
            break;

          // 8XY1(Sets Vx to the value of Vy or Vx)
          case 0x0001:
            this.listOpcode("0x8XY1");
            break;

          // 8XY2(Sets Vx to the value of Vy and Vx)
          case 0x0002:
            this.listOpcode("0x8XY2");
            break;

          // 8XY3(Sets Vx to the value of Vy xor Vx)
          case 0x0003:
            this.listOpcode("0x8XY3");
            break;

          // 8XY4(Adds Vy to Vx)
          case 0x0004:
            this.listOpcode("0x8XY4");
            break;

          // 8XY5(Vx -= Vy)
          case 0x0005:
            this.listOpcode("0x8XY5");
            break;

          // 8XY6(Stores Least Significant Bit and shifts Vx to the right by 1)
          case 0x0006:
            this.listOpcode("0x8XY6");
            break;

          // 8XY7(Subtracts Vx from Vy)
          case 0x0007:
            this.listOpcode("0x8XY7");
            break;

          // 8XYE(Stores Most Significant Bit and shifts Vx to the left by 1)
          case 0x000E:
            this.listOpcode("0x8XYE");
            break;
        }
        break;

      //9XY0(Skips instruction if Vx != Vy)
      case 0x9000:
        this.listOpcode("0x9XY0");
        break;

      //ANNN(Sets I to Address NNN)
      case 0xA000:
        this.listOpcode("0xANNN");
        break;

      //BNNN(Sets PC to V[0] + NNN)
      case 0xB000:
        this.listOpcode("0xBNNN");
        break;

      //CXNN(Sets Vx to bitwise and operation on random number and NN)
      case 0xC000:
        this.listOpcode("0xCXNN");
        break;

      //DXYN(Displays sprite at (Vx,Vy), with height of N)
      case 0xD000:
        this.listOpcode("0xDXYN");
        break;

      case 0xE000:
        switch (opcode & 0x00FF) {

        // Ex9E(Skip next instruction if the key with the value Vx is pressed)
          case 0x009E:
            this.listOpcode("0xEX9E");
            break;

          // ExA1(Skip next instruction if the key with the value Vx is NOT pressed)
          case 0x00A1:
            this.listOpcode("0xEXA1");
            break;
        }
        break;

      case 0xF000:
        switch (opcode & 0x00FF) {

          // Fx07(Set Vx = delay timer value)
          case 0x0007:
            this.listOpcode("0xFX07");
            break;

          // Fx0A(Wait for a keypress, then store the value of the key in Vx)
          case 0x000A:
            this.listOpcode("0xFX0A");
            return;

          // Fx15(Set delay timer = Vx)
          case 0x0015:
            this.listOpcode("0xFX15");
            break;

          // Fx18(Set sound timer = Vx)
          case 0x0018:
            this.listOpcode("0xFX18");
            break;

          // FX1E(I += Vx)
          case 0x001E:
            this.listOpcode("0xFX1E");
            break;

            //FX29(Sets I to location of sprite for Vx)
          case 0x0029:
            this.listOpcode("0xFX29");
            break;

          // FX33(Stores the binary-coded decimal representation of VX)
          case 0x0033:
            this.listOpcode("0xFX33");
            break;

          // FX55(write register into memory)
          case 0x0055:
            this.listOpcode("0xFX55");
            break;


          // FX65(write memory into register)
          case 0x0065:
            this.listOpcode("0xFX65");
            break;
        }
        break;

      default:
        throw new Error("Error at opcode: " + opcode.toString(16) + ".\n Now Terminating the program...");
    }
  },


  opCycle: function() {
    //sets the opcode as the same as the program counter - "loads" the opcode in
    var opcode = this.memory[this.pc] << 8 | this.memory[this.pc + 1];
    //shifts the opcode value for X into a var x
    var x = (opcode & 0x0F00) >> 8;
    //shifts the opcode value for Y into a var y
    var y = (opcode & 0x00F0) >> 4;
    //increments the program counter by 2 positions(1 opcode occupies 2 positions in memory)
    this.pc += 2;

    // Check first nibble to determine opcode.
    switch (opcode & 0xf000) {
      case 0x0000:

        switch (opcode) {

        // 00E0(Clears the Screen)
          case 0x00E0:
            dot.clearRect(0, 0, 640, 320);
            var i = 0;
            while (i < this.display.length) {
              this.display[i] = 0;
              i++;
            }
            this.listOpcode("0x00E0");
            break;

          // 00EE(Returns from Subroutine)
          case 0x00EE:
            this.pc = this.stack[--this.sp];
            this.listOpcode("0x00EE");
            break;

        }
        break;

      // 1NNN(Jumps to Address NNN)
      case 0x1000:
        this.pc = opcode & 0xFFF;
        this.listOpcode("0x1NNN");
        break;

      // 2NNN(Calls Subroutine at NNN)
      case 0x2000:
        this.stack[this.sp] = this.pc;
        this.sp++;
        this.pc = opcode & 0x0FFF;
        this.listOpcode("0x2NNN");
        break;

      // 3XNN(Skips the next instruction if VX == NN)
      case 0x3000:
        if (this.v[x] === (opcode & 0xFF)) {
          this.pc += 2;
        }
        this.listOpcode("0x3XNN");
        break;

      // 4XNN(Skips the next instruction if VX == NN)
      case 0x4000:
        if (this.v[x] != (opcode & 0x00FF)) {
          this.pc += 2;
        }
        this.listOpcode("0x4XNN");
        break;

      // 5XY0(Skips instruction if Vx == Vy)
      case 0x5000:
        if (this.v[x] === this.v[y]) {
          this.pc += 2;
        }
        this.listOpcode("0x5XY0");
        break;

      // 6XNN(Sets Vx to NN)
      case 0x6000:
        this.v[x] = opcode & 0xFF;
        this.listOpcode("0x6XNN");
        break;

      // 7XNN(Adds NN to Vx)
      case 0x7000:
        var val = (opcode & 0xFF) + this.v[x];
        if (val > 255) {
          val = val - 256;
        }
        this.v[x] = val;
        this.listOpcode("0x7XNN");
        break;

      //NUMERICAL OPERATIONS
      case 0x8000:
        switch (opcode & 0x000f) {
          // 8XY0(Sets Vx to the value of Vy)
          case 0x0000:
            this.v[x] = this.v[y];
            this.listOpcode("0x8XY0");
            break;

          // 8XY1(Sets Vx to the value of Vy or Vx)
          case 0x0001:
            this.v[x] = this.v[x] | this.v[y];
            this.listOpcode("0x8XY1");
            break;

          // 8XY2(Sets Vx to the value of Vy and Vx)
          case 0x0002:
            this.v[x] = this.v[x] & this.v[y];
            this.listOpcode("0x8XY2");
            break;

          // 8XY3(Sets Vx to the value of Vy xor Vx)
          case 0x0003:
            this.v[x] = this.v[x] ^ this.v[y];
            this.listOpcode("0x8XY3");
            break;

          // 8XY4(Adds Vy to Vx)
          case 0x0004:
            this.v[x] = this.v[x] + this.v[y];
            this.v[0xF] = +(this.v[x] > 255);
            if (this.v[x] > 255) {
              this.v[x] = this.v[x] - 256;
            }
            this.listOpcode("0x8XY4");
            break;

          // 8XY5(Vx -= Vy)
          case 0x0005:
            this.v[0xF] = +(this.v[x] > this.v[y]);
            this.v[x] = this.v[x] - this.v[y];
            if (this.v[x] < 0) {
              this.v[x] = this.v[x] + 256;
            }
            this.listOpcode("0x8XY5");
            break;

          // 8XY6(Stores Least Significant Bit and shifts Vx to the right by 1)
          case 0x0006:
            this.v[0xF] = this.v[x] & 0x1;
            this.v[x] = this.v[x] >> 1;
            this.listOpcode("0x8XY6");
            break;

          // 8XY7(Subtracts Vx from Vy)
          case 0x0007:
            this.v[0xF] = +(this.v[y] > this.v[x]);
            this.v[x] = this.v[y] - this.v[x];
            if (this.v[x] < 0) {
              this.v[x] = this.v[x] + 256;
            }
            this.listOpcode("0x8XY7");
            break;

          // 8XYE(Stores Most Significant Bit and shifts Vx to the left by 1)
          case 0x000E:
            this.v[0xF] = +(this.v[x] & 0x80);
            this.v[x] = this.v[x] << 1;
            if (this.v[x] > 255) {
              this.v[x] = this.v[x] - 256;
            }
            this.listOpcode("0x8XYE");
            break;
        }
        break;

      //Test 9XY0(Skips instruction if Vx != Vy)
      case 0x9000:
        if (this.v[x] != this.v[y]) {
          this.pc += 2;
        }
        this.listOpcode("0x9XY0");
        break;
        //Test ANNN(Sets I to Address NNN)
      case 0xA000:
        this.i = opcode & 0xFFF;
        this.listOpcode("0xANNN");
        break;

      //Test BNNN(Sets PC to V[0] + NNN)
      case 0xB000:
        this.pc = (opcode & 0xFFF) + this.v[0];
        this.listOpcode("0xBNNN");
        break;

      //Test CXNN(Sets Vx to bitwise and operation on random number and NN)
      case 0xC000:
        this.v[x] = Math.floor(Math.random() * 0xFF) & (opcode & 0xFF);
        this.listOpcode("0xCXNN");
        break;

      //Test DXYN(Displays sprite at (Vx,Vy), with height of N)
      case 0xD000:
        this.v[0xF] = 0;
        var height = opcode & 0x000F;
        var registerX = this.v[x];
        var registerY = this.v[y];
        var x, y, spr;

        for (y = 0; y < height; y++) {
          spr = this.memory[this.i + y];
          for (x = 0; x < 8; x++) {
            if ((spr & 0x80) > 0) {
              if (this.setPixel(registerX + x, registerY + y)) {
                this.v[0xF] = 1;
              }
            }
            spr <<= 1;
          }
        }
        this.loadCanvas();
        this.listOpcode("0xDXYN");
        break;

      case 0xE000:
        switch (opcode & 0x00FF) {
          // Ex9E(Skip next instruction if the key with the value Vx is pressed)
          case 0x009E:
            if (this.keys[this.v[x]]) {
              this.pc += 2;
            }
            this.listOpcode("0xEX9E");
            break;

          // ExA1(Skip next instruction if the key with the value Vx is NOT pressed)
          case 0x00A1:
            if (!this.keys[this.v[x]]) {
              this.pc += 2;
            }
            break;
            this.listOpcode("0xEXA1");
            break;
        }
        break;

      case 0xF000:
        switch (opcode & 0x00FF) {

          // Fx07(Set Vx = delay timer value)
          case 0x0007:
            this.v[x] = this.delayTimer;
            this.listOpcode("0xFX07");
            break;

          // TODO: fix case 0x000A, wait for keyboard
          // Fx0A(Wait for a keypress, then store the value of the key in Vx)
          case 0x000A:
            var oldKeyDown = this.setKey;
            this.setKey = function(key) {
              ch.v[x] = key;
              ch.setKey = oldKeyDown.bind(ch);
              ch.setKey.apply(ch, arguments);
              ch.start();
            }
            this.stop();
            this.listOpcode("0xFX0A");
            return;

          // TODO: fix case 0x0015, wait for timer
          // Fx15(Set delay timer = Vx)
          case 0x0015:
            this.delayTimer = this.v[x];
            this.listOpcode("0xFX15");
            break;

          // Fx18(Set sound timer = Vx)
          case 0x0018:
            this.soundTimer = this.v[x];
            this.listOpcode("0xFX18");
            break;

          // FX1E(I += Vx)
          case 0x001E:
            this.i += this.v[x];
            this.listOpcode("0xFX1E");
            break;

          //FX29(Sets I to location of sprite for Vx)
          case 0x0029:
            this.i = this.v[x] * 5;
            this.listOpcode("0xFX29");
            break;

          // FX33(Stores the binary-coded decimal representation of VX)
          case 0x0033:
            var number = this.v[x];
            for (var i = 3; i > 0; i--) {
              this.memory[this.i + i - 1] = parseInt(number % 10);
              number /= 10;
            }
            this.listOpcode("0xFX33");
            break;

          // FX55(write register into memory)
          case 0x0055:
            for (var i = 0; i <= x; i++) {
              this.memory[this.i + i] = this.v[i];
            }
            this.listOpcode("0xFX55");
            break;

          // FX65(write memory into register)
          case 0x0065:
            for (var i = 0; i <= x; i++) {
              this.v[i] = this.memory[this.i + i];
            }
            this.listOpcode("0xFX65");
            break;
        }
        break;

      default:
        throw new Error("Error at opcode: " + opcode.toString(16) + ".\n Now Terminating the program...");
  }
}
};
