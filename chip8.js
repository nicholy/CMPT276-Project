var CHIP8 = (function() {

  // Program counter
  this.pc = 0x200;

  // Stack and stack pointer
  this.stack = new Array(16);
  this.sp = 0;

  // Memory space
  this.memory = new Uint8Array(4096);

  // Registers
  this.v = new Uint8Array(16);
  this.i = 0;

  // IDK what this is
  this.startAddr = 0x200;

  // Graphics 64 * 32
  this.displayWidth = 64;
  this.displayHeight = 32;
  this.resolution = this.displayWidth * this.displayHeight;
  this.display = new Array(resolution);

  // Timers
  this.delayTimer = 0;
  this.soundTimer = 0;

  this.reset();

  chip8.prototype = {
    loadProgram: function(program) {
      // Load program into memory
      for (i = 0; i < program.length; i++) {
        this.memory[i + 0x200] = program[i];
      }

      //it create an string and convert memroy into hex and put into string [.toString(16)] with newline break for each 24 character
      var output = "";
      for (var i = 0; i < ch.memory.length; i++) {
        output += ch.memory[i].toString(16) + " ";
        if (!((i + 1) % 24)) {
          output += "\n";
        }
      }
      p.textContent = output;
    },

    visualizer: function() {
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
    }
  };


  function loadProgram(program){
      for (i = 0x200; i < 0x06A0; i++) {
        this.memory[i] = program[i];
      }
  }

  function stack(){
    for(i = 0x06A0; i<0x06D0; i++){
        this.memory[i] = 2;
    }
  }

  function workarea(){
    for(i = 0x06D0; i<0x06F0; i++){
        this.memory[i] = 3;
    }
  }

  function variable(){
    for(i = 0x06F0; i<0x0700; i++){
        this.memory[i] = 4;
    }
  }

  function display(){
    for(i = 0x0700; i<this.memory.length; i++){
        this.memory[i] = 5;
    }
  }

  function opcode1(){
    for (var i = 0; i < this.display.length; i++) {
        this.display[i] = 0;
    }
  }

  function setPixel(x,y) {
    width = this.displayWidth;
    height= this.displayHeight;

    if ( x > width ){
      x = x - width;
    }
    else if ( x < 0 ) {
      x = x + width;
    }

    if ( y > height) {
      y = y - height;
    }
    else if ( y < 0 ) {
      y = y + height;
    }

    location = x + ( y * width );
    this.display[location] = this.display[location] ^ 1;
    return !this.display[x + (y * width)];
  }

  chip8();
  program();
  stack();
  workarea();
  variable();
  display();
  opcode1();
  loadProgram();



  function StartCycle(){

    var opcode = this.memory[this.pc] << 8 | this.memory[this.pc+1];
    var x = (opcode & 0x0F00) >> 8;
    var y = (opcode & 0x00F0) >> 4;

    this.pc += 2;

    switch(opcode & 0xF000) {

      case 0x0000:
        switch (opcode) {

          case 0x00E0:
            for (var i = 0; i < this.display.length; i++) {
              this.display[i] = 0;
            }
            break;

          case 0x00EE:
            this.pc = this.stack[--this.sp];
            break;
        }
        break;

      case 0x1000:
        this.pc = opcode & 0xFFF;
        break;

      case 0x2000:
        this.stack[this.sp] = this.pc;
        this.sp++;
        this.pc = opcode & 0x0FFF;
        break;

      case 0x3000:
        if (this.v[x] === (opcode & 0xFF)){
          this.pc += 2;
        }
        break;

      case 0x4000:
        if (this.v[x] != (opcode & 0x00FF)) {
          this.pc += 2;
        }
        break;

      case 0x5000:
        if (this.v[x] === this.v[y]) {
          this.pc += 2;
        }
        break;

      case 0x6000:
        this.v[x] = opcode & 0xFF;
        break;

      case 0x7000:
        this.v[x] = this.v[x] + (opcode & 0x00FF);
        break;

      case 0x8000:
        switch (opcode & 0x000F) {

          case 0x0000:
            this.v[x] = this.v[y];
            break;

          case 0x0001:
            this.v[x] = this.v[x] | this.v[y];
            break;

          case 0x0002:
            this.v[x] = this.v[x] & this.v[y];
            break;

          case 0x0003:
            this.v[x] = this.v[x] ^ this.v[y];
            break;

          case 0x0004:
            var sum = this.v[x] + this.v[y];
            if (sum > 0xFF){
              this.v[0xF] = 1;
            }
            else {
              this.v[0xF] = 0;
            }
            this.v[x] = sum;
            break;

          case 0x0005:
            if(this.v[x] > this.v[y]){
              this.v[0xF] = 1;
            }
            else {
              this.v[0xF] = 0;
            }
            this.v[x] = this.v[x] = this.v[y];
            break;

          case 0x0006:
            this.v[0xF] = this.v[x] & 0x01;
            this.v[x] = v[x] >> 1;

          // 8xy7
          case 0x0007:
            this.v[0xF] = +(this.v[y]>this.v[x]); //changes Vf(Flag variable to no borrowing)
            this.v[x] = this.v[y] - this.v[x]; //sets Vx to Vy - Vx
            if (this.v[x] < 0) { //if Vx is negative, add 256 to make it a positive value of the same bit values
                this.v[x] += 256;
            }
            break;


          // 8xyE
          case 0x000E:
            this.v[0xF] = +(this.v[x] & 0x80); //sets flag variable to
            this.v[x] <<= 1; //shifting the variable of x to the left by 1 position
            if (this.v[x] > 255) { //if Vx is out of the range of 255
                this.v[x] -= 256;	//bring Vx back into the byte range
            }
            break;
        }
        break;

      // 9xy0
      case 0x9000:
          if (this.v[x] != this.v[y]) { //if Vx does not equal Vy
              this.pc += 2;	//increase the program counter pointer by 2, skipping the next instruction
          }
          break;


      // Annn
      case 0xA000:
          this.i = opcode & 0xFFF; //sets address register to the address in opcode
          break;


      // Bnnn
      case 0xB000:
          this.pc = (opcode & 0xFFF) + this.v[0]; //sets the program counter pointer to where the register is, starting from the first register
          break;

      // Cxkk
      case 0xC000:
          this.v[x] = Math.floor(Math.random() * 0xFF) & (opcode & 0xFF) //math operation - round number from 0 - 255
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
          this.drawFlag = true;

          break;

      case 0xE000:
          switch (opcode & 0x00FF) {

              // SKP Vx
              // Ex9E
              // Skip next instruction if the key with the value Vx is pressed.
              case 0x009E:
                  if (this.keys[this.v[x]]) {
                      this.pc += 2;
                  }
                  break;

              // SKNP Vx
              // ExA1
              // Skip  next instruction if the key with the value Vx is NOT pressed.
              case 0x00A1:
                  if (!this.keys[this.v[x]]) {
                      this.pc += 2;
                  }
                  break;

          }
          break;

      case 0xF000:

        switch(opcode & 0x00FF){
          case 0x0007:
            this.v[x] = this.delayTimer;
            break;
            //CASE 0X000A NOT COMPLETED, NEED HEX KEYBOARD
          case 0x000A:
            break;

          case 0x0015:
            this.delayTimer = this.v[x];
            break;
          case 0x0018:
            this.soundTimer = this.v[x];
            break;
          case 0x001E:
            this.i += this.v[x];
            break;
          case 0x0029:
            this.i = this.v[x] * 5;
            break;
          case 0x0033:
            this.memory[this.i] = (this.v[x] - (this.v[x] % 100)) / 100;
            this.memory[this.i + 1] = (this.v[x] % 100 - (this.v[x] % 10)) / 10;
            this.memory[this.i + 2] = this.v[x] % 10;
            break;
          case 0x0055:
            for (var i = 0; i < x; i++){
              this.memory[this.i + i] = this.v[i];
            }
            break;
          case 0x0065:
            for (var i = 0; i < x; i++){
              this.v[i] = this.memory[this.i + i];
            }
            break;
        }
    }
  }
})();
