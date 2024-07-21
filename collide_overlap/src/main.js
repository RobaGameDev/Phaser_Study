import Phaser from "phaser";
import balls from "./assets/balls.png";

class MyGame extends Phaser.Scene {
	constructor() {
		super();
	}

	preload() {
		// spritesheet load
		this.load.spritesheet("balls", balls, {
			frameWidth: 17,
			frameHeight: 17,
		});
	}

	create() {
		// ball
		this.ball = this.physics.add.image(
			config.width / 2,
			config.height / 2,
			"balls",
			0
		);
		// ball2
		this.ball2 = this.physics.add.image(
			config.width / 2,
			config.height / 4,
			"balls",
			1
		);
		// ball3
		this.ball3 = this.physics.add.image(
			config.width / 4,
			config.height / 2,
			"balls",
			2
		);

		// keyboard input
		this.cursors = this.input.keyboard.createCursorKeys();

		// physics
		this.physics.add.existing(this.ball);
		this.physics.add.existing(this.ball2);
		this.physics.add.existing(this.ball3);
	}

	update(time, delta) {
		this.move();

		// collide
		this.physics.collide(this.ball, this.ball2);

		// overlap
		this.physics.overlap(this.ball, this.ball3, (ball, ball3) => {
			ball3.destroy();
		});
	}

	move() {
		this.ball.setVelocity(0);
		const SPEED = 150;

		if (this.cursors.left.isDown) {
			this.ball.setVelocityX(-SPEED);
		} else if (this.cursors.right.isDown) {
			this.ball.setVelocityX(SPEED);
		}

		if (this.cursors.up.isDown) {
			this.ball.setVelocityY(-SPEED);
		} else if (this.cursors.down.isDown) {
			this.ball.setVelocityY(SPEED);
		}
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
