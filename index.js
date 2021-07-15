const goles = () => {return Math.floor(Math.random() * 10)};

//Mezcla Array
const shuffledArr = array => array.map(a => ({ sort: Math.random(), value: a })).sort((a, b) => a.sort - b.sort).map(a => a.value);

// console.log('Comienza el torneo')

const euroTeams = ['España', 'Francia', 'Portugal', 'Alemania', 'Italia', 'Inglaterra', 'Finlandia', 'Grecia', 'Islandia', 'Noruega', 'Rusia', 'Suiza', 'Suecia', 'Bélgica', 'Dinamarca', 'Croacia', 'Irlanda', 'Lituania', 'Escocia', 'Serbia', 'Luxemburgo', 'Austria', 'Andorra', 'Malta'];

const playoffTeams = ['España', 'Francia', 'Portugal', 'Alemania', 'Italia', 'Inglaterra', 'Finlandia', 'Grecia', 'Islandia', 'Noruega', 'Rusia', 'Suiza', 'Suecia', 'Bélgica', 'Dinamarca', 'Croacia'];

let randomPlayoffTeams = shuffledArr(playoffTeams)


//TODO Cada grupo tenemos que volver a randomizarlo para seleccionar los 4 equipos del octavo
const octavosA = [randomPlayoffTeams.slice(0, 8)];
const octavosB = [randomPlayoffTeams.slice(8, 16)];

//Los 8 ganadores de los octavos irán aquí
const cuartosA = [];
const cuartosB = [];

//Los 4 ganadores de los cuartos irán aquí
const semifinalA = [];
const semifinalB = [];

// console.log(`Los clasificados para participar son:`)
// playoffTeams.forEach(team => {
    // console.log(team)
// });


//TODO Vamos a hacer una clase constructora para estadisticas de equipo estableciendo los valores iniciales a 0
//TODO Tenemos que randomizar el array de equipos para dividirlo en 2 grupos de 8
//Crear un array con los clasificados para los cuartos
//TODO Por cada grupo de 2 hay que simular una partida con valores random
//Crear un array con los clasificados para la semifinal



console.log(`Estas son las selecciones del grupo Octavos A: ${octavosA}`);
console.log(`Estas son las selecciones del grupo Octavos B: ${octavosB}`);
// console.log('en el grupo A ' + octavosA)
// console.log('en el grupo B ' + octavosB)