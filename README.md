# CMPT276 TEAM 3 RELEASE 2 INSTRUCTIONS

<h2>Automated Testing: ( UPDATED )</h2>
<ul style = "font-size : 17.5px;">
<li> Open load.html, then click on the automatic testing icon to test each opcode, stacks and memory</li>
<li> In each testing case the opcode number and the testing result is displayed in bold font</li>
<li> Details for each test are directly under the bolded title and are indented (using the &nbsp tag)</li>
<li>Added tests for keyboard and timer opcodes</li>
</ul>

<h2>Details: ( UPDATED )</h2>
<p style = "font-size : 17.5px;"> Each Test will give an output at the end of the line, displaying whether the test operation performed was a success. The way the opcodes were tested was through using sample data stored in various variables, using a check Boolean to determine success or failure. The results are then printed with a check or a cross mark. For DXYN (The Screen Opcode), we have provided a sample display with one sprite (0) printed on it to show that the display function does work (must be viewed with 100% screen size to view best). All missing opcodes have been included to the tests except for FX0A and CXNN. For FX0A it requires a live keyboard input and for CXNN we are still working on how to test a randomizer.</p>

<h2>Running Code: ( UPDATED )</h2>
<ul style = "font-size : 17.5px;">
<li>Open load.html - it will take you to the canvas and visualizer for our chip-8 emulator</li>
<li>Rom file option allows already created games to be loaded in(from a library included in the release)</li>
<li>Visualizer is now included and shows all opcode/stack/memory/registers that are being used while the program is running( NEW )</li>
<li>Included several buttons such as a pause button (which pauses the game when it is running), speed up and speed down button (changes the speed of the game. If you click on the CHIP 8 SPEED icon it will reset the speed to 10) and a forward and back instruction (moves the opcode 1 instruction back or forward). Note that we included a game one and two load button, but does not work because we have not yet created our games.( NEW ) </li>
<li>Implemented a running keyboard that is usable on the games ( NEW ) </li>

<li>Key map:( NEW )</li>
<br>&nbsp;&nbsp;Keypad&nbsp; &nbsp;   &nbsp;   &nbsp;    &nbsp;  &nbsp;  &nbsp;  &nbsp;Keyboard
<br>+-+-+-+-+ &nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; +-+-+-+-+
<br>&nbsp;&nbsp;|1|2|3|C|&nbsp;   &nbsp;   &nbsp;   &nbsp;   &nbsp;    &nbsp;  &nbsp;  &nbsp; |1|2|3|4|
<br>+-+-+-+-+ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; +-+-+-+-+
<br>&nbsp;|4|5|6|D|&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|Q|W|E|R|
<br>+-+-+-+-+ &nbsp; => &nbsp;&nbsp; &nbsp;+-+-+-+-+
<br>&nbsp;&nbsp;|7|8|9|E|&nbsp;&nbsp;   &nbsp;&nbsp;&nbsp;   &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; |A|S|D|F|
<br>+-+-+-+-+ &nbsp;   &nbsp;   &nbsp;&nbsp;   &nbsp;   &nbsp; +-+-+-+-+
<br>&nbsp;&nbsp;|A|0|B|F| &nbsp;&nbsp;   &nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;        |Z|X|C|V|
<br>+-+-+-+-+ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; +-+-+-+-+

</ul>

<h2>Discussions: (UPDATED)</h2>
<ul style = "font-size : 17.5px;">
  <li> Chip 8 tool has been moved to release 3 ( NEW )</li>
  <li> We encountered a problem to test two of our opcodes which is FX0A and CXNN. This is because, those opcodes were only able to be tested only on a special condition. Thus, we have decided to not include it in our automatic testing. ( NEW ) </li>
  <li> Experiencing a problem with the visualizer, where the array limit size 4294967295. If the program were to run for  more than 1570 min it would give us a potential error as it would be greater than the size of the array. As a solution we plan to fix this problem on a later release.(NEW) </li>
  <li> An ongoing problem we have with the front end portion of our code is that we have trouble keeping all the images, buttons, display and visualizer stay proportional to the screen size. Them most optimal would be when it is at 100%. However, when the screen size is adjusted,. the features on the canvas does not change with the screen size. We also plan fix this on a later release. (NEW) </li>
  <li>
  As an ongoing problem, our team member continues to refuse to communicate with us. One of our team members sent him a private message, letting him know that the TA has been notified and that he should really start putting in his share. However, he has ignored that private message, even when he has seen the group chat. This has become increasingly frustrating for us, as none of the work done in this and the previous release has come from him. He has not attended any meetings at all for release 2, and when we have asked him to come in the group chat, he has seen the messages, but not responded to it. The duties of coding this project has been continued to be split amongst the four remaining members. The rest of the team members find this incredibly unfair, and by the next release we will have contacted both the TA and Teacher. (UPDATED)</li>
</ul>
