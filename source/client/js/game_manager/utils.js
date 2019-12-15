const SpawnerTypes = {
	MONSTER: "MONSTER",
	CHEST: "CHEST"
};

//Genera un numero random con minimo y maximo inclusivo.
const randomNumber = (min, max) => {
	return Math.floor( Math.random()*max ) + min;
}