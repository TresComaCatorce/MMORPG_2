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
		this.createPlayer();
		this.createInputs();
		this.createChests();
		this.createWalls();
		this.createCollisions();
	}

	update()
	{
		//Call "update" method from player
		this.player.update( this.cursors );
	}

	createPlayer()
	{
		//Create player instance
		this.player = new Player( this, 100, 100, "characters", 0);	
	}

	createInputs()
	{
		//Create cursors to read user input
		this.cursors = this.input.keyboard.createCursorKeys();
	}

	createChests()
	{
		//Create a chest group
		this.chests = this.physics.add.group();

		//Array of chest positions
		this.chestPositions = [[100,100],[200,200],[300,300],[400,400],[500,500]];

		//Specify max number of chests
		this.maxNumberOfChests = 3;

		//Spawn the chests
		for (let i = 0; i < this.maxNumberOfChests; i++)
		{
			this.spawnChest();
		}
	}

	spawnChest()
	{
		const location = this.chestPositions[ Math.floor(Math.random() * this.chestPositions.length) ];
		const chest = new Chest( this, location[0], location[1], "items", 0 );
		this.chests.add(chest);
	}

	createWalls()
	{

	}

	createCollisions()
	{
		//Overlap event between player and chest
		this.physics.add.overlap( this.player, this.chests, this.player.collectChest.bind(this.player) );
	}
}