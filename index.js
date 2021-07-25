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
console.log('---------------- Comienza el torneo ----------------')
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
console.log('se clasifican:')
console.log('--------------')
console.log(`${participantesEuro.fases.octavos.clasificados}`)






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
console.log('se clasifican:')
console.log('--------------')
console.log(`${participantesEuro.fases.cuartos.clasificados}`)



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
console.log('Pasan a la final:')
console.log('-----------------')

console.log(`${participantesEuro.fases.semifinal.clasificados}`)


console.log('')
console.log('                  Playoffs - final                  ')
console.log('====================================================')
console.log('')

console.log(participantesEuro.fases.final.resultados)


console.log('')
console.log('####################################################')
console.log('--------------------- Ganadores --------------------')
console.log('####################################################')
console.log('')

console.log(`El primer puesto es para: ${participantesEuro.fases.final.ganador}`)
console.log(`El segundo puesto es para: ${participantesEuro.fases.final.segundo}`)
console.log(`El tercer puesto es para: ${participantesEuro.fases.semifinal.tercero}`)

if(participantesEuro.fases.semifinal.cuarto !== undefined){
    console.log(`El cuarto puesto es para: ${participantesEuro.fases.semifinal.cuarto}`)
}
