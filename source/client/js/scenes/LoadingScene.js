class LoadingScene extends Phaser.Scene
{
	constructor()
	{
		super("Loading");
	}

	preload()
	{
		this.loadImages();
		this.loadSpritesheets();
		this.loadAudios();
		this.loadTileMap();
	}
	
	loadImages()
	{
		this.load.image( "button_normal", "/assets/images/ui/blue_button01.png" );
		this.load.image( "button_hover", "/assets/images/ui/blue_button02.png" );
		this.load.image( "background", "/assets/level/background.png" );
	}
	
	loadSpritesheets()
	{
		this.load.spritesheet( "items", "/assets/images/items.png", {frameWidth: 32, frameHeight: 32});
		this.load.spritesheet( "characters", "/assets/images/characters.png", {frameWidth: 32, frameHeight: 32});
	}
	
	loadAudios()
	{
		this.load.audio( "goldPickUpSound", ["/assets/audio/Pickup.wav"] );
	}

	loadTileMap()
	{
		this.load.tilemapTiledJSON( "map", "/assets/level/lvl_test.json" );
	}

	create()
	{
		this.scene.start("Game");
	}
}