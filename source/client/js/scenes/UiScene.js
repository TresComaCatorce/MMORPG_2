class UiScene extends Phaser.Scene
{
	constructor()
	{
		super("Ui");
	}

	init()
	{
		//Get a reference to "Game" scene
		this.gameScene = this.scene.get("Game");
	}

	create()
	{
		this.setupUiElements();
		this.setupEvents();
	}

	setupUiElements()
	{
		//Create "gold" quantity display
		this.goldText = this.add.text( this.scale.width*.05, this.scale.height*.02, "gold: 0", {fontSize: "16px", fill: "#fff"} );

		//Create "gold" icon
		this.goldIcon = this.add.image( this.scale.width*.025, this.scale.height*.03, "items", 3 );
	}

	setupEvents()
	{
		//Update gold quantity displayed
		this.gameScene.events.on( "updateGold", (playerGold) => {
			this.goldText.setText(`Gold: ${playerGold}`);
		});
	}
}