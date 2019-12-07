class GameScene extends Phaser.Scene
{
	constructor()
	{
		super("Game");
	}

	init()
	{
		this.scene.launch("Ui");
	}

	create()
	{
		//Create cursors to read user input
		this.cursors = this.input.keyboard.createCursorKeys();

		//Create player instance
		this.player = new Player( this, 100, 100, "characters", 0);	
		
		//Create chest instance
		this.chest = new Chest( this, 300, 300, "items", 0 );
	}

	update()
	{
		//Call "update" method from player
		this.player.update( this.cursors );
	}
}