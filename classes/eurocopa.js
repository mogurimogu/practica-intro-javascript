import {
    arrays,
    puntos
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

        this.cuartos(this.ganadores(octavos.grupoA.resultados), this.ganadores(octavos.grupoB.resultados))

    }

    cuartos(grupoA, grupoB) {
        const cuartos = {
            grupoA: {
                participantes: grupoA
            },
            grupoB: {
                participantes: grupoB
            }
        }

        cuartos.grupoA.partidos = this.teamMatch(cuartos.grupoA.participantes)
        cuartos.grupoB.partidos = this.teamMatch(cuartos.grupoB.participantes)
        cuartos.grupoA.resultados = this.partido(cuartos.grupoA.partidos)
        cuartos.grupoB.resultados = this.partido(cuartos.grupoB.partidos)

        this.fases.cuartos = Object.assign(cuartos)

        this.semifinal(this.ganadores(cuartos.grupoA.resultados), this.ganadores(cuartos.grupoB.resultados))
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

        this.final(this.ganadores(semifinal.grupoA.resultados), this.ganadores(semifinal.grupoB.resultados))

        const semifinalistas = (resultadosA, resultadosB) => {
            const resultados = [...resultadosA, ...resultadosB]

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

        if (Object.values(final.resultados[0])[0] > Object.values(final.resultados[0])[1]) {
            final.segundo = Object.keys(final.resultados[0])[1]
        } else {
            final.segundo = Object.keys(final.resultados[0])[0]
        }

    }

    teamMatch(participantes) {
        let teamMatch = []
        for (let i = 0; participantes.length > i; i += 2) {
            teamMatch = [...teamMatch, participantes.slice(i, i + 2)]
        }
        return teamMatch
    }


    //####################################################### A partir de aquí hacemos las jugadas #######################################################


    partido(partidos) {
        let resultados = []
        for (const partido of partidos) {
            resultados = [...resultados, this.juego(partido)]
        }
        return resultados
    }

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