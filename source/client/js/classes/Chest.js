class Chest extends Phaser.Physics.Arcade.Image
{
	constructor( scene, x, y, key, frame )
	{
		super( scene, x, y, key, frame );
		this.scene = scene;
		this.coins = Math.floor(Math.random() * (1000 - 50));

		//Enable physics
		this.scene.physics.world.enable(this);

		//Add the chest sprite to our existing scene
		this.scene.add.existing(this);
	}
}