//-----------------------------------------------------------------------------------------------------------------
// @author TresComaCatorce
//-----------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------
// "Player" class, used to create a player.
//
// @param "scene": The scene where this player will be added to.
// @param "x": The X position of the player.
// @param "y": The Y position of the player.
// @param "key": The image of the player.
// @param "frame": 
//-----------------------------------------------------------------------------------------------------------------
class PlayerContainer extends Phaser.GameObjects.Container
{
	constructor( scene, x, y, key, frame, health, maxHealth, id )
	{
		super( scene, x, y );
		this.scene = scene;
		this.velocity = 160;
		this.currentDirection = Directions.RIGHT;
		this.playerAttacking = false;
		this.flipX = true;
		this.swordHit = false;
		this.gold = 0;
		this.health = health;
		this.maxHealth = maxHealth;
		this.id = id;

		//Set a size on the container
		this.setSize( 64, 64 );

		//Enable physics
		this.scene.physics.world.enable(this);

		//Enable collide with world bounds
		this.body.setCollideWorldBounds(true);

		//Add the player container sprite to our existing scene
		this.scene.add.existing(this);

		//Camera follow the player
		this.scene.cameras.main.startFollow(this);

		//Create te player
		this.player = new Player( this.scene, 0, 0, key, frame );
		this.add( this.player );

		//Create the weapon game object and andd to container
		this.weapon = this.scene.add.image( 40, 0, "items", 4 );
		this.scene.add.existing( this.weapon );
		this.weapon.setScale(1.5);
		this.scene.physics.world.enable(this.weapon);
		this.add(this.weapon);
		this.weapon.alpha = 0;

		//Create the player health bar
		this.createHealtBar();
	}

	update(cursors)
	{
		this.body.setVelocity(0);

		if(cursors.left.isDown)
		{
			this.body.setVelocityX(-this.velocity);
			this.currentDirection = Directions.LEFT;
			this.weapon.setPosition( -40, 0 );
			this.player.flipX = false;
		}
		else if(cursors.right.isDown)
		{
			this.body.setVelocityX(this.velocity);
			this.currentDirection = Directions.RIGHT;
			this.weapon.setPosition( 40, 0 );
			this.player.flipX = true;
		}
		
		if(cursors.up.isDown)
		{
			this.body.setVelocityY(-this.velocity);
			this.currentDirection = Directions.UP;
			this.weapon.setPosition( 0, -40 );
		}
		else if(cursors.down.isDown)
		{
			this.body.setVelocityY(this.velocity);
			this.currentDirection = Directions.DOWN;
			this.weapon.setPosition( 0, 40 );
		}

		if( Phaser.Input.Keyboard.JustDown(cursors.space) && !this.playerAttacking )
		{
			this.weapon.alpha = 1;
			this.playerAttacking = true;
			this.scene.time.delayedCall( 150, () => {
				this.weapon.alpha = 0;
				this.playerAttacking = false;
				this.swordHit = false;
			}, [], this );
		}

		if( this.playerAttacking )
		{
			if( this.weapon.flipX )
			{
				this.weapon.angle -= 10;
			}
			else
			{
				this.weapon.angle += 10;
			}
		}
		else
		{
			if( this.currentDirection === Directions.DOWN )
			{
				this.weapon.setAngle(-270);
			}
			else if( this.currentDirection === Directions.UP )
			{
				this.weapon.setAngle(-90);
			}
			else
			{
				this.weapon.setAngle(0);
			}

			this.weapon.flipX = false;
			if( this.currentDirection === Directions.LEFT )
			{
				this.weapon.flipX = true;
			}
		}

		this.updateHealthBar();
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
		this.healthBar.fillRect( this.x-32, this.y-40, 64, 5 );
		this.healthBar.fillGradientStyle( 0xff0000, 0xffffff, 4 );
		this.healthBar.fillRect( this.x-32, this.y-40, 64*this.health/this.maxHealth, 5 );
	}
}