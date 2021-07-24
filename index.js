import {
    arrays,
    puntos
} from "./utils/index.js";
import Eurocopa from "./classes/eurocopa.js";
puntos();
arrays();

const euroTeams = ['España', 'Francia', 'Portugal', 'Alemania', 'Italia', 'Inglaterra', 'Finlandia', 'Grecia', 'Islandia', 'Noruega', 'Rusia', 'Suiza', 'Suecia', 'Bélgica', 'Dinamarca', 'Croacia', 'Irlanda', 'Lituania', 'Escocia', 'Serbia', 'Luxemburgo', 'Austria', 'Andorra', 'Malta'];

const participantesEuro = new Eurocopa(euroTeams.shuffle().slice(0, 16));


console.log('####################################################')
console.log('--------------- Comienza la Eurocopa ---------------')
console.log('####################################################')
console.log('')



console.log('                 Playoffs - Octavos                 ')
console.log('====================================================')
console.log('')
console.log('---------------------- Grupo A ---------------------')

console.log(participantesEuro.fases.octavos.grupoA.resultados)

console.log('')
console.log('---------------------- Grupo B ---------------------')

console.log(participantesEuro.fases.octavos.grupoB.resultados)




console.log('')
console.log('                 Playoffs - Cuartos                 ')
console.log('====================================================')
console.log('')
console.log('---------------------- Grupo A ---------------------')

console.log(participantesEuro.fases.cuartos.grupoA.resultados)

console.log('')
console.log('---------------------- Grupo B ---------------------')

console.log(participantesEuro.fases.cuartos.grupoB.resultados)




console.log('')
console.log('                Playoffs - Semifinal                ')
console.log('====================================================')
console.log('')
console.log('---------------------- Grupo A ---------------------')

console.log(participantesEuro.fases.semifinal.grupoA.resultados)

console.log('')
console.log('---------------------- Grupo B ---------------------')

console.log(participantesEuro.fases.semifinal.grupoB.resultados)





console.log('')
console.log('                  Playoffs - final                  ')
console.log('====================================================')
console.log('')
console.log('---------------------- Grupo A ---------------------')

console.log(participantesEuro.fases.final.resultados)


console.log('')
console.log('####################################################')
console.log('--------------------- Ganadores --------------------')
console.log('####################################################')
console.log('')

console.log(`El primer puesto es para: ${participantesEuro.fases.final.ganador}`)
