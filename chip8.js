<!doctype html>

<p></p>

<script>
let p = document.querySelector("p");

function chip8(){
  this.pc = 0x200;
  this.stack = new Array(16);
  this.memory = new Uint8Array(4096);
  this.v = new Uint8Array(16);
  this.startAddr = 0x200;
  this.displayWidth = 64;
  this.displayHeight = 32;
  this.resolution = this.displayWidth * this.displayHeight;
  this.display = new Array(resolution);
  this.i = null;
  this.sp = null;
  this.delayTimer = null;
  this.soundTimer = null;
}

function program(){
    for (i = 0x200; i < 0x06A0; i++) {
      this.memory[i] = 1;
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


chip8();
program();
stack();
workarea();
variable();
display();
opcode1();
console.log(memory);


function emulationcycle(){

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
      if (this.v[x] === (opcode & 0xFF)) {
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



</script>
