# CMPT276 TEAM 3 RELEASE 1 INSTRUCTIONS

<h2>Automated Testing:</h2>


<ul style = "font-size : 17.5px;">
<li> Open load.html then click on the automatic testing icon to test each opcode, stacks and memory</li>
<li> In each testing case the opcode number and the testing result is displayed in bold font</li>
<li> Details for each test are directly under the bolded title and are indented (using the &nbsp tag)</li>
</ul>

<h2>Details:</h2>
<p style = "font-size : 17.5px;"> Each Test will give an output at the end of the line, displaying whether the test operation performed was a success. The way the opcodes were tested was through using sample data stored in various variables, using a check Boolean to determine success or failure. The results are then printed with a check or a cross mark. For DXYN (The Screen Opcode), we have provided a sample display with one sprite (0) printed on it to show that the display function does work (must be viewed with 100% screen size to view best). We have not included several of the opcodes (the hex keyboard, timers, and sound), as we have not programmed that as features yet.</p>

<h2>Running Code:</h2>
<ul style = "font-size : 17.5px;">
<li>Open load.html that should take you to the canvas for our chip-8 emulator</li>
<li>Select a ROM file from the files that were provided</li>
<li>Only the initial page of the game should load on the screen</li>
<li>The screen is a "snapshot" of the 1000th frame, animations will be included in later releases (only to show that opcode is running)</li>
<li>Visualizer can be viewed by going into the console (pressing F12 or going into developer mode and looking at the console)</li>
</ul>

<h2>Discussions:</h2>
<ul style = "font-size : 17.5px;">
  <li> Visualizer completion pushed to release 2 - visualizer is just a log of the first 1000 operations of the program loaded into memory</li>
  <li> Screen completion (animations) for the programs and games done by release 2 - using window.requestAnimationFrame object - need more in depth research</li>
  <li> Currently with the load function, it is possible to load anything. We want to make it only possible to run the rom files in a specified folder so it wont give any errors
  <li> One of the problems that was encountered was that one of our team members did not do any of the work associated with release one. Because of this, some progress was pushed back to later releases, making the development process frustrating to work on with the remaining team members. On top of that, it was very difficult to contact him, as he does not read any forms of communication that we have been using as a group. Attendance to meetings has been sparse (he have not come to the past 6 meetings). As a temporary solution, the group has decided to split up the code amongst the four remaining members. </li>
</ul>
