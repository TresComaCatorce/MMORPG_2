import * as Phaser from 'phaser';
import scenes from './scenes/scenes';

const phaserConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	scene: scenes,
	physics:
	{
		default: 'arcade',
		arcade:
		{
			debug: false,
		},
	},
	pixelArt: true,
	roundPixels: true,
};

class Game extends Phaser.Game {
	constructor() {
		super(phaserConfig);
		this.scene.start('Loading');
	}
}

window.onload = () => {
	window.game = new Game();
};
