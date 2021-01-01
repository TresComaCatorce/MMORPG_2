import * as Phaser from 'phaser';

export default class Monster extends Phaser.Physics.Arcade.Image
{
	constructor( scene, x, y, key, frame, id, health, maxHealth )
	{
		super( scene, x, y, key, frame );
		this.scene = scene;
		this.id = id;
		this.health = health;
		this.maxHealth = maxHealth;

		//Enable physics
		this.scene.physics.world.enable(this);

		//Set immovable if another object collides with our monster
		this.setImmovable(false);

		//Scale the monster
		this.setScale(2);

		//Enable collide with world bounds
		this.setCollideWorldBounds(true);

		//Add the monster sprite to our existing scene
		this.scene.add.existing(this);

		//Update the origin
		this.setOrigin(0);

		this.createHealtBar();
	}

	createHealtBar()
	{
		this.healthBar = this.scene.add.graphics();
		this.updateHealthBar();
	}

	updateHealth( health )
	{
		this.health = health;
		this.updateHealthBar();
	}

	updateHealthBar()
	{
		this.healthBar.clear();
		this.healthBar.fillStyle( 0xffffff, 1 );
		this.healthBar.fillRect( this.x, this.y - 8, 64, 5 );
		this.healthBar.fillGradientStyle( 0xff0000, 0xffffff, 4 );
		this.healthBar.fillRect( this.x, this.y - 8, 64*this.health/this.maxHealth, 5 );
	}

	makeActive()
	{
		this.setActive(true);
		this.setVisible(true);
		this.body.checkCollision.none = false;
		this.updateHealthBar();
	}

	makeInactive()
	{
		this.setActive(false);
		this.setVisible(false);
		this.body.checkCollision.none = true;
		this.healthBar.clear();
	}

	update()
	{
		this.updateHealthBar();
	}
}