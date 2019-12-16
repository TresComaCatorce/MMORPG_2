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
		this.createGroups();
		this.createInputs();
		this.createSounds()
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
		this.player = new PlayerContainer( this, location[0]*2, location[1]*2, "characters", 0);	
	}

	createInputs()
	{
		//Create cursors to read user input
		this.cursors = this.input.keyboard.createCursorKeys();
	}

	createSounds()
	{
		//Gold pickup sound
		this.goldPickUpSound = this.sound.add( "goldPickUpSound", { loop: false, volume: .3 } );
	}

	createGroups()
	{
		//Create a chest group
		this.chests = this.physics.add.group();

		//Create a monster group
		this.monsters = this.physics.add.group();
	}

	spawnChest( chestObj )
	{
		let chest = this.chests.getFirstDead();

		if(!chest)
		{
			chest = new Chest
			(
				this,
				chestObj.x*2,
				chestObj.y*2,
				"items",
				0,
				chestObj.gold,
				chestObj.id
			);
			this.chests.add(chest);
		}
		else
		{
			chest.coins = chestObj.gold;
			chest.id = chestObj.id;
			chest.setPosition( chestObj.x*2, chestObj.y*2 );
			chest.makeActive();
		}
	}

	spawnMonster( monsterObj )
	{
		console.log("Monster: ", monsterObj);
		let monster = this.monsters.getFirstDead();

		if(!monster)
		{
			monster = new Monster
			(
				this,
				monsterObj.x*2,
				monsterObj.y*2,
				"monsters",
				monsterObj.frame,
				monsterObj.id,
				monsterObj.health,
				monsterObj.maxHealth
			);
			this.monsters.add(monster);
		}
		else
		{
			monster.id = monsterObj.id;
			monster.health = monsterObj.health;
			monster.maxHealth = monsterObj.maxHealth;
			monster.setTexture( "monsters", monsterObj.frame );
			monster.setPosition( monsterObj.x*2, monsterObj.y*2 );
			monster.makeActive();
		}
	}

	createCollisions()
	{
		//Check for collisions between the player and the tiled blocked layer
		this.physics.add.collider( this.player, this.map.blockedLayer );

		//Overlap event between player and chest
		this.physics.add.overlap( this.player, this.chests, this.collectChest.bind(this) );

		//Overlap event between monster group and the tiled block layer
		this.physics.add.collider( this.monsters, this.map.blockedLayer );

		//Overlap event between player and monster 
		this.physics.add.overlap( this.player, this.monsters, this.enemyOverlaped, null, this );
	}

	enemyOverlaped( playerObj, enemyObj )
	{
		enemyObj.makeInactive();
		this.events.emit( "destroyEnemy", enemyObj.id );
	}

	collectChest( player, chest )
	{
		//Play sound
		this.goldPickUpSound.play();

		//Update gold quantity
		player.gold += chest.coins;

		//Update gold quantity in UI
		this.events.emit( "updateGold", player.gold );
		
		//Inactive the chest
		chest.makeInactive();

		this.events.emit( "pickUpChest", chest.id );
	}

	createMap()
	{
		//Create the map
		this.map = new Map( this, "map", "background", "background", "blocked" );
	}

	createGameManager()
	{
		this.events.on( "spawnPlayer",  location => {
			this.createPlayer(location);
			this.createCollisions();
		});

		this.events.on( "chestSpawned",  chest => {
			this.spawnChest(chest);
		});
		
		this.events.on( "monsterSpawned",  monster => {
			this.spawnMonster(monster);
		});

		this.gameManager = new GameManager( this, this.map.map.objects );
		this.gameManager.setup();
	}
}