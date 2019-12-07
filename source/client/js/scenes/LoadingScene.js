class LoadingScene extends Phaser.Scene
{
	constructor()
	{
		super("Loading");
	}

	preload()
	{
		this.load.image( "button_normal", "/assets/images/ui/blue_button01.png" );
		this.load.image( "button_hover", "/assets/images/ui/blue_button02.png" );
		this.load.spritesheet( "items", "/assets/images/items.png", {frameWidth: 32, frameHeight: 32});
		this.load.spritesheet( "characters", "/assets/images/characters.png", {frameWidth: 32, frameHeight: 32});
	}

	create()
	{
		this.scene.start("Title");
	}
}