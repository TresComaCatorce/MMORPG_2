export const SpawnerTypes = {
	MONSTER: "MONSTER",
	CHEST: "CHEST"
};

export const Directions = {
	RIGHT: "RIGHT",
	LEFT: "LEFT",
	UP: "UP",
	DOWN: "DOWN"
}

//Genera un numero random con minimo y maximo inclusivo.
export const randomNumber = (min, max) => {
	return Math.floor( Math.random()*max ) + min;
}