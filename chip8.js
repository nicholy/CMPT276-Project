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
</script>
var a = new chip8();
p.textContent = a.memory;

emulateCycle: function(){

  var opcode = this.memory[this.pc] << 8 | this.memory[this.pc+1];
  var x = (opcode & 0x0F00) >> 8;
  var y = (opcode & 0x00F0) >> 4;

  this.pc += 2;

  switch(opcode & 0xF000) {

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
      }

  }
}




</script>
