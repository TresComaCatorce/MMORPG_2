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
class Player extends Phaser.Physics.Arcade.Image
{
	constructor( scene, x, y, key, frame )
	{
		super( scene, x, y, key, frame );
		this.scene = scene;

		//Enable physics
		this.scene.physics.world.enable(this);

		//Set immovable if another object collides with our player
		this.setImmovable(false);

		//Scale the player
		this.setScale(2);

		//Add the player sprite to our existing scene
		this.scene.add.existing(this);
	}
}