//-----------------------------------------------------------------------------------------------------------------
// @author TresComaCatorce
//-----------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------
// "Player" class, used to create a player who contains zen.
//
// @param "scene": The scene where this player will be added to.
// @param "x": The X position of the player.
// @param "y": The Y position of the player.
// @param "key": The image of the player.
// @param "frame": 
//-----------------------------------------------------------------------------------------------------------------
class Player extends Phaser.Physics.Arcade.Image
{
	constructor( scene, x, y, key, frame )
	{
		super( scene, x, y, key, frame );
		this.scene = scene;
		this.velocity = 160;
		this.zen = 0;

		//Gold pickup sound
		this.goldPickUpSound = this.scene.sound.add( "goldPickUpSound", { loop: false, volume: .3 } );

		//Enable physics
		this.scene.physics.world.enable(this);

		//Set immovable if another object collides with our player
		this.setImmovable(false);

		//Scale the player
		this.setScale(2);

		//Enable collide with world bounds
		this.setCollideWorldBounds(true);

		//Add the player sprite to our existing scene
		this.scene.add.existing(this);

		//Camera follow the player
		this.scene.cameras.main.startFollow(this);
	}

	update(cursors)
	{
		this.body.setVelocity(0);

		if(cursors.left.isDown)
		{
			this.body.setVelocityX(-this.velocity);
		}
		else if(cursors.right.isDown)
		{
			this.body.setVelocityX(this.velocity);
		}
		
		if(cursors.up.isDown)
		{
			this.body.setVelocityY(-this.velocity);
		}
		else if(cursors.down.isDown)
		{
			this.body.setVelocityY(this.velocity);
		}
	}

	collectChest( player, chest )
	{
		this.zen += chest.coins;
		this.goldPickUpSound.play();
		this.scene.events.emit( "updateZen", this.zen );
		chest.destroy();
		this.scene.time.delayedCall( 1000, this.scene.spawnChest.bind(this.scene), [], this );
	}
}