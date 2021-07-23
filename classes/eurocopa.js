import {
    arrays
} from "../utils/index.js";
arrays();

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
                teamMatch: this.teamMatch(this.participantes)
            },
            grupoB: {
                participantes: equipos.slice(8, 16),
                teamMatch: this.teamMatch(this.participantes)
            }
        }
        this.fases.octavos = Object.assign(octavos)
    }

    teamMatch(participantes){
        let teamMatch = []
        for(let i = 0; participantes.length > i; i+=2){
            teamMatch = [...teamMatch, participantes.slice(i, i+2)]
        }
        return teamMatch
    }

}







// const lerucopa = {
//     participantes: [],
//     fases: {
//         octavosA: {
//             participantes: [],
//             partidos: [ {españa: 1, portugal: 0}, {francia: 2, alemania: 1} ]
//         }
//     }
// }