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
let isColliding;

// Where game update
function update() {
	// Initialize varaibles
	if (!ticks) {
		isColliding = false;
		Ground = [];
		player = { pos: vec(GAME.WIDTH, 0), angle: -PI / 2 };
		Ground.push({
			pos: vec(0, GAME.HEIGHT - 10),
			width: GAME.WIDTH
		});
		nextGroundDist = 0;
	}

	// The Difficulty of the game.
	const scr = sqrt(difficulty);

	// Draw character
	//color("black");
	// char(addWithCharCode("a", floor(ticks / 20) % 2), player.pos);
	//char("a", player.pos);
	//player movement (without stilts)

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
		g.pos.x -= scr;
		color("green");
		rect(g.pos.x, g.pos.y, g.width, 26).isColliding.char.a;
	});


	// Ground checking Conditions
	remove(Ground, (g) => {
		//CAUTION: it may execute many times after one tick causing the speed inconsistency
		// Checks collision with ground and moves player down if not colliding
		// Add gravity to the player when collide with ground
		color("black");
		isColliding = isColliding || char("a", player.pos).isColliding.rect.green;
		// Remove the Ground when it is out of the screen
		return g.pos.x + g.width  < 0
	});
	if(input.isPressed){
		if(player.pos.y <= GAME.HEIGHT - 10){
			player.pos.x += GAME.PLAYERSPEED;
		}else{
			player.pos.x -= scr;
			player.pos.y += GAME.GRAVITY;
		}
		}else{
			player.pos.x -= scr;
			if (!isColliding || player.pos.y >= GAME.HEIGHT - 10) {
				player.pos.y += GAME.GRAVITY;
			}
		}
	isColliding = false;

}
