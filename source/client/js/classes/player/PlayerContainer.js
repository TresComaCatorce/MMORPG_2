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
	constructor( scene, x, y, key, frame )
	{
		super( scene, x, y );
		this.scene = scene;
		this.velocity = 160;

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
}