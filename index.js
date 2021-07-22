import {
    arrays,
    puntos
} from "./utils/index.js";
puntos();
arrays();

const euroTeams = ['España', 'Francia', 'Portugal', 'Alemania', 'Italia', 'Inglaterra', 'Finlandia', 'Grecia', 'Islandia', 'Noruega', 'Rusia', 'Suiza', 'Suecia', 'Bélgica', 'Dinamarca', 'Croacia', 'Irlanda', 'Lituania', 'Escocia', 'Serbia', 'Luxemburgo', 'Austria', 'Andorra', 'Malta'];

const playoffTeams = euroTeams.shuffle().slice(0, 16);

const octavosA = playoffTeams.slice(0, 8);
const octavosB = playoffTeams.slice(8, 16);

//Los 8 ganadores de los octavos irán aquí
const cuartosA = [];
const cuartosB = [];

//Los 4 ganadores de los cuartos irán aquí
const semifinalA = [];
const semifinalB = [];


console.log(`
##########################################
#########  COMIENZA LA EUROCOPA  #########
##########################################

En el GRUPO A juega: ${octavosA}
En el GRUPO B juega: ${octavosB}

`)

const partido1 = ['España', 'Portugal']

//TODO refactorizar para crear una clase

//funcion que permite jugar una partida
function partido(equipos){

    const partido = {
        ganador : '',
        goleada : -1 //al setearlo a -1 hace que el primer partido no entre en la condición de volver a jugar
    }

    const juego = (jugadores) =>{
        for(let jugador of jugadores){

            partido[jugador] = puntos()
    
            if(partido[jugador] > partido.goleada){
                partido.ganador = jugador;
                partido.goleada = partido[jugador];
            }else if(partido[jugador] === partido.goleada){
                juego(jugadores)
            }
        }
    }

    juego(equipos);

    //TODO despues de estose va al array de la siguiente ronda

    console.log(`${equipos[0]} ${partido[equipos[0]]} - ${equipos[1]} ${partido[equipos[1]]}
    Gana ${partido.ganador}.
    `);

}

partido(partido1)