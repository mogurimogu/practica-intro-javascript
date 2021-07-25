import {
    arrays,
    puntos
} from "../utils/index.js";
arrays();
puntos();

// Aquí comienza la eurocopa
export default class Eurocopa {
    constructor(participantes, fases = {}) {
        this.participantes = participantes;
        this.fases = fases
        this.octavos(participantes)
    }

//####################################################### Aquí se juega cada fase #######################################################

    octavos(equipos) {
        let ganadores = []

        const octavos = {
            grupoA: {
                participantes: equipos.slice(0, 8),
            },
            grupoB: {
                participantes: equipos.slice(8, 16),
            }
        }

        octavos.grupoA.partidos = this.teamMatch(octavos.grupoA.participantes)
        octavos.grupoB.partidos = this.teamMatch(octavos.grupoB.participantes)
        octavos.grupoA.resultados = this.partido(octavos.grupoA.partidos)
        octavos.grupoB.resultados = this.partido(octavos.grupoB.partidos)

        this.fases.octavos = Object.assign(octavos)

        let clasificadosA = this.ganadores(octavos.grupoA.resultados)
        let clasificadosB = this.ganadores(octavos.grupoB.resultados)
        octavos.clasificados = [...clasificadosA, ...clasificadosB]
        this.cuartos(clasificadosA, clasificadosB)

    }

    cuartos(grupoA, grupoB) {
        const cuartos = {
            grupoA: {
                participantes: grupoA
            },
            grupoB: {
                participantes: grupoB
            },
            clasificados:[]
        }

        cuartos.grupoA.partidos = this.teamMatch(cuartos.grupoA.participantes)
        cuartos.grupoB.partidos = this.teamMatch(cuartos.grupoB.participantes)
        cuartos.grupoA.resultados = this.partido(cuartos.grupoA.partidos)
        cuartos.grupoB.resultados = this.partido(cuartos.grupoB.partidos)

        this.fases.cuartos = Object.assign(cuartos)
        let clasificadosA = this.ganadores(cuartos.grupoA.resultados)
        let clasificadosB = this.ganadores(cuartos.grupoB.resultados)
        cuartos.clasificados = [...clasificadosA, ...clasificadosB]
        this.semifinal(clasificadosA, clasificadosB)
    }

    semifinal(grupoA, grupoB) {
        const semifinal = {
            grupoA: {
                participantes: grupoA
            },
            grupoB: {
                participantes: grupoB
            },
        }

        semifinal.grupoA.partidos = this.teamMatch(semifinal.grupoA.participantes)
        semifinal.grupoB.partidos = this.teamMatch(semifinal.grupoB.participantes)
        semifinal.grupoA.resultados = this.partido(semifinal.grupoA.partidos)
        semifinal.grupoB.resultados = this.partido(semifinal.grupoB.partidos)

        this.fases.semifinal = Object.assign(semifinal)


        let clasificadosA = this.ganadores(semifinal.grupoA.resultados)
        let clasificadosB = this.ganadores(semifinal.grupoB.resultados)
        semifinal.clasificados = [...clasificadosA, ...clasificadosB]
        this.final(clasificadosA, clasificadosB)

        // funcion para decidir el tercer y cuarto puesto
        const semifinalistas = (resultadosA, resultadosB) => {
            const resultados = [...resultadosA, ...resultadosB]

            // Selecciona y añade a un array aquellos que no han pasado a la final con sus respectivos resultados
            resultados.forEach(puntuacion => {
                const equipoA = Object.keys(puntuacion)[0]
                const equipoB = Object.keys(puntuacion)[1]
                const puntosEquipoA = Object.values(puntuacion)[0]
                const puntosEquipoB = Object.values(puntuacion)[1]

                if (puntosEquipoA > puntosEquipoB) {
                    semifinal.semifinalistas = {
                        ...semifinal.semifinalistas,
                        [equipoB]: puntosEquipoB
                    }
                } else {
                    semifinal.semifinalistas = {
                        ...semifinal.semifinalistas,
                        [equipoA]: puntosEquipoA
                    }
                }
            });

            const semifinalistaA = Object.keys(semifinal.semifinalistas)[0]
            const semifinalistaB = Object.keys(semifinal.semifinalistas)[1]
            const puntosSemifinalistaA = Object.values(semifinal.semifinalistas)[0]
            const puntosSemifinalistaB = Object.values(semifinal.semifinalistas)[1]

            if(puntosSemifinalistaA !== puntosSemifinalistaB){
                if(puntosSemifinalistaA > puntosSemifinalistaB){
                    semifinal.tercero = semifinalistaA
                }else{
                    semifinal.cuarto = semifinalistaA
                }
    
                if(puntosSemifinalistaA < puntosSemifinalistaB){
                    semifinal.tercero = semifinalistaB
                }else{
                    semifinal.cuarto = semifinalistaB
                }    
            }else{
                semifinal.tercero = `${semifinalistaA} y ${semifinalistaB}`
            }


        }

        semifinalistas(semifinal.grupoA.resultados, semifinal.grupoB.resultados)
    }


    final(equipoA, equipoB) {
        const final = {
            participantes: [equipoA, equipoB],
            resultados: []
        }

        final.partidos = this.teamMatch(final.participantes)
        final.resultados = this.partido(final.partidos)

        this.fases.final = Object.assign(final)

        const ganador = this.ganadores(final.resultados)

        final.ganador = ganador

        //así decidimos quien es el semifinalista
        if (Object.values(final.resultados[0])[0] > Object.values(final.resultados[0])[1]) {
            final.segundo = Object.keys(final.resultados[0])[1]
        } else {
            final.segundo = Object.keys(final.resultados[0])[0]
        }

    }

//####################################################### aquí es donde se aplican las funciones #######################################################
    
    //Empareja a los equipos para luego hacer los partidos
    teamMatch(participantes) {
        let teamMatch = []
        for (let i = 0; participantes.length > i; i += 2) {
            teamMatch = [...teamMatch, participantes.slice(i, i + 2)]
        }
        return teamMatch
    }

    //Devuelve cada valor de cada partido
    partido(partidos) {
        let resultados = []
        for (const partido of partidos) {
            resultados = [...resultados, this.juego(partido)]
        }
        return resultados
    }

    // Ejecucion de un partido
    juego(partido) {
        let resultados = {}

        function jugar(partido) {
            //añade los puntos por equipo
            for (let participante of partido) {
                const goles = puntos()
                resultados[participante] = goles
            }
            // condicion para volver a jugar el partido en caso de empate
            if (Object.values(resultados)[0] === Object.values(resultados)[1]) {
                jugar(partido)
            }
        }

        jugar(partido) //inicializa la funcion que juega el partido

        return resultados;
    }

    //Esto es lo que decide quién pasa a la siguiente ronda
    ganadores(resultados) {
        let ganadores = []

        for (const resultado of resultados) {
            if (Object.values(resultado)[0] > Object.values(resultado)[1]) {
                ganadores = [...ganadores, Object.keys(resultado)[0]]
            } else {
                ganadores = [...ganadores, Object.keys(resultado)[1]]
            }
        }
        return ganadores
    }
}