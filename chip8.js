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

        // ADD Vx, byte
        // 7xkk
        // Set Vx equal to Vx + kk.
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

          // LD Vx, Vy
          // 8xy0
          // Stores register Vy in Vx
          case 0x0000:
            this.v[x] = this.v[y];
            //this.listOpcode("0x8000");
            break;

            // OR Vx, Vy
            // 8xu1
            // Set vX equal to vX OR Vy;
          case 0x0001:
            this.v[x] = this.v[x] | this.v[y];
            //this.listOpcode("0x8001");
            break;

            // AND Vx, Vy
            // 8xy2
            // Set Vx equal to Vx AMD Vy
          case 0x0002:
            this.v[x] = this.v[x] & this.v[y];
            //this.listOpcode("0x0002");
            break;

            // XOR Vx, Vy
            // 8xy3
            // Set Vx equal to Vx XOR Vy.
          case 0x0003:
            this.v[x] = this.v[x] ^ this.v[y];
            //this.listOpcode("0x0003");
            break;

            // ADD Vx, Vy
            // 8xy4
            // Set Vx equal to Vx + Vy, set Vf equal to carry.
          case 0x0004:
            this.v[x] = this.v[x] + this.v[y];
            this.v[0xF] = +(this.v[x] > 255);
            if (this.v[x] > 255) {
              this.v[x] = this.v[x] - 256;
            }
            //this.listOpcode("0x0004");
            break;

            // SUB Vx, Vy
            // 8xy5
            // Set Vx equal to Vx - Vy, set Vf equal to NOT borrow.
          case 0x0005:
            this.v[0xF] = +(this.v[x] > this.v[y]);
            this.v[x] = this.v[x] - this.v[y];
            if (this.v[x] < 0) {
              this.v[x] = this.v[x] + 256;
            }
            //this.listOpcode("0x0005");
            break;

            // SHR Vx, Vy
            // 8xy6
            // Set Vx SHR 1.
          case 0x0006:
            this.v[0xF] = this.v[x] & 0x1;
            this.v[x] = this.v[x] >> 1;
            //this.listOpcode("0x0006");
            break;

            // SUBN Vx, Vy
            // 8xy7
            // Set Vx equal to Vy - Vx, set Vf equal to NOT borrow.
          case 0x0007:
            this.v[0xF] = +(this.v[y] > this.v[x]);
            this.v[x] = this.v[y] - this.v[x];
            if (this.v[x] < 0) {
              this.v[x] = this.v[x] + 256;
            }
            //this.listOpcode("0x0007");
            break;


            // SHL Vx, Vy
            // 8xyE
            // Set Vx equal to Vx SHL 1.
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

        // SNE Vx, Vy
        // 9xy0
        // Skip next instruction if Vx is not equal to Vy.
      case 0x9000:
        if (this.v[x] != this.v[y]) {
          this.pc += 2;
        }
        //this.listOpcode("0x9000");
        break;

        // LD I, addr
        // Annn
        // Set I equal to nnn.
      case 0xA000:
        this.i = opcode & 0xFFF;
        //this.listOpcode("0xA000");
        break;

        // JP V0, addr
        // Bnnn
        // Jump to location V0 + nnn.
      case 0xB000:
        this.pc = (opcode & 0xFFF) + this.v[0];
        //this.listOpcode("0xB000");
        break;

        // RND Vx, byte
        // Cxkk
        // Set Vx equal to random byte AND kk.
      case 0xC000:
        this.v[x] = Math.floor(Math.random() * 0xFF) & (opcode & 0xFF)
        //this.listOpcode("0xC000");
        break;

        // DRW Vx, Vy, nibble
        // Dxyn
        // Display n-byte sprite starting at memory location I at (Vx, Vy), set VF equal to collision.
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
          // SKP Vx
          // Ex9E
          // Skip next instruction if the key with the value Vx is pressed.
          case 0x009E:
            //incomplete wait for keyboard
            this.pc += 2;
            //this.listOpcode("0xE000");

            break;

            // SKNP Vx
            // ExA1
            // Skip  next instruction if the key with the value Vx is NOT pressed.
          case 0x00A1:
            //incomplete wait for keyboard
            this.pc += 2;
            //this.listOpcode("0x00A1");

            break;

        }

        break;

      case 0xF000:

        switch (opcode & 0x00FF) {

          // LD Vx, DT
          // Fx07
          // Place value of DT in Vx.
          case 0x0007:
            //incomplete wait for timer
            //this.listOpcode("0x0007");
            break;

            // LD Vx, K
            // Fx0A
            // Wait for keypress, then store it in Vx.
          case 0x000A:
            //incomplete wait for keyboard
            this.stop();
            //this.listOpcode("0x000A");
            return;

            // LD DT, Vx
            // Fx15
            // DT is set to Vx.
          case 0x0015:
            //incomplete wait for timer
            //this.listOpcode("0x0015");
            break;

            // LD ST, Vx
            // Fx18
            // Set sound timer to Vx.
          case 0x0018:
            //incomplete wait for Sound
            //this.listOpcode("0x0018");
            break;

            // ADD I, Vx
            // Fx1E
            // Set I equal to I + Vx
          case 0x001E:
            this.i += this.v[x];
            //this.listOpcode("0x001E");
            break;

            // LD F, Vx
            // Fx29
            // Set I equal to location of sprite for digit Vx.
          case 0x0029:
            // Multiply by number of rows per character.
            this.i = this.v[x] * 5;
            //this.listOpcode("0x0029");
            break;

            // LD B, Vx
            // Fx33
            // Store BCD representation of Vx in memory location starting at location I.
          case 0x0033:
            var number = this.v[x],
              i;

            for (i = 3; i > 0; i--) {
              this.memory[this.i + i - 1] = parseInt(number % 10);
              number /= 10;
            }
            //this.listOpcode("0x0033");
            break;

            // LD [I], Vx
            // Fx55
            // Store registers V0 through Vx in memory starting at location I.
          case 0x0055:
            for (var i = 0; i <= x; i++) {
              this.memory[this.i + i] = this.v[i];
            }
            //this.listOpcode("0x0055");
            break;

            // LD Vx, [I]
            // Fx65
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
        throw new Error("Error opcode: " + opcode.toString(16) + "Now Terminating the program...");
    }

  }
};
