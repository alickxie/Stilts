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
`
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
};

// Create different Jsdoc for different elements in the game
/** @type {{pos: Vector, angle: number}} */
let player;
// Create different Jsdoc for different elements in the game
/** @type {{pos: Vector, width: number}[]} */
let Ground;
let nextGroundDist;


// Where game update
function update() {
	// Initialize varaibles
	if (!ticks) {
		Ground = [];
		player = { pos: vec(GAME.WIDTH / 5, 0), angle: -PI / 2 };
	}

	// The Difficulty of the game.
	const scr = sqrt(difficulty);

	// Draw character
	color("black");
	// char(addWithCharCode("a", floor(ticks / 20) % 2), player.pos);
	char("a", player.pos);
	//player movement (without stilts)
	if (input.isPressed) {
		player.pos.x += GAME.PLAYERSPEED;
	}

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

	// Ground checking Conditions
	remove(Ground, (g) => {
		g.pos.x -= scr;
		color("green");
		// Checks collision with ground and moves player down if not colliding
		const isColliding = rect(g.pos.x, g.pos.y, g.width, 26).isColliding.char.a;

		// Add gravity to the player when collide with ground
		if (!isColliding) {
			console.log(isColliding);
			if (player.pos.y != g.pos.y - 3){
				player.pos.y += GAME.GRAVITY;
			}
		} else {
			player.pos.x -= GAME.PLAYERSPEED;
			player.pos.y = g.pos.y - 3;
		}

		// Remove the Ground when it is out of the screen
		return g.pos.x < -GAME.WIDTH / 2
	});
}
