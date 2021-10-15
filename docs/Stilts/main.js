// Title of the game
title = "Stilts";

// Instruction to play the game
description = `
[Hold] Walk
`;

// Sprites in the game
characters = [
	`
llllll
ll l l
ll l l
llllll
 l  l
 l  l
`,
	`
llllll
ll l l
ll l l
llllll
ll  ll
`,
	`
yyy
yyy
`,
];

// The Variable for setting up the game
const GAME = {
	WIDTH: 150,
	HEIGHT: 110,
	PLAYERSPEED: 2,
	GROUND_OFFSET: 20,
	GRAVITY: 0.5
}

// Different option in the game
options = {
	isPlayingBgm: true,
	isReplayEnabled: true,
	seed: 16,
	viewSize: { x: GAME.WIDTH, y: GAME.HEIGHT },
	isCapturing: true,
    isCapturingGameCanvasOnly: true,
    captureCanvasScale: 5
};

// Create different Jsdoc for different elements in the game
/** @type {{pos: Vector, angle: number}} */
let player;
let stiltsLeftAngle;
let stiltsRightAngle;
let flip;
let interchange;
let onGround;
// Create different Jsdoc for different elements in the game
/** @type {{pos: Vector, width: number}[]} */
let Ground;
let nextGroundDist;
let isColliding;

// Where game update
function update() {
	// Initialize varaibles
	if (!ticks) {
		isColliding = false;
		Ground = [];
		player = { pos: vec(GAME.WIDTH, 0), angle: -PI / 2 };
		stiltsLeftAngle = PI / 2;
		stiltsRightAngle = PI / 2;
		flip = false;
		interchange = false;
		onGround = false;
		Ground.push({
			pos: vec(0, GAME.HEIGHT - 10),
			width: GAME.WIDTH
		});
		nextGroundDist = 0;
	}

	// The Difficulty of the game.
	const scr = sqrt(difficulty);

	// Push ground pos and width into the Ground Array
	if (Ground.length === 0) {
		nextGroundDist = 0;
	}
	nextGroundDist -= scr;
	if (nextGroundDist < 0) {
		const width = rnd(40, 80);
		Ground.push({
			pos: vec(GAME.WIDTH, GAME.HEIGHT - 10),
			width
		});
		nextGroundDist += width + rnd(10, 20);
	}
	Ground.forEach((g) => {
		g.pos.x -= 1, 0 * (scr);
		color("green");
		rect(g.pos.x, g.pos.y, g.width, 26).isColliding.char.a;
	});


	// Add Stilts Steps for the player
	color("yellow");
	char("c", vec(player.pos.x - 3, player.pos.y + 4));
	char("c", vec(player.pos.x + 3, player.pos.y + 4));
	const leftStilt = bar(player.pos.x - 5, player.pos.y + 4, 20, 3, stiltsLeftAngle, 0.5).isColliding;
	const rightStilt = bar(player.pos.x + 5, player.pos.y + 4, 20, 3, stiltsRightAngle, 0.5).isColliding;
	if (leftStilt.rect.green || rightStilt.rect.green) {
		onGround = true;
	} else {
		onGround = false;
	}

	color("green");
	// Ground checking Conditions
	remove(Ground, (g) => {
		//CAUTION: it may execute many times after one tick causing the speed inconsistency
		// Checks collision with ground and moves player down if not colliding
		// Add gravity to the player when collide with ground
		color("yellow");
		isColliding = isColliding || onGround;
		// Remove the Ground when it is out of the screen
		return g.pos.x + g.width < 0;
	});

	// Make the player on screen
	color("black");
	char("a", player.pos)

	// Move the player forward when player pressing the button,
	// else it will shift player to the left of the scene.
	if (input.isPressed) {
		if (player.pos.y <= GAME.HEIGHT - 10) {
			if (player.pos.x < GAME.WIDTH){ // Don't allow the player to move out from the right bound
				player.pos.x += GAME.PLAYERSPEED * 0.1;
			}
			player.pos.y += GAME.GRAVITY;

			// The Stilts Animation when player is moving
			// It rotate left and right stilt interchange which looks like moving
			if (!flip) {
				stiltsRightAngle += -0.01 * PI;
				if (interchange) {
					stiltsLeftAngle += 0.01 * PI;
				}
				if (stiltsRightAngle < 1.0) {
					flip = true;
					interchange = true;
				}
			} else if (flip) {
				stiltsRightAngle += 0.01 * PI;
				if (interchange) {
					stiltsLeftAngle += -0.01 * PI;
				}
				if (stiltsRightAngle > 1.7) {
					flip = false;
					interchange = true;
				}
			}

		} else {
			player.pos.y += GAME.GRAVITY;
		}
	} else {
		if (!isColliding || player.pos.y >= GAME.HEIGHT - 10) {
			player.pos.x -= scr;
			player.pos.y += GAME.GRAVITY;
		} else {
			player.pos.x -= scr;
		}
	}

	// The Game End condition when player touch the bottom of the scene
	// or move too slow (Touch the left bound of the screen).
	if (player.pos.y > 110 || player.pos.x < -5) {
		play("laser");
		end();
	}

	isColliding = false;
}
