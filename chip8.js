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
  this.output = "";
  this.opnumber = "";
  this.ophex = "";
  this.outdisplay = "";
  this.outstack = "";
  this.temp = "0x00E0";

  this.step = null;
  this.running = null;
  this.delayTimer = null;
  this.soundTimer = null;

  this.keys = {};
  this.speed = 10;

  // Reset Function
  this.reset();

};

function upSpeed(){
  if(ch.speed < 100){
      ch.speed ++;
  }
  console.log(ch.speed);
}

function downSpeed(){
  if(ch.speed > 1){
    ch.speed --;
  }
  console.log(ch.speed);
}

function resetSpeed(){
  ch.speed = 10;
  console.log(ch.speed);
}

chip8.prototype = {

  // Loads program into memory
  loadProgram: function(program) {
    i = 0;
    while (i < program.length) {
      this.memory[i + 0x200] = program[i];
      i++;
    }
    //console.log(this.memory);
  },

  setKey: function(key) {
    this.keys[key] = true;
  },

  unsetKey: function(key) {
    delete this.keys[key];
  },

  // Creates an string and convert memroy into hex and put into string
  // [.toString(16)] with newline break for each 24 character
  listMemory: function() {
    for (var i = 0; i < this.memory.length; i++) {
      this.output += this.memory[i].toString(16) + " ";
      if (!((i + 1) % 16)) {
        this.output += "<br />";
      }
    }
    document.getElementById("output").innerHTML = this.output;
  },

  // Fills the canvas display with pixels according to the game
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

  // draw: function() {
  //   dot.fillRect(x() * 10, y() * 10, 10, 10);
  //   window.requestAnimationFrame(ch.draw);
  // },

  // x: function() {
  //   return i++;
  // },
  //
  // y: function() {
  //   if (i == 64) {
  //     i = 0;
  //     return j++;
  //   }
  //   if (j == 32) {
  //     i = 0;
  //     j = 0;
  //     dot.clearRect(0, 0, 640, 320);
  //   }
  //   return j;
  // },

  // Creates an string and convert memroy into hex and put into string [.toString(16)]
  // with newline break for each 24 character
  listDisplay: function() {
    for (var i = 0; i < this.display.length; i++) {
      this.outdisplay += this.display[i].toString() + " ";
      if (!((i + 1) % 64)) {
        this.outdisplay += "<br />";
      }
    }
    document.getElementById("outdisplay").innerHTML = this.outdisplay;
  },

  // Displays Opcode
  listOpcode: function(s) {
    if(this.temp != s){
      document.getElementById(this.temp).style.backgroundColor="black";
    }
    else {
      return;
    }
    this.opnumber = s;
    this.opnumber += "<br />";
    document.getElementById("opnumber").innerHTML = this.opnumber;
    document.getElementById(s).style.backgroundColor="green";
    this.temp = s;
  },


  // Prototype of Visualizer
  visualizeMemory: function() {
    for (i = 0; i < this.memory.length; i++) {
      if (i < 0x200) {
        this.memory[i] = 1;
      } else if (i < 0x06A0) {
        this.memory[i] = 2;
      } else if (i < 0x06D0) {
        this.memory[i] = 3;
      } else if (i < 0x06F0) {
        this.memory[i] = 4;
      } else if (i < 0x0700) {
        this.memory[i] = 5;
      } else {
        this.memory[i] = 6;
      }
    }
  },

  // Starts the program but loads only for 1000 cycle (as a limit) since we do not have a stop key yet.
  start: function() {
    var i;
    this.running = true;
    var self = this;
    requestAnimFrame(function me() {
      for (var i = 0; i < ch.speed; i++) {
        if (self.running) {
          //runs the opcode
          self.opCycle();
        }
      }
      //flag updater - triggers when the canvas is updated
      if (self.drawFlag) {
        self.loadCanvas();
        self.drawFlag = false;
      }
      //cycle timers
      if (!(self.step++ % 2)) {
        self.handleTimers();
      }

      requestAnimFrame(me);

    });
  },

  listV: function() {
    this.stack = "";
    for (i = 0; i < 16; i++) {
      this.outstack += this.v[i].toString(16);
    }
    document.getElementById("outdisplay").innerHTML = this.outstack;
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

    // If the pixel exceeds the dimensions,
    // wrap it back around.
    if (x > width) {
      x = x - width;
    } else if (x < 0) {
      x = x + width;
    }

    if (y > height) {
      y = y - height;
    } else if (y < 0) {
      y = y + height;
    }

    location = x + (y * width);

    this.display[location] = this.display[location] ^ 1;

    return !this.display[location];
  },

  opCycle: function() {
    //this.listV();
    //sets the opcode as the same as the program counter - "loads" the opcode in
    var opcode = this.memory[this.pc] << 8 | this.memory[this.pc + 1];
    //shifts the opcode value for X into a var x
    var x = (opcode & 0x0F00) >> 8;
    //shifts the opcode value for Y into a var y
    var y = (opcode & 0x00F0) >> 4;
    //increments the program counter by 2 positions(1 opcode occupies 2 positions in memory)
    this.pc += 2;

    // var counter = 0;
    // for(k = 0; k<100; k++){
    //   console.log(opcode.toString(16)); //slow it down
    // }
    //
    // counter ++;
    // if(counter == 1000){
    //   this.running = false;
    // }

    //console.log(opcode.toString(16));

    //console.log("opcode: "+opcode.toString(16));

    // Check first nibble to determine opcode.
    switch (opcode & 0xf000) {

      case 0x0000:

        switch (opcode) {

          // 00E0(Clears the Screen):
          case 0x00E0:
            dot.clearRect(0, 0, 640, 320);
            var i = 0;
            while (i < this.display.length) {
              this.display[i] = 0;
              i++;
            }
            this.listOpcode("0x00E0");
            break;

            // 00EE(Returns from Subroutine):
          case 0x00EE:
            this.pc = this.stack[--this.sp];
            this.listOpcode("0x00EE");
            break;

        }

        break;

        // 1NNN(Jumps to Address NNN):
      case 0x1000:
        this.pc = opcode & 0xFFF;
        this.listOpcode("0x1NNN");
        break;

        // 2NNN(Calls Subroutine at NNN):
      case 0x2000:
        this.stack[this.sp] = this.pc;
        this.sp++;
        this.pc = opcode & 0x0FFF;
        console.log("hello");
        this.listOpcode("0x2NNN");
        break;

        // 3XNN(Skips the next instruction if VX == NN):
      case 0x3000:
        if (this.v[x] === (opcode & 0xFF)) {
          this.pc += 2;
        }
        this.listOpcode("0x3XNN");
        break;

        // 4XNN(Skips the next instruction if VX == NN):
      case 0x4000:
        if (this.v[x] != (opcode & 0x00FF)) {
          this.pc += 2;
        }
        this.listOpcode("0x4XNN");
        break;

        // 5XY0(Skips instruction if Vx == Vy):
      case 0x5000:
        if (this.v[x] === this.v[y]) {
          this.pc += 2;
        }
        this.listOpcode("0x5XY0");
        break;

        // 6XNN(Sets Vx to NN):
      case 0x6000:
        this.v[x] = opcode & 0xFF;
        this.listOpcode("0x6XNN");
        break;

        // 7XNN(Adds NN to Vx):
      case 0x7000:
        var val = (opcode & 0xFF) + this.v[x]

        if (val > 255) {
          val = val - 256;
        }

        this.v[x] = val;
        this.listOpcode("0x7XNN");
        break;

        //NUMERICAL OPERATIONS
      case 0x8000:
        switch (opcode & 0x000f) {
          // 8XY0(Sets Vx to the value of Vy):
          case 0x0000:
            this.v[x] = this.v[y];
            this.listOpcode("0x8XY0");
            break;

            // 8XY1(Sets Vx to the value of Vy or Vx):
          case 0x0001:
            this.v[x] = this.v[x] | this.v[y];
            this.listOpcode("0x8XY1");
            break;

            // 8XY2(Sets Vx to the value of Vy and Vx):
          case 0x0002:
            this.v[x] = this.v[x] & this.v[y];
            this.listOpcode("0x8XY2");
            break;

            // 8XY3(Sets Vx to the value of Vy xor Vx):
          case 0x0003:
            this.v[x] = this.v[x] ^ this.v[y];
            this.listOpcode("0x8XY3");
            break;

            // 8XY4(Adds Vy to Vx):
          case 0x0004:
            this.v[x] = this.v[x] + this.v[y];
            this.v[0xF] = +(this.v[x] > 255);
            if (this.v[x] > 255) {
              this.v[x] = this.v[x] - 256;
            }
            this.listOpcode("0x8XY4");
            break;

            // 8XY5(Vx -= Vy):
          case 0x0005:
            this.v[0xF] = +(this.v[x] > this.v[y]);
            this.v[x] = this.v[x] - this.v[y];
            if (this.v[x] < 0) {
              this.v[x] = this.v[x] + 256;
            }
            this.listOpcode("0x8XY5");
            break;

            // 8XY6(Stores Least Significant Bit and shifts Vx to the right by 1):
          case 0x0006:
            this.v[0xF] = this.v[x] & 0x1;
            this.v[x] = this.v[x] >> 1;
            this.listOpcode("0x8XY6");
            break;

            // 8XY7(Subtracts Vx from Vy):
          case 0x0007:
            this.v[0xF] = +(this.v[y] > this.v[x]);
            this.v[x] = this.v[y] - this.v[x];
            if (this.v[x] < 0) {
              this.v[x] = this.v[x] + 256;
            }
            this.listOpcode("0x8XY7");
            break;


            // 8XYE(Stores Most Significant Bit and shifts Vx to the left by 1):
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

        //Test 9XY0(Skips instruction if Vx != Vy):
      case 0x9000:
        if (this.v[x] != this.v[y]) {
          this.pc += 2;
        }
        this.listOpcode("0x9XY0");
        break;

        //Test ANNN(Sets I to Address NNN):
      case 0xA000:
        this.i = opcode & 0xFFF;
        this.listOpcode("0xANNN");
        break;

        //Test BNNN(Sets PC to V[0] + NNN):
      case 0xB000:
        this.pc = (opcode & 0xFFF) + this.v[0];
        this.listOpcode("0xBNNN");
        break;

        //Test CXNN(Sets Vx to bitwise and operation on random number and NN):
      case 0xC000:
        this.v[x] = Math.floor(Math.random() * 0xFF) & (opcode & 0xFF)
        this.listOpcode("0xCXNN");
        break;

        //Test DXYN(Displays sprite at (Vx,Vy), with height of N):
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
        this.drawFlag = true;
        this.listOpcode("0xDXYN");

        break;

      case 0xE000:
        switch (opcode & 0x00FF) {
          // TODO: fix case 0x009E, wait for keyboard
          // Ex9E - SKP Vx
          // Skip next instruction if the key with the value Vx is pressed.
          case 0x009E:
            //need to be changed or modified
            if (this.keys[this.v[x]]) {
              this.pc += 2;
            }
            this.listOpcode("0xEX9E");

            break;

            // TODO: fix case 0x00A1, wait for keyboard
            // ExA1 - SKNP Vx
            // Skip next instruction if the key with the value Vx is NOT pressed.
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

          // TODO: fix case 0x0007, wait for timer
          // Fx07 - LD Vx, DT
          // Set Vx = delay timer value.
          case 0x0007:
            this.v[x] = this.delayTimer;
            this.listOpcode("0xFX07");
            break;

            // TODO: fix case 0x000A, wait for keyboard
            // Fx0A - LD Vx, K
            // Wait for a keypress, then store the value of the key in Vx.
          case 0x000A:
            var oldKeyDown = this.setKey;
            var self = this;

            this.setKey = function(key) {
              self.v[x] = key;

              self.setKey = oldKeyDown.bind(self);
              self.setKey.apply(self, arguments);

              self.start();
            }

            this.stop();
            this.listOpcode("0xFX0A");
            return;

            // TODO: fix case 0x0015, wait for timer
            // Fx15 - LD DT, Vx
            // Set delay timer = Vx.
          case 0x0015:
            this.delayTimer = this.v[x];
            this.listOpcode("0xFX15");
            break;

            // TODO: fix case 0x0018, wait for timer
            // Fx18 - LD ST, Vx
            // Set sound timer = Vx.
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
