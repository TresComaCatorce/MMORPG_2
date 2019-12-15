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
		this.createMap();
		this.createChests();
		this.createInputs();
		this.createGameManager();
	}

	update()
	{
		if(this.player)
		{
			//Call "update" method from player
			this.player.update( this.cursors );
		}
	}

	createPlayer( location )
	{
		//Create player instance
		this.player = new Player( this, location[0]*2, location[1]*2, "characters", 0);	
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

	createCollisions()
	{
		//Check for collisions between the player and the tiled blocked layer
		this.physics.add.collider( this.player, this.map.blockedLayer );

		//Overlap event between player and chest
		this.physics.add.overlap( this.player, this.chests, this.player.collectChest.bind(this.player) );
	}

	createMap()
	{
		//Create the map
		this.map = new Map( this, "map", "background", "background", "blocked" );
	}

	createGameManager()
	{
		this.events.on( "spawnPlayer", ( location ) => {
			this.createPlayer(location);
			this.createCollisions();
		});

		this.gameManager = new GameManager( this, this.map.map.objects );
		this.gameManager.setup();
	}
}