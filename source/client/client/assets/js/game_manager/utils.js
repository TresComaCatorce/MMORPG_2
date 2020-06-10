const SpawnerTypes = {
	MONSTER: "MONSTER",
	CHEST: "CHEST"
};

const Directions = {
	RIGHT: "RIGHT",
	LEFT: "LEFT",
	UP: "UP",
	DOWN: "DOWN"
}

//Genera un numero random con minimo y maximo inclusivo.
const randomNumber = (min, max) => {
	return Math.floor( Math.random()*max ) + min;
}