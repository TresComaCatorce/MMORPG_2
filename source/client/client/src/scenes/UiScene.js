import * as Phaser from 'phaser';

export default class UiScene extends Phaser.Scene {
	constructor() {
		super('Ui');
	}

	init() {
		// Get a reference to "Game" scene
		this.gameScene = this.scene.get('Game');
	}

	create() {
		this.setupUiElements();
		this.setupEvents();
	}

	setupUiElements() {
		// Create "gold" quantity display
		this.goldText = this.add.text(this.scale.width * 0.05, this.scale.height * 0.02, 'Gold: 0', { fontSize: '16px', fill: '#fff' });

		// Create "gold" icon
		this.goldIcon = this.add.image(this.scale.width * 0.025, this.scale.height * 0.03, 'items', 3);
	}

	setupEvents() {
		// Update gold quantity displayed
		this.gameScene.events.on('updateGold', (playerGold) => {
			this.goldText.setText(`Gold: ${playerGold}`);
		});
	}
}
