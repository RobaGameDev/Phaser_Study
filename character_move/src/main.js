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
			frameWidth: 48,
			frameHeight: 48,
		}); // debug 키고 사이즈 대충 확인해서 조절함 192 x 192 4 x 4 라 48이 맞음

		this.DIRECTION = {
			DOWN: 0,
			UP: 4,
			LEFT: 8,
			RIGHT: 12,
		};
	}

	create() {
		// this.background1 = this.add.image(0, 0, "background1");
		// this.background1.setOrigin(0, 0);

		// image
		// this.player = this.add.image(
		// 	config.width / 2,
		// 	config.height / 2,
		// 	"player",
		// 	0 // 0, 4, 8, 12
		// );

		// sprite
		this.player = this.add.sprite(
			config.width / 2,
			config.height / 2,
			"player"
		);

		this.player.scale = 3;

		this.player.direction = this.DIRECTION.DOWN;

		for (const direction in this.DIRECTION) {
			// console.log(this.DIRECTION[direction]);
			this.anims.create({
				key: `player_idle_${this.DIRECTION[direction]}`,
				frames: this.anims.generateFrameNumbers("player", {
					start: this.DIRECTION[direction],
					end: this.DIRECTION[direction] + 1,
				}),
				frameRate: 3,
				repeat: -1, // 무제한
			});

			this.anims.create({
				key: `player_anim_${this.DIRECTION[direction]}`,
				frames: this.anims.generateFrameNumbers("player", {
					start: this.DIRECTION[direction] + 2,
					end: this.DIRECTION[direction] + 3,
				}),
				frameRate: 3, // 1초에 x번
				repeat: -1, // 무제한
			});
		}

		this.player.play(`player_idle_${this.player.direction}`);

		this.physics.add.existing(this.player, false);

		this.keyboardInput = this.input.keyboard.createCursorKeys(); // key 정보 가지고 있음
		this.player.moving = false;
	}

	update(time, delta) {
		this.move(this.player);
	}

	move(player) {
		const PLAYER_SPEED = 2;

		const { left, right, up, down } = this.keyboardInput;
		let isDirectionChanged = false;

		if (left.isDown) {
			player.x -= PLAYER_SPEED;
			isDirectionChanged = player.direction == this.DIRECTION.LEFT;
			player.direction = this.DIRECTION.LEFT;
		} else if (right.isDown) {
			player.x += PLAYER_SPEED;
			isDirectionChanged = player.direction == this.DIRECTION.RIGHT;
			player.direction = this.DIRECTION.RIGHT;
		}

		if (up.isDown) {
			player.y -= PLAYER_SPEED;
			isDirectionChanged = player.direction == this.DIRECTION.UP;
			player.direction = this.DIRECTION.UP;
		} else if (down.isDown) {
			player.y += PLAYER_SPEED;
			isDirectionChanged = player.direction == this.DIRECTION.DOWN;
			player.direction = this.DIRECTION.DOWN;
		}

		if (left.isDown || right.isDown || up.isDown || down.isDown) {
			if (!player.moving || !isDirectionChanged) {
				player.play(`player_anim_${player.direction}`);
			}
			player.moving = true;
		} else {
			if (player.moving || isDirectionChanged) {
				player.play(`player_idle_${player.direction}`);
			}
			player.moving = false;
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
