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

// Different option in the game
options = {
	isPlayingBgm: true,
	isReplayEnabled: true,
	seed: 16,
};

// Create different Jsdoc for different elements in the game
/** @type {{pos: Vector, angle: number}} */
let player;

// Where game update
function update() {
	// Initialize varaibles
	if (!ticks) {
		
	}
}
