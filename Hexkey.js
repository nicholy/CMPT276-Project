<!doctype html>

<p>Enter</p>

<script>
  let p = document.querySelector("p");

  function Hexkey(event) {
    if (event.key == '1') {
        p.textContent += '1';
    }
    if (event.key == '2') {
      p.textContent += '2';
    }
    if (event.key == '3') {
        p.textContent += '3';
    }
    if (event.key == '4') {
      p.textContent += '4';
    }
    if (event.key == '5') {
        p.textContent += '5';
    }
    if (event.key == '6') {
      p.textContent += '6';
    }
    if (event.key == '0') {
        p.textContent += '0';
    }
    if (event.key == 'a') {
      p.textContent += 'A';
    }
    if (event.key == 'b') {
        p.textContent += 'B';
    }
    if (event.key == 'c') {
      p.textContent += 'C';
    }
    if (event.key == 'd') {
        p.textContent += 'D';
    }
    if (event.key == 'e') {
      p.textContent += 'E';
    }
    if (event.key == 'f') {
        p.textContent += 'F';
    }
    if (event.key == '0') {
      p.textContent += '0';
    }
    if(event.keyCode == 13){
      p.textContent = '';
    }
  }
  document.body.addEventListener("keydown", Hexkey);
</script>
