//-----------------------------------------------------------------------------------------------------------------
// @author TresComaCatorce
//-----------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------
// "UiButton" class, used to create a UI button.
//
// @param "scene": The scene where this button will be added to.
// @param "x": The X position of the button.
// @param "y": The Y position of the button.
// @param "key": The image of the button.
// @param "hoverKey": The image that will be displayed on hover.
// @param "text": The text that will displayed in the button.
// @param "targetCallback": The callback function that will be called when user click the button.
//-----------------------------------------------------------------------------------------------------------------
class UiButton extends Phaser.GameObjects.Container
{
	constructor( scene, x, y, key, hoverKey, text, targetCallBack )
	{
		super( scene, x, y );
		this.scene = scene;
		this.x = x;
		this.y = y;
		this.key = key;
		this.hoverKey = hoverKey;
		this.text = text;
		this.targetCallBack = targetCallBack;

		//Create the button
		this.createButton();

		//Add this container to scene
		this.scene.add.existing(this);
	}

	createButton()
	{
		//Create the button, text and align
		this.button = this.scene.add.sprite( 0, 0, this.key );
		this.buttonText = this.scene.add.text( 0, 0, this.text, {fontSize: "26px", fill: "#fff"} );
		Phaser.Display.Align.In.Center(this.buttonText, this.button);

		//Setting the button interactive
		this.button.setInteractive();

		//Button click
		this.button.on("pointerup", this.targetCallBack);

		//Button hover
		this.button.on("pointerover", () => {
			this.button.setTexture(this.hoverKey);
		});

		//Button no-hover
		this.button.on("pointerout", () => {
			this.button.setTexture(this.key);
		});

		//Add the button & buttonText into this container
		this.add(this.button);
		this.add(this.buttonText);
	}
}

