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

  // Reset Function
  this.reset();

};


chip8.prototype = {

  // Loads program into memory
  loadProgram: function(program) {
    i = 0;
    while (i < program.length) {
      this.memory[i + 0x200] = program[i];
      i++;
    }
    console.log(this.memory);
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

    for (i = 0; i < this.display.length; i++) {
      x = (i % 64) * 10;
      y = Math.floor(i / 64) * 10;
      if (this.display[i] == 1) {
        dot.fillRect(x, y, 10, 10);
      }
    }
  },

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
    this.opnumber += s;
    this.opnumber += "<br />";
    //document.getElementById("opnumber").innerHTML = this.opnumber;
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
    this.running = true;
    var c = 0;
    while (this.running) {
      this.opCycle();

      c++;
      if (c == 1000) {
        console.log("break at " + c);
        break;
      }

    }
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

    var opcode = this.memory[this.pc] << 8 | this.memory[this.pc + 1];
    var x = (opcode & 0x0F00) >> 8;
    var y = (opcode & 0x00F0) >> 4;
    this.pc += 2;

    console.log("opcode: "+opcode.toString(16));

    // Check first nibble to determine opcode.
    switch (opcode & 0xf000) {

      case 0x0000:

        switch (opcode) {

          // OOE0 - CLS
          // CLear the display.
          case 0x00E0:
          dot.clearRect(0, 0, 640, 320);
          var i = 0;
          while (i < this.display.length) {
            this.display[i] = 0;
            i++;
          }
            //this.listOpcode("0x00E0");
            break;

            // 00EE - RET
            // Return from subroutine.
          case 0x00EE:
            this.sp = this.sp - 1;
            this.pc = this.stack[this.sp];
            //this.listOpcode("0x00EE");
            break;

        }

        break;

        // 1nnnn - JP addr
        // Jump to location nnn.
      case 0x1000:
        this.pc = opcode & 0xFFF;
        //this.listOpcode("0x1000");
        break;

        // 2nnnn - CALL addr
        // Call subroutine at nnnn.
      case 0x2000:
        this.stack[this.sp] = this.pc;
        this.sp++;
        this.pc = opcode & 0x0FFF;
        //this.listOpcode("0x2000");
        break;

        // 2xkk - SE Vx, byte
        // Skip next instruction if vX = kk.
      case 0x3000:
        if (this.v[x] === (opcode & 0xFF)) {
          this.pc += 2;
        }
        //this.listOpcode("0x3000");
        break;

        // 4xkk - SNE Vx, byte
        // Skip next instruction if vX != kk.
      case 0x4000:
        if (this.v[x] != (opcode & 0x00FF)) {
          this.pc += 2;
        }
        //this.listOpcode("0x4000");
        break;

        // 5xy0 - SE Vx, Vy
        // Skip next instruction if vX = vY.
      case 0x5000:
        if (this.v[x] === this.v[y]) {
          this.pc += 2;
        }
        //this.listOpcode("0x5000");
        break;

        // 6xkk - LD Vx, byte
        // Set Vx = kk.
      case 0x6000:
        this.v[x] = opcode & 0xFF;
        //this.listOpcode("0x6000");
        break;

        // 7xkk - ADD Vx, byte
        // Set Vx = Vx + kk.
      case 0x7000:
        var val = (opcode & 0xFF) + this.v[x]

        if (val > 255) {
          val = val - 256;
        }

        this.v[x] = val;
        //this.listOpcode("0x7000");
        break;

      case 0x8000:

        switch (opcode & 0x000f) {

          // 8xy0 - LD Vx, Vy
          // Set Vx = Vy.
          case 0x0000:
            this.v[x] = this.v[y];
            //this.listOpcode("0x8000");
            break;

            // 8xu1 - OR Vx, Vy
            // Set vX = vX OR Vy.
          case 0x0001:
            this.v[x] = this.v[x] | this.v[y];
            //this.listOpcode("0x8001");
            break;

            // 8xy2 - AND Vx, Vy
            // Set Vx = Vx AND Vy.
          case 0x0002:
            this.v[x] = this.v[x] & this.v[y];
            //this.listOpcode("0x0002");
            break;

            // 8xy3X - OR Vx, Vy
            // Set Vx = Vx XOR Vy.
          case 0x0003:
            this.v[x] = this.v[x] ^ this.v[y];
            //this.listOpcode("0x0003");
            break;

            // 8xy4 - ADD Vx, Vy
            // Set Vx = Vx + Vy, set Vf = carry.
          case 0x0004:
            this.v[x] = this.v[x] + this.v[y];
            this.v[0xF] = +(this.v[x] > 255);
            if (this.v[x] > 255) {
              this.v[x] = this.v[x] - 256;
            }
            //this.listOpcode("0x0004");
            break;

            // 8xy5 - SUB Vx, Vy
            // Set Vx = Vx - Vy, set Vf = NOT borrow.
          case 0x0005:
            this.v[0xF] = +(this.v[x] > this.v[y]);
            this.v[x] = this.v[x] - this.v[y];
            if (this.v[x] < 0) {
              this.v[x] = this.v[x] + 256;
            }
            //this.listOpcode("0x0005");
            break;

            // 8xy6 - SHR Vx, Vy
            // Set Vx = Vx SHR 1.
          case 0x0006:
            this.v[0xF] = this.v[x] & 0x1;
            this.v[x] = this.v[x] >> 1;
            //this.listOpcode("0x0006");
            break;

            // 8xy7 - SUBN Vx, Vy
            // Set Vx = Vy - Vx, set Vf = NOT borrow.
          case 0x0007:
            this.v[0xF] = +(this.v[y] > this.v[x]);
            this.v[x] = this.v[y] - this.v[x];
            if (this.v[x] < 0) {
              this.v[x] = this.v[x] + 256;
            }
            //this.listOpcode("0x0007");
            break;


            // 8xyE - SHL Vx, Vy
            // Set Vx = Vx SHL 1.
          case 0x000E:
            this.v[0xF] = +(this.v[x] & 0x80);
            this.v[x] = this.v[x] << 1;
            if (this.v[x] > 255) {
              this.v[x] = this.v[x] - 256;
            }
            //this.listOpcode("0x000E");
            break;

        }

        break;

        // 9xy0 - SNE Vx, Vy
        // Skip next instruction if Vx != Vy.
      case 0x9000:
        if (this.v[x] != this.v[y]) {
          this.pc += 2;
        }
        //this.listOpcode("0x9000");
        break;

        // Annn - LD I, addr
        // Set I = nnn.
      case 0xA000:
        this.i = opcode & 0xFFF;
        //this.listOpcode("0xA000");
        break;

        // Bnnn - JP V0, addr
        // Jump to location nnn + V0.
      case 0xB000:
        this.pc = (opcode & 0xFFF) + this.v[0];
        //this.listOpcode("0xB000");
        break;

        // Cxkk - RND Vx, byte
        // Set Vx = random byte AND kk.
      case 0xC000:
        this.v[x] = Math.floor(Math.random() * 0xFF) & (opcode & 0xFF)
        //this.listOpcode("0xC000");
        break;

        // Dxyn - DRW Vx, Vy, nibble
        // Display n-byte sprite starting at memory location I at (Vx, Vy), set VF = collision.
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
        //this.drawFlag = true;
        this.loadCanvas();
        //this.listOpcode("0xD000");

        break;

      case 0xE000:
        switch (opcode & 0x00FF) {
          // TODO: fix case 0x009E, wait for keyboard
          // Ex9E - SKP Vx
          // Skip next instruction if the key with the value Vx is pressed.
          case 0x009E:
            this.pc += 2;
            //this.listOpcode("0xE000");

            break;

          // TODO: fix case 0x00A1, wait for keyboard
          // ExA1 - SKNP Vx
          // Skip next instruction if the key with the value Vx is NOT pressed.
          case 0x00A1:
            this.pc += 2;
            //this.listOpcode("0x00A1");

            break;

        }

        break;

      case 0xF000:

        switch (opcode & 0x00FF) {

          // TODO: fix case 0x0007, wait for timer
          // Fx07 - LD Vx, DT
          // Set Vx = delay timer value.
          case 0x0007:
            //this.listOpcode("0x0007");
            break;

          // TODO: fix case 0x000A, wait for keyboard
          // Fx0A - LD Vx, K
          // Wait for a keypress, then store the value of the key in Vx.
          case 0x000A:
            this.stop();
            //this.listOpcode("0x000A");
            return;

          // TODO: fix case 0x0015, wait for timer
          // Fx15 - LD DT, Vx
          // Set delay timer = Vx.
          case 0x0015:
            //this.listOpcode("0x0015");
            break;

          // TODO: fix case 0x0018, wait for timer
          // Fx18 - LD ST, Vx
          // Set sound timer = Vx.
          case 0x0018:
            //this.listOpcode("0x0018");
            break;

          // Fx1E - ADD I, Vx
          // Set I = I + Vx.
          case 0x001E:
            this.i += this.v[x];
            //this.listOpcode("0x001E");
            break;

          // Fx29 - LD F, Vx
          // Set I = location of sprite for digit Vx.
          case 0x0029:
            // Multiply by number of rows per character.
            this.i = this.v[x] * 5;
            //this.listOpcode("0x0029");
            break;

          // Fx33 - LD B, Vx
          //Store BCD representation of Vx in memory locations I, I+1, and I+2.
          case 0x0033:
            var number = this.v[x];
            for (var i = 3; i > 0; i--) {
              this.memory[this.i + i - 1] = parseInt(number % 10);
              number /= 10;
            }
            //this.listOpcode("0x0033");
            break;

          // Fx55 - LD [I], Vx
          // Store registers V0 through Vx in memory starting at location I.
          case 0x0055:
            for (var i = 0; i <= x; i++) {
              this.memory[this.i + i] = this.v[i];
            }
            //this.listOpcode("0x0055");
            break;

            // Fx65 - LD Vx, [I]
            // Read registers V0 through Vx from memory starting at location I.
          case 0x0065:
            for (var i = 0; i <= x; i++) {
              this.v[i] = this.memory[this.i + i];
            }
            //this.listOpcode("0x0065");
            break;

        }

        break;

      default:
        throw new Error("Error at opcode: " + opcode.toString(16) + ".\n Now Terminating the program...");
    }

  }
};
