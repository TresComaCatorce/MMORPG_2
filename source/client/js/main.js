
var config =
{
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	scene:
	[
		LoadingScene,
		TitleScene,
		GameScene,
		UiScene
	],
	physics:
	{
		default: "arcade",
		arcade:
		{
			debug: true
		}
	},
	pixelArt: true,
	roundPixels: true
}

var game = new Phaser.Game(config);
