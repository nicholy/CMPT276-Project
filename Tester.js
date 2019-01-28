//<!DOCTYPE html>

<p id = "testing"></p>

<script>
var cpu;
cpu = chip8(); //what initializes this? maybe a function that initializes all of the functions instead of having them all seperately

//memory core properties
function stackCheck(){
  if(cpu.stack && cpu.stack.length == 16){
    console.log("stack is enabled");
  }
  else{
    console.log("stack is disabled");
  }
}

function memoryCheck(){
  if(cpu.stack.length == 4096){
    console.log("memory is enabled");
  }
  else{
    console.log("memory is disabled");
  }
}

function varCheck(){
  for(var i = 0; i < 16; i++){
    if("v" + i){//THE VARIABLES NEED NAMES - THEY CANT JUST OCCUPY SPACES
      console.log("v"+i+" is enabled");
    }
    else{
      console.log("v"+i+" is disabled");
    }
  }
}
//OR IF WE WANT TO JUST CHECK THAT MEMORY FOR VARIABLES ARE THERE
function varCheck2(){
  var counter = 0;
  for(var i = 0x06F0; i < 0x0700; i++){
    if(cpu.memory[i] == 4){
      counter ++;
    }
  }
  if(counter == 16){
    console.log("variable space is enabled");
  }
  else{
    console.log("variable space is disabled");
  }
}

function
//opcode properties
function allOp(){
  //0x0000
  function 
}
</script>
