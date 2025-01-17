import Phaser from "phaser";
import tiles from "./assets/Hills.png";
import balls from "./assets/balls.png";

class MyGame extends Phaser.Scene {
	constructor() {
		super();
	}

	preload() {
		this.load.image("tiles", tiles);
		this.load.tilemapTiledJSON("map", "/assets/sample_map.tmj");

		this.load.spritesheet("balls", balls, {
			frameWidth: 17,
			frameHeight: 17,
		});
	}

	create() {
		this.map = this.make.tilemap({ key: "map" });

		const tiles = this.map.addTilesetImage("hills_tileset", "tiles");

		const layer = this.map.createLayer(0, tiles, 0, 0);

		layer.scale = 2;

		// 충돌 처리
		layer.setCollisionByProperty({ collides: true });

		// 충돌 draw 처리
		// Visualize the colliding tiles
		this.debugGraphics = this.add.graphics();
		this.drawDebug();

		this.input.on("pointerdown", () => {
			this.debugGraphics.visible = !this.debugGraphics.visible;
			if (this.debugGraphics.visible) {
				this.drawDebug();
			}
		});

		// ball
		this.ball = this.physics.add.image(
			config.width / 2,
			config.height / 2,
			"balls"
		);

		// this.ball.setCollideWorldBounds(true);

		this.cursors = this.input.keyboard.createCursorKeys();

		// 충돌 처리
		this.physics.add.existing(this.ball);
		this.physics.add.collider(this.ball, layer);
	}

	update(time, delta) {
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

	drawDebug() {
		this.debugGraphics.clear();
		this.map.renderDebug(this.debugGraphics, { tileColor: null });
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
