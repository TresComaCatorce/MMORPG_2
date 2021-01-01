import * as Phaser from 'phaser';

import Map from '../classes/Map';
import Monster from '../classes/Monster';
import Chest from '../classes/UI/Chest';
import GameManager from '../classes/gameManager/GameManager';
import PlayerContainer from '../classes/player/PlayerContainer';

export default class GameScene extends Phaser.Scene {
	constructor() {
		super('Game');
	}

	init() {
		this.scene.launch('Ui');
	}

	create() {
		this.createMap();
		this.createGroups();
		this.createInputs();
		this.createSounds();
		this.createGameManager();
	}

	update() {
		if (this.player) {
			// Call "update" method from player
			this.player.update(this.cursors);
		}
	}

	createPlayer(playerObj) {
		// Create player instance
		this.player = new PlayerContainer(
			this,
			playerObj.x * 2,
			playerObj.y * 2,
			'characters',
			1,
			playerObj.health,
			playerObj.maxHealth,
			playerObj.id,
		);
	}

	createInputs() {
		// Create cursors to read user input
		this.cursors = this.input.keyboard.createCursorKeys();
	}

	createSounds() {
		// Gold pickup sound
		this.goldPickUpSound = this.sound.add('goldPickUpSound', { loop: false, volume: 0.3 });
	}

	createGroups() {
		// Create a chest group
		this.chests = this.physics.add.group();

		// Create a monster group
		this.monsters = this.physics.add.group();
		this.monsters.runChildUpdate = true;
	}

	spawnChest(chestObj) {
		let chest = this.chests.getFirstDead();

		if (!chest) {
			chest = new Chest(
				this,
				chestObj.x * 2,
				chestObj.y * 2,
				'items',
				0,
				chestObj.gold,
				chestObj.id,
			);
			this.chests.add(chest);
		} else {
			chest.coins = chestObj.gold;
			chest.id = chestObj.id;
			chest.setPosition(chestObj.x * 2, chestObj.y * 2);
			chest.makeActive();
		}
	}

	spawnMonster(monsterObj) {
		let monster = this.monsters.getFirstDead();

		if (!monster) {
			monster = new Monster(
				this,
				monsterObj.x,
				monsterObj.y,
				'monsters',
				monsterObj.frame,
				monsterObj.id,
				monsterObj.health,
				monsterObj.maxHealth,
			);
			this.monsters.add(monster);
		} else {
			monster.id = monsterObj.id;
			monster.health = monsterObj.health;
			monster.maxHealth = monsterObj.maxHealth;
			monster.setTexture('monsters', monsterObj.frame);
			monster.setPosition(monsterObj.x, monsterObj.y);
			monster.makeActive();
		}
	}

	createCollisions() {
		// Check for collisions between the player and the tiled blocked layer
		this.physics.add.collider(this.player, this.map.blockedLayer);

		// Overlap event between player and chest
		this.physics.add.overlap(this.player, this.chests, this.collectChest.bind(this));

		// Overlap event between monster group and the tiled block layer
		this.physics.add.collider(this.monsters, this.map.blockedLayer);

		// Overlap event between player weapon and monster
		this.physics.add.overlap(this.player.weapon, this.monsters, this.enemyOverlaped, null, this);
	}

	enemyOverlaped(weapon, enemyObj) {
		if (this.player.playerAttacking && !this.player.swordHit) {
			this.player.swordHit = true;
			this.events.emit('monsterAttack', enemyObj.id, this.player.id);
		}
	}

	collectChest(player, chest) {
		// Play sound
		this.goldPickUpSound.play();

		this.events.emit('pickUpChest', chest.id, player.id);
	}

	createMap() {
		// Create the map
		this.map = new Map(this, 'map', 'background', 'background', 'blocked');
	}

	createGameManager() {
		this.events.on('spawnPlayer', (playerObj) => {
			this.createPlayer(playerObj);
			this.createCollisions();
		});

		this.events.on('chestSpawned', (chest) => {
			this.spawnChest(chest);
		});

		this.events.on('monsterSpawned', (monster) => {
			this.spawnMonster(monster);
		});

		this.events.on('monsterDestroy', (monsterId) => {
			this.monsters.getChildren().forEach((monster) => {
				if (monster.id === monsterId) {
					monster.makeInactive();
				}
			});
		});

		this.events.on('chestRemove', (chestId) => {
			this.chests.getChildren().forEach((chest) => {
				if (chest.id === chestId) {
					chest.makeInactive();
				}
			});
		});

		this.events.on('updateMonsterHealth', (monsterId, health) => {
			this.monsters.getChildren().forEach((monster) => {
				if (monster.id === monsterId) {
					monster.updateHealth(health);
				}
			});
		});

		this.events.on('monsterMovement', (monsters) => {
			this.monsters.getChildren().forEach((monster) => {
				Object.keys(monsters).forEach((monsterId) => {
					if (monster.id === monsterId) {
						this.physics.moveToObject(monster, monsters[monsterId], 40);
					}
				});
			});
		});

		this.events.on('updatePlayerHealth', (playerId, health) => {
			this.player.updateHealth(health);
		});

		this.gameManager = new GameManager(this, this.map.map.objects);
		this.gameManager.setup();
	}
}
