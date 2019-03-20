# **Product Document** - CMPT 276 Team 3
_<font size = "3">
   Members: Nichol Yip, Jeremy Lee, Mac Liu, Eric Wong, Tanvir Khan
</font>_

### __Meeting Schedule__
<br>    Team members are expected to show up at weekly meetings scheduled on Mondays at 10:30 AM for an hour,
<br>    before class and 12:30 - 1:30 after class on Monday, Wednesday, and Friday. Also our group
<br>    will have an online meeting on Saturday night at 8:30PM - 9:30PM using Discord and Teletype atom .

### __Communication Tool/Techniques__

<br>    Communication tools utilized outside of school would consist of Facebook Messenger, Discord and Teletype atom.
<br>    Most of the planning documents and presentation materials(Powerpoint) will be completed in the form of Google Docs and Google Slides for ease of access.

### __Details of Software Methodology__

<br>    Members are expected to follow an incremental development model while working on the project,
<br>    where the project will be divided into smaller releases. Early releases would consist of the core properties of Chip-8, with later releases containing various add-ons(the games, the application).

### __Testing and Quality Assurance Tools__

<br>    Tools we will use for testing and assuring the quality would consist of  Javascript Sandbox and a manual code in a separate Javascript file(Build up with each release).

### __Main Implementation Language/ Software Repository__

<br>   Main implementation language would be JavaScript and code will be stored using Google Drive during coding stages while the Final update of the code will be stored in GitHub.

### __Detailed Use Cases For Next Release ( UPDATED )__

<br> Functioning Game 2 : Fun and interesting  

**Game 2**
<br> Start and finish Game 2(NEW)


**Presentation**
<br> Prepare for the upcoming presentation(NEW)

### __Work Breakdown__

| Name   | Release 1 Tasks |
| ------ | --------------- |
| Nichol | Display(1 week)/ Updates to Product Document(2 days) |
| Jeremy | Automated Testing(1 week) |
| Mac    | Display(1 week) |
| Eric   | Visualizer(1 week) (MOVED TO RELEASE 2) |
| Tanvir | Visualizer(1 week) (MOVED TO RELEASE 2) |
| all    | debug(1 week)   |

| Name   | Release 2 Tasks |
| ------ | --------------- |
| Nichol | Sound & Timers(1 week) / Updates to Product Document(2 days) |
| Jeremy | Animation(1 week) / Visualizer (1 week) |
| Mac    | Animation(1 week) / Visualizer (1 week) |
| Eric   | Chip 8 Tool(1 week) / Local program loader(1 week) |
| Tanvir | Research Octo(1 week) / Game 1 prototype(1 week)|
| all    | debug(1 week) / Game 1 prototype(1 week)|

| Name   | Release 3 Tasks |
| ------ | --------------- |
| Nichol | Game 1 / Update documents / Start Game 2  |
| Jeremy | Chip 8 Tool / Start Game 2 |
| Mac    | Chip 8 Tool / Start Game 2 |
| Eric   | Game 1 / Start Game 2  |
| Tanvir | Game 1 testing(2 days) Game 2 Design(4 days) |

| Name   | Release 4 Tasks (UPDATED)|
| ------ | --------------- |
| Nichol | Game 2 Design & Research(1 week) \ Game 2 Sound & animation(1 week) \ Prep for presentation |
| Jeremy | Game 2 Design & Research(1 week) \ Game 2 function(1 week) \ Prep for presentation |
| Mac    | Game 2 Design & Research(1 week) \ Game 2 interaction & effect(1 week)  \ Prep for presentation |
| Eric   | Game 2 Design & Research(1 week)  \ Game 2 Debug(1 week) \ Prep for presentation |
| Tanvir | Game 2 Design & Research(1 week)  \ Game 2 Testing & Documentation(1 week) \ Prep for presentation |

**NOTE:** All group members are expected to work on the debugging process of the code together.

### __Completed Tasks ( UPDATED )__
<br> - CHIP 8 Core
<br> - CHIP 8 Functions
<br> - Canvas Display
<br> - Automated Testing
<br> - Visualizer
<br> - Keyboard(FIXED)
<br> - Animation
<br> - Game 1 Worm(NEW)
<br> - Chip-8 Tool Sprite Editor(NEW)

### __Future Schedules ( UPDATED )__

| Date  | Tasks Expected to Finish  |
| ----  | ------------------------  |
| Jan 13 - Jan 14 | Chip 8 Constructor and Initializer |
| Jan 14 - Jan 21 | Opcode |
| Jan 14 - 17 | Product Document |
| **Jan 18** | **Product Document Due** |
| Jan 18 - Jan 21 | Powerpoint |
| **Jan 21** | **Powerpoint Due** |
| Jan 21 | presentation rehearsal|
| Jan 25 | Release 0 Presentation |
| Jan 22 - Jan 28 | Automated testing |
| Jan 22 - Jan 28 | Display |
| Jan 22 - Jan 28 | Visualizer |
| Jan 29 - Jan 30 | Link Work Together |
| Jan 31 - Feb 6 | Debugging |
| Jan 31 - Feb 6 | Product Document Update |
| **Feb 6** | **Release 1 Due** |
| Feb 7 - Feb 13 | Hex Keyboard |
| Feb 7 - Feb 13 | Timers |
| Feb 7 - Feb 13 | Sound |
| Feb 7 - Feb 13 | Finish Application |
| Feb 7 - Feb 13 | Game 1 Design Concept |
| Feb 7 - Feb 13 | Running Display |
| Feb 7 - Feb 13 | Finish Visualizer |
| Feb 14 - Feb 19 | Part of The Game Done ( Animation/Title Screen ) |
| Feb 20 - Feb 21 | Link work together |
| Feb 22 - Feb 25 | Debugging |
| Feb 26 - Feb 27 | Update Product Document |
| **Feb 27** | **Release 2 Due** |
| Feb 28 - Mar 7 | Finish Game 1 |
| Feb 28 - Mar 7 | Start Game 2 With Application |
| Feb 28 - Mar 7 | Finish Chip 8 Tool |
| Mar 8 - Mar 9 | Link Work together |
| Mar 10 - Mar 12 | Debugging |
| Mar 10 - Mar 12  | Update Product Document |
| **Mar 13** | **Release 3 Due** |
| Mar 14 - Mar 23 | Finish Game 2 |
| Mar 14 - Mar 25 | Release 4 Presentation Slides Finished |
| Mar 26 | Rehearsal |
| Mar 27 - Mar 28 | Product Document Update |
| Mar 29 - Apr 5  | Debugging |
| Apr 1 | Release 4 Presentation |
| Apr 5 | Finish All Code and Debugging Stages |
| **Apr 8** | **Release 4 Due** |

### __Release 1 Discussions__
<ul style = "font-size : 17.5px;">
  <li> Visualizer completion pushed to release 2 - visualizer is just a log of the first 1000 operations of the program loaded into memory</li>
  <li> Screen completion (animations) for the programs and games done by release 2 - using window.requestAnimationFrame object - need more in depth research</li>
  <li> Currently with the load function, it is possible to load anything. We want to make it only possible to run the rom files in a specified folder so it wont give any errors
  <li> One of the problems that was encountered was that one of our team members did not do any of the work associated with release one. Because of this, some progress was pushed back to later releases, making the development process frustrating to work on with the remaining team members. On top of that, it was very difficult to contact him, as he does not read any forms of communication that we have been using as a group. Attendance to meetings has been sparse (he have not come to the past 6 meetings). As a temporary solution, the group has decided to split up the code amongst the four remaining members. </li>
</ul>

### __Release 2 Discussions__
<ul style = "font-size : 17.5px;">
  <li> Chip 8 tool has been moved to release 3 </li>
  <li> We encountered a problem to test two of our opcodes which is FX0A and CXNN. This is because, those opcodes were only able to be tested while the program is running. Thus, we have decided to not include it in our automatic testing.
  <li>
  As an ongoing problem, our team member continues to refuse to communicate with us. One of our team members sent him a private message, letting him know that the TA has been notified and that he should really start putting in his share. However, he has ignored that private message, even when he has seen the group chat. This has become increasingly frustrating for us, as none of the work done in this and the previous release has come from him. He has not attended any meetings at all for release 2, and when we have asked him to come in the group chat, he has seen the messages, but not responded to it. The duties of coding this project has been continued to be split amongst the four remaining members. The rest of the team members find this incredibly unfair, and by the next release we will have contacted both the TA and Teacher.</li>
</ul>

### __Release 3 Discussions(NEW)__
<h2>Discussions: (UPDATED)</h2>
<ul style = "font-size : 17.5px;">
  <li>We encountered a problem making the sprite editor. We were planning to use a one dimensional array to have an efficient runtime, but we soon encountered problems of converting the coordinates to unique array entries in the index. We realized that the runtime is going to be similar to using a two dimensional array, instead using the x and y positions to create a unique ID for each location.(NEW)</li>
  <li>Game 2 design moved to release 4 ( NEW )</li>
  <li>Changed game 1 from Snake(OLD) to Worm(NEW)(Original) ( NEW )</li>
  <li>We encountered problems while trying to make Snake as our game 1, especially with the chip8 register and memory length. The problem with Snake for chip8 is that the game slows down after a few points due to the chip8 memory space and register getting filled up as the snake gets longer(Queue). We decided to scrap the idea of Snake, using some of the concepts and animation to make our own original game, Worm. We used the animation for the fixed length of 2 pixels as the worm body animation and we used the generating food function to generate food for the worm. We then added obstacles for the worm(randomly generated rocks created by Sprite Editor). However, we soon found the randomly generated rocks to be a problem because the rocks can spawn on food and on the worm. If it spawns on the worm, it causes instant death to the player. If it spawns on the food, then it would cover the food, making the game unplayable. The amount of increasing bugs made the game harder to code through. One of the solutions was to use a grid system to avoid rocks randomly generating in the wrong places(Where the player and food is located). However, this solution proved vastly complicated for us, and the game was boring to play, as there were too few rocks spaced far apart. It was also very difficult to distinguish where the food went if it was beside a rock. So as a solution for all of the above, we had decided to use an "invincible frame" for the worm and have the food blink rapidly to indicate its position. When the rock is spawned on top of the worm, the worm doesn't die immediately, and the player has few seconds to respond. This meant that we could spawn more rocks without the consequence of instant death. Because of increasing the amount of rocks randomly spawned, there was an issue in which a path to the food could not be found. The solution was to create a  reset terrain button(R) for the player, at the cost of subtracting one from the score so the player wont spam the reset for easy points.(NEW)</li>
  <li>
  As an ongoing problem, one of our teammates refuses to work with us. We have been communicating with him, but he is still absent from all the meetings. According to him, it seems he has an injury that has prevented him from working on the project with us. We feel that this needs to be solved by a TA or Professor intervention. Additionally, we do not think that he should be given the same grade as our project, as he has done 0% of the work. (UPDATE) </li>
</ul>

### __References__ (UPDATED)

http://devernay.free.fr/hacks/chip8/C8TECH10.HTM

https://en.wikipedia.org/wiki/CHIP-8

http://blog.alexanderdickson.com/javascript-chip-8-emulator

https://github.com/reu/chip8.js/

https://github.com/JohnEarnest/Octo/ (NEW)
