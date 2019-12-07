
var config =
{
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	scene:
	[
		LoadingScene,
		TitleScene,
		UiScene,
		GameScene
	],
	physics:
	{
		default: "arcade",
		arcade:
		{
			debug: true
		}
	}
}

var game = new Phaser.Game(config);
