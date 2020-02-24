import "phaser";

const phaserConfig =
{
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	scene:
	{
		preload,
		create
	}
}

const game = new Phaser.Game( phaserConfig );

function preload()
{
	console.log("CBF preload");
}

function create()
{
	this.add.text( 0, 0, "CBF Hello world" );
}