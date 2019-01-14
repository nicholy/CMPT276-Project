<!doctype html>

<p></p>

<script>
let p = document.querySelector("p");

function chip8(){
  this.pc = 0;
  this.stack = new Array(16);
  this.memory = new Uint8Array(4096);
  this.v = new Uint8Array(16);
  this.startAddr = 0x200;
  this.displayWidth = 64;
  this.displayHeight = 32;
  this.resolution = this.displayWidth * this.displayHeight
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




</script>
