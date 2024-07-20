import Phaser from "phaser";
import bgImg1 from "./assets/background.png";
import playerImg from "./assets/player.png";

class MyGame extends Phaser.Scene {
	constructor() {
		super();
	}

	preload() {
		this.load.image("background1", bgImg1);

		this.load.spritesheet("player", playerImg, {
			frameWidth: 32,
			frameHeight: 36,
		});
	}

	create() {
		this.background1 = this.add.image(0, 0, "background1");
		this.background1.setOrigin(0, 0);

		// sprite
		this.player = this.add.sprite(
			config.width / 2,
			config.height / 2,
			"player"
		);

		this.player.scale = 3;

		this.anims.create({
			key: "player_idle",
			frames: this.anims.generateFrameNumbers("player", {
				start: 0,
				end: 0,
			}),
			frameRate: 1,
			repeat: 0, // 무제한
		});

		this.player.play("player_idle");
	}
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
