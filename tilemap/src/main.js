import Phaser from "phaser";

class MyGame extends Phaser.Scene {
	constructor() {
		super();
	}

	preload() {}

	create() {}

	update(time, delta) {}
}

const config = {
	type: Phaser.AUTO,
	width: 1024,
	height: 768,
	parent: "game-container",
	backgroundColor: 0x000000,
	physics: {
		default: "arcade",
		arcade: {
			debug: true,
		},
	},
	scene: MyGame,
};

export default new Phaser.Game(config);
