//-----------------------------------------------------------------------------------------------------------------
// @author TresComaCatorce
//-----------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------
// "Chest" class, used to create a chest who contains gold.
//
// @param "scene": The scene where this chest will be added to.
// @param "x": The X position of the chest.
// @param "y": The Y position of the chest.
// @param "key": The image of the chest.
// @param "frame": 
//-----------------------------------------------------------------------------------------------------------------
import * as Phaser from 'phaser';

export default class Chest extends Phaser.Physics.Arcade.Image
{
	constructor( scene, x, y, key, frame, coins, id )
	{
		super( scene, x, y, key, frame );

		this.scene = scene;
		this.coins = coins;
		this.id = id;

		//Enable physics
		this.scene.physics.world.enable(this);

		//Add the chest sprite to our existing scene
		this.scene.add.existing(this);

		//Scale the chest game object
		this.setScale(2);
	}

	makeActive()
	{
		this.setActive(true);
		this.setVisible(true);
		this.body.checkCollision.none = false;
	}

	makeInactive()
	{
		this.setActive(false);
		this.setVisible(false);
		this.body.checkCollision.none = true;
	}
}