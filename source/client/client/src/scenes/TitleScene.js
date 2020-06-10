import * as Phaser from 'phaser';
import UiButton from '../classes/UiButton';

export default class TitleScene extends Phaser.Scene {
	constructor() {
		super('Title');
	}

	create() {
		// Create title text
		this.titleText = this.add.text(this.scale.width / 2, this.scale.height * 0.4, 'Ragtum MMORPG', { fontSize: '64px', fill: '#fff' });
		this.titleText.setOrigin(0.5);

		// Create "Play" button
		this.playButton = new UiButton(this, this.scale.width / 2, this.scale.height * 0.6, 'button_normal', 'button_hover', 'Start Game', this.startScene.bind(this, 'Game'));
	}

	startScene(targetScene) {
		this.scene.start(targetScene);
	}
}
