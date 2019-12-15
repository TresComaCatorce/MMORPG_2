class Spawner
{
	constructor( config, spawnLocations, addObject, deleteObject )
	{
		this.id = config.id;
		this.spawnInterval = config.spawnInterval;
		this.limit = config.limit;
		this.objectType = config.spawnerType;

		this.spawnLocations = spawnLocations;
		
		this.addObject = addObject;
		this.deleteObject = deleteObject;

		this.objectsCreated = [];

		this.start();
	}

	start()
	{
		this.interval = setInterval( () => {
			if( this.objectsCreated.length<this.limit )
			{
				this.spawnObject();
			}
		}, this.spawnInterval);
	}

	spawnObject()
	{
		if( this.objectType === SpawnerTypes.CHEST )
		{
			this.spawnChest();
		}
	}

	spawnChest()
	{
		const location = this.pickRandomLocation();
		const chest = new ChestModel( location[0], location[1], 10, this.id );
		this.objectsCreated.push(chest);
		this.addObject( chest.id, chest );
	}

	pickRandomLocation()
	{
		const location = this.spawnLocations[Math.floor(Math.random()*this.spawnLocations.length)];
		const invalidLocation = this.objectsCreated.some( (obj) => {
			return obj.x === location[0] && obj.y === location[1];
		});

		if(invalidLocation)
		{
			return this.pickRandomLocation();
		}

		return location;
	}

	removeObject( id )
	{
		this.objectsCreated = this.objectsCreated.filter( (obj) => {
			return obj.id !== id;
		});

		this.deleteObject(id);
	}
}