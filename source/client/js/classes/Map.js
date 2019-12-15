class Map
{
	constructor( scene, key, tileSetName, bgLayerName, blockedLayerName )
	{
		this.scene = scene;
		this.key = key; //Tiled JSON file key name
		this.tileSetName = tileSetName; //Tiled tileset image key name
		this.bgLayerName = bgLayerName; //Name of the layer created in tiled for the background
		this.blockedLayerName = blockedLayerName; //Name of the layer created in tiled for the blocked areas
		this.createMap();
	}

	createMap()
	{
		//Create the tilemap
		this.map = this.scene.make.tilemap( {key: this.key} );
		
		//Add the tileset image to the map
		this.tiles = this.map.addTilesetImage( this.tileSetName, this.tileSetName, 32, 32 );

		//Create the background layer
		this.backgroundLayer = this.map.createStaticLayer( this.bgLayerName, this.tiles, 0, 0 );
		this.backgroundLayer.setScale(2);

		//Create the blockedLayer
		this.blockedLayer = this.map.createStaticLayer( this.blockedLayerName, this.tiles, 0, 0 );
		this.blockedLayer.setScale(2);
		this.blockedLayer.setCollisionByExclusion([-1]);

		//Update the world bounds
		this.scene.physics.world.bounds.width = this.map.widthInPixels * 2;
		this.scene.physics.world.bounds.height = this.map.heightInPixels * 2;

		//Limit the camera to the size of the map
		this.scene.cameras.main.setBounds( 0, 0, this.map.widthInPixels*2, this.map.heightInPixels*2 );
	}
}