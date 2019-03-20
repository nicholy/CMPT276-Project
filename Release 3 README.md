# CMPT276 TEAM 3 RELEASE 3 INSTRUCTIONS
<h2>Sprite Editor: ( NEW )</h2>
<ul style = "font-size : 17.5px;">
<li> Added a 16x8 Sprite Editor for the creation of sprites in chip8</li>
<li> User can left-click on canvas to draw  on the canvas, right-click on canvas to erase</li>
<li> Buttons on the left hand side consist of:
<ul>
<li>Clear - clears the Screen</li>
<li>Up - shifts all pixels up by 1 increment</li>
<li>Down - shifts all pixels down by 1 increment</li>
<li>Left - shifts all pixels left by 1 increment</li>
<li>Right - shifts all pixels right by 1 increment</li>
</ul>
<li> Live Hex output - sprite to hex converter</li>
</ul>
<h2>Game 1 - Worm : ( NEW )</h2>
<ul style = "font-size : 17.5px;">
<li>click the "GAME 1 LOAD" button to load up Worm -automatically changes speed to 2.8(default playing speed)</li>
<li>Created Game 1(<strong>original game</strong>) : a random generating terrain explorer </li>
<li>We used sprite editor we created to draw rocks and ending screen for our game.
<li> The goal of the game is to get a high score by eating as much food as possible</li>
<li><strong>A randomly generated terrain explorer game: you play as a tiny worm to find food in a harsh environment.</strong></li>
<li>Worm has to dodge every rock when moving to find the food it need.</li>
<li>Worm has a special ability to reset the terrain(by pressing R) so it can move freely but with a cost of -1 from the overall score.</li>
<li>Worm has another special ability: when it eats food it turns invincible it can move through rocks for few seconds(shown by continuous beeps)</li>
<li> food is shown as a blinking pixel</li>
<li> player is shown as a 2x1 pixel object</li>
<li>Controls: WASD to move in four directions, R to reset terrain, 1 to restart the game from the game over screen</li>
<li> The worm cannot go directly backwards</li>
<li> The preferable speed to play this game is 2.8(normal). You can challenge yourself by increasing the speed to 4.4(hard), or 5 and above(extreme).
</ul>

<h2>Discussions: (UPDATED)</h2>
<ul style = "font-size : 17.5px;">
  <li>We encountered a problem making the sprite editor. We were planning to use a one dimensional array to have an efficient runtime, but we soon encountered problems of converting the coordinates to unique array entries in the index. We realized that the runtime is going to be similar to using a two dimensional array, instead using the x and y positions to create a unique ID for each location.(NEW)</li>
  <li>Game 2 design moved to release 4 ( NEW )</li>
  <li>Changed game 1 from Snake(OLD) to Worm(NEW)(Original) ( NEW )</li>
  <li>We encountered problems while trying to make Snake as our game 1, especially with the chip8 register and memory length. The problem with Snake for chip8 is that the game slows down after a few points due to the chip8 memory space and register getting filled up as the snake gets longer(Queue). We decided to scrap the idea of Snake, using some of the concepts and animation to make our own original game, Worm. We used the animation for the fixed length of 2 pixels as the worm body animation and we used the generating food function to generate food for the worm. We then added obstacles for the worm(randomly generated rocks created by Sprite Editor). However, we soon found the randomly generated rocks to be a problem because the rocks can spawn on food and on the worm. If it spawns on the worm, it causes instant death to the player. If it spawns on the food, then it would cover the food, making the game unplayable. The amount of increasing bugs made the game harder to code through. One of the solutions was to use a grid system to avoid rocks randomly generating in the wrong places(Where the player and food is located). However, this solution proved vastly complicated for us, and the game was boring to play, as there were too few rocks spaced far apart. It was also very difficult to distinguish where the food went if it was beside a rock. So as a solution for all of the above, we had decided to use an "invincible frame" for the worm and have the food blink rapidly to indicate its position. When the rock is spawned on top of the worm, the worm doesn't die immediately, and the player has few seconds to respond. This meant that we could spawn more rocks without the consequence of instant death. Because of increasing the amount of rocks randomly spawned, there was an issue in which a path to the food could not be found. The solution was to create a  reset terrain button(R) for the player, at the cost of subtracting one from the score so the player wont spam the reset for easy points.(NEW)</li>
  <li>
  As an ongoing problem, one of our teammates refuses to work with us. We have been communicating with him, but he is still absent from all the meetings. According to him, it seems he has an injury that has prevented him from working on the project with us. We feel that this needs to be solved by a TA or Professor intervention. Additionally, we do not think that he should be given the same grade as our project, as he has done 0% of the work. (UPDATE) </li>
</ul>
