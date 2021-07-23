import Eurocopa from "./eurocopa.js"
export default class Fases extends Eurocopa {

    constructor(participantes, fases){
        super(participantes, fases)
        this.octavos(participantes)
    }

    octavos(equipos){
        equipos = equipos.shuffle() // Mezcla aleatoria de equipos
        const octavos = {
                grupoA:{
                    participantes: equipos.slice(0,8)
                },
                grupoB:{
                    participantes: equipos.slice(8,16)
                }
            }
        this.fases = Object.assign(octavos)
    }
    
}
