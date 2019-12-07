class UiScene extends Phaser.Scene
{
	constructor()
	{
		super("Ui");
	}

	create()
	{
		this.setupUiElements();
		this.setupEvents();
	}

	setupUiElements()
	{
		//Create "Zen" quantity display
		this.zenText = this.add.text( this.scale.width*.05, this.scale.height*.02, "Zen: 0", {fontSize: "16px", fill: "#fff"} );

		//Create "Zen" icon
		this.zenIcon = this.add.image( this.scale.width*.025, this.scale.height*.03, "items", 3 );
	}

	setupEvents()
	{

	}
}