import {
    arrays, puntos
} from "../utils/index.js";
arrays();
puntos();

export default class Eurocopa {
    constructor(participantes, fases = {}) {
        this.participantes = participantes;
        this.fases = fases
        this.octavos(participantes)
    }

    octavos(equipos) {
        equipos = equipos.shuffle() // Mezcla aleatoria de equipos

        const octavos = {
            grupoA: {
                participantes: equipos.slice(0, 8),
                partidos: [],
                resultados: []
            },
            grupoB: {
                participantes: equipos.slice(8, 16),
                partidos: [],
                resultados: []
            }
        }

        octavos.grupoA.partidos = this.teamMatch(octavos.grupoA.participantes)
        octavos.grupoB.partidos = this.teamMatch(octavos.grupoB.participantes)
        this.fases.octavos = Object.assign(octavos)

        this.partido(octavos.grupoA.partidos)
    }

    teamMatch(participantes) {
        let teamMatch = []
        for (let i = 0; participantes.length > i; i += 2) {
            teamMatch = [...teamMatch, participantes.slice(i, i + 2)]
        }
        return teamMatch
    }


    //#####################################################################A partir de aquí hacemos las jugadas#######################################################

    
    partido(partidos){
        for (const partido of partidos) {
            this.juego(partido)
        }
    }

    juego(partido) {
        let resultados = {}
        let ganador = ''
        let puntuacionMaximaActual = -1; //el partido no ha empezado y se establece -1 para que no haya conflicto a la hora de contar puntos


        for (let participante of partido) {
            const goles = puntos()
            resultados = {...resultados, [participante]: goles}

            if (goles > puntuacionMaximaActual) {
                ganador = participante;
                puntuacionMaximaActual = goles;
            } else if (resultados[participante] === puntuacionMaximaActual) {
                this.juego(partido)
            }
        }        
    }

}