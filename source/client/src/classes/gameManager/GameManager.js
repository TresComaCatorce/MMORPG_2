import Spawner from './Spawner';
import PlayerModel from './PlayerModel';
import { SpawnerTypes } from './utils';

export default class GameManager
{
	constructor( scene, mapData)
	{
		this.scene = scene;
		this.mapData = mapData;

		this.spawners = {};
		this.chests = {};
		this.monsters = {};
		this.players = {};

		this.playerLocations = [];
		this.chestLocations = {};
		this.monsterLocations = {};
	}

	setup()
	{
		this.parseMapData();
		this.setupEventListeners();
		this.setupSpawners();
		this.spawnPlayer();
	}

	parseMapData()
	{
		this.mapData.forEach( (layer) => {
			if( layer.name === "player_locations" )
			{
				layer.objects.forEach( (obj) => {
					this.playerLocations.push( [obj.x + (obj.width / 2), obj.y - (obj.height / 2)] );
				});
			}
			else if( layer.name === "chest_locations" )
			{
				layer.objects.forEach( (obj) => {
					if( this.chestLocations[obj.properties.spawner] )
					{
						this.chestLocations[obj.properties.spawner].push( [obj.x + (obj.width / 2), obj.y - (obj.height / 2)] );
					}
					else
					{
						this.chestLocations[obj.properties.spawner] = [ [obj.x + (obj.width / 2), obj.y - (obj.height / 2)] ];
					}
				});
			}
			else if( layer.name === "monster_locations" )
			{
				layer.objects.forEach( (obj) => {
					if( this.monsterLocations[obj.properties.spawner] )
					{
						this.monsterLocations[obj.properties.spawner].push( [obj.x + (obj.width / 2), obj.y - (obj.height / 2)] );
					}
					else
					{
						this.monsterLocations[obj.properties.spawner] = [ [obj.x + (obj.width / 2), obj.y - (obj.height / 2)] ];
					}
				});
			}
		});
	}

	setupEventListeners()
	{
		this.scene.events.on( "pickUpChest", ( chestId, playerId ) => {
			//Update the spawner
			if(this.chests[chestId])
			{
				const { gold } = this.chests[chestId];

				//Updating the player gold
				this.players[playerId].updateGold(gold);
				this.scene.events.emit( "updateGold", this.players[playerId].gold );

				this.spawners[ this.chests[chestId].spawnerId ].removeObject(chestId);
				this.scene.events.emit( "chestRemove", chestId );
			}
		});

		this.scene.events.on( "monsterAttack", ( monsterId, playerId ) => {
			//Update the spawner
			if(this.monsters[monsterId])
			{
				const { gold, attack } = this.monsters[monsterId];

				//Subtract health from monster model
				this.monsters[monsterId].loseHealth();

				//Check the monster health
				if( this.monsters[monsterId].health <= 0)
				{
					//Updating the player gold
					this.players[playerId].updateGold(gold);
					this.scene.events.emit( "updateGold", this.players[playerId].gold );

					//Removing the monster
					this.spawners[ this.monsters[monsterId].spawnerId ].removeObject(monsterId);
					this.scene.events.emit( "monsterDestroy", monsterId );
				}
				else
				{
					//Update the players health
					this.players[playerId].updateHealth(-attack);
					this.scene.events.emit( "updatePlayerHealth", playerId, this.players[playerId].health );

					//Update the monster health
					this.scene.events.emit( "updateMonsterHealth", monsterId, this.monsters[monsterId].health );
				}
			}
		});
	}

	setupSpawners()
	{
		const config = {
			spawnInterval: 3000,
			limit: 3,
			spawnerType: '',
			id: ''
		};

		let spawner;

		//Create chest spawners
		Object.keys(this.chestLocations).forEach( key => {
			
			config.spawnerType = SpawnerTypes.CHEST;
			config.id = `chest-${key}`;

			spawner = new Spawner(
				config,
				this.chestLocations[key],
				this.addChest.bind(this),
				this.deleteChest.bind(this)
			);

			this.spawners[spawner.id] = spawner;
		});

		//Create monster spawners
		Object.keys(this.monsterLocations).forEach( key => {

			config.spawnerType = SpawnerTypes.MONSTER;
			config.id = `monster-${key}`;

			spawner = new Spawner(
				config,
				this.monsterLocations[key],
				this.addMonster.bind(this),
				this.deleteMonster.bind(this),
				this.moveMonsters.bind(this)
			);

			this.spawners[spawner.id] = spawner;
		});
	}

	spawnPlayer()
	{
		const player = new PlayerModel( this.playerLocations );
		this.players[player.id] = player;
		this.scene.events.emit( "spawnPlayer", player );
	}

	addChest( chestId, chest )
	{
		this.chests[chestId] = chest;
		this.scene.events.emit( "chestSpawned", chest );
	}

	deleteChest( chestId )
	{
		delete this.chests[chestId];
	}

	addMonster( monsterId, monster )
	{
		this.monsters[monsterId] = monster;
		this.scene.events.emit( "monsterSpawned", monster );
	}

	deleteMonster( monsterId )
	{
		delete this.monsters[monsterId]
	}

	moveMonsters()
	{
		this.scene.events.emit( "monsterMovement", this.monsters )
	}
}