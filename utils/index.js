export const arrays = () =>{
	//Randomizador de arrays
	Array.prototype.shuffle = function()
	{
		var i = this.length;
		while (i)
		{
			var j = Math.floor(Math.random() * i);
			var t = this[--i];
			this[i] = this[j];
			this[j] = t;
		}
		return this;
	}
	
	//Creador de partidos
	Array.prototype.teamMatch = () =>{
		for(let i = 0; i < this.length; i += 2){
			this.slice(i, i+2)
		}
	}
}

//he creado un máximo de 7 goles para que no haya un exceso de puntos
export const puntos = () => {return Math.floor(Math.random() * 8)};
