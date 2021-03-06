import { v4 as uuidv4 } from 'uuid';

export default class PlayerModel
{
	constructor( spawnLocations )
	{
		this.id = `player-${uuidv4()}`;
		this.health = 10;
		this.maxHealth = 10;
		this.gold = 0;
		this.spawnLocations = spawnLocations;

		const location = this.spawnLocations[Math.floor(Math.random()*this.spawnLocations.length)];
		[ this.x, this.y ] = location;
	}

	updateGold( gold )
	{
		this.gold += gold;
	}

	updateHealth( health )
	{
		this.health += health;
	}
}