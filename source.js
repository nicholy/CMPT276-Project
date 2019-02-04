
            (function() {
				var CELL_SIZE = 8;

				var canvas = document.querySelector("canvas");


				// Instantiate our Chip-8 objects.
                var ch = new Chip8;
				var chRenderer = new CanvasRenderer(canvas, ch.getDisplayWidth(), ch.getDisplayHeight(), CELL_SIZE);

                ch.setRenderer(chRenderer);


				// Set up program loading form.
                (function() {
	                var select = document.querySelector("#program");
					var programLoaded = document.querySelector("#loaded-program");
	                var programs = ["15PUZZLE", "BLINKY", "BLITZ", "BRIX", "CONNECT4", "GUESS", "HIDDEN", "IBM", "INVADERS", "KALEID", "MAZE", "MERLIN", "MISSILE", "PONG", "PONG2", "PUZZLE", "SYZYGY", "TANK", "TETRIS", "TICTAC", "UFO", "VBRIX", "VERS", "WIPEOFF"];

	                programs.forEach(function(program) {
	                    var option = document.createElement("option");
	                    option.textContent = program;
	                    select.add(option);
	                });

	                select.addEventListener("change", function(event) {
	                    var value = select.value;
						var xhr;

	                    if ( ! value) {
	                        alert("Please select a ROM.");
	                        return;
	                    }

	                    // Load program.
	                    xhr = new XMLHttpRequest();
	                    xhr.open("GET", "roms/" + value, true);
	                    xhr.responseType = "arraybuffer";

	                    xhr.onload = function () {
	                        ch.stop();
	                        ch.reset();
	                        ch.loadProgram(new Uint8Array(xhr.response));
	                        ch.start();
							programLoaded.textContent = value;
	                    };

	                    xhr.send();

						this.blur();

	                });

				})();

				// Color changing.
                (function() {

	                var select = document.querySelector("#color");

	                select.addEventListener("change", function(event) {
						chRenderer.setFgColor(this.value);
					});

				})();

				// Gamepad support.
                (function() {

					var checkbox = document.querySelector("#gamepad");
					var test = document.querySelector("#test-gamepad");
					var gamepadId = false;

					checkbox.checked = GamePad.supported;

					var gamepad = new GamePad(function(gamepads) {
						var gamepad = gamepads[0];
						var buttons;
						var axes;

						if ( ! gamepad) {
							return;
						}

						// Wikipedia says...
						// "The '8', '4', '6', and '2' keys are typically used for directional input."
						// We'll map them onto the D-pad.
						axes = gamepad.axes;
						ch.setKeyState(2, axes[1] == 1); // Up
						ch.setKeyState(8, axes[1] == -1); // Down
						ch.setKeyState(4, axes[0] == -1); // Left
						ch.setKeyState(6, axes[0] == 1); // Right

						// The rest can just be mapped wherever.
						buttons = gamepad.buttons;
						ch.setKeyState(1, buttons[0]);
						ch.setKeyState(3, buttons[1]);
						ch.setKeyState(5, buttons[2]);
						ch.setKeyState(7, buttons[3]);
						ch.setKeyState(9, buttons[4]);
						ch.setKeyState(10, buttons[5]);
						ch.setKeyState(11, buttons[6]);
						ch.setKeyState(12, buttons[7]);
						ch.setKeyState(13, buttons[8]);
						ch.setKeyState(14, buttons[9]);

						gamepadId = gamepad.id;

					});

					GamePad.supported && gamepad.start();

					checkbox.addEventListener("click", function() {

						if ( ! GamePad.supported) {
							alert("Your browser doesn't support gamepads.");
							this.checked = false;
							return;
						}

						gamepad[["stop", "start"][+this.checked]]();
					});

					test.addEventListener("click", function() {
						if (gamepadId === false) {
							alert("No GamePad detected. Try pressing one if its buttons.");
						} else {
							alert("GamePad detected: " + gamepadId);
						}
					});

				})();

				// Full screen mode.
				(function() {
					var launchFullScreen = (canvas.requestFullScreen ||
					                    canvas.mozRequestFullScreen ||
									    canvas.webkitRequestFullScreen).bind(canvas, Element.ALLOW_KEYBOARD_INPUT);

					var makeEvent = function(prefix) {
						return "on" + prefix + "fullscreenchange";
					};

					var fullScreenEvent = ["", "webkit", "moz"].filter(function(prefix) {
						return document.hasOwnProperty(makeEvent(prefix));
					}).map(function(prefix) { return makeEvent(prefix); })[0];

					var getFullScreenElement = function () {
						return document.fullscreenElement ||
											document.webkitFullscreenElement ||
											document.mozFullscreenElement;
					};

					document.querySelector("#enable-full-screen").addEventListener("click", function() {
						if ( ! launchFullScreen) {
							alert("Full screen not supported.");
						} else {
							launchFullScreen();
						}
					});

					document[fullScreenEvent] = function() {
						if ( ! getFullScreenElement()) {
							chRenderer.setCellSize(CELL_SIZE);
							return;
						}

						var width = screen.width;
						var height = screen.height;

						var chWidth = ch.getDisplayWidth();
						var chHeight = ch.getDisplayHeight();

						var cellsWidth = Math.floor(width / chWidth) - 1;
						var cellsHeight = Math.floor(height / chHeight) - 1;

						var cellSize = Math.min(cellsWidth, cellsHeight);

						chRenderer.setCellSize(cellSize);

					};

				})();

                // Key handling.
                (function() {

	                var translateKeys = {
	                    49: 0x1,  // 1
	                    50: 0x2,  // 2
	                    51: 0x3,  // 3
	                    52: 0x4,  // 4
	                    81: 0x5,  // Q
	                    87: 0x6,  // W
	                    69: 0x7,  // E
	                    82: 0x8,  // R
	                    65: 0x9,  // A
	                    83: 0xA,  // S
	                    68: 0xB,  // D
	                    70: 0xC,  // F
	                    90: 0xD,  // Z
	                    88: 0xE,  // X
	                    67: 0xF,  // C
	                    86: 0x10  // V
	                };

	                document.addEventListener("keydown", function(event) {
	                    ch.setKey(translateKeys[event.keyCode]);
	                });

	                document.addEventListener("keyup", function(event) {
	                    ch.unsetKey(translateKeys[event.keyCode]);
	                });
				})();

				// FPS support.
				(function() {
					var fpsOutput = document.querySelector("#fps");
					setInterval(function() {
						fpsOutput.textContent = chRenderer.getFps().toPrecision(2);
					}, 1e3);

				})();

            })();
        
