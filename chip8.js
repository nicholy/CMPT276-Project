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
      }

  }
}




</script>
