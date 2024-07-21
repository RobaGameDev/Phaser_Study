import Phaser from "phaser";
import tiles from "./assets/Hills.png";

class MyGame extends Phaser.Scene {
	constructor() {
		super();
	}

	preload() {
		this.load.image("tiles", tiles);
		this.load.tilemapTiledJSON("map", "/assets/sample_map.tmj");
	}

	create() {
		const map = this.make.tilemap({ key: "map" });

		const tiles = map.addTilesetImage("hills_tileset", "tiles");

		const layer = map.createLayer(0, tiles, 0, 0);

		layer.scale = 2;
	}

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
