class Usuario {
    constructor(nombre) {
        this.nombre = nombre;
        this.score = 0;
    }

    incrementarScore() {
        this.score += 1;
    }

    static guardarRanking(jugador) {
        let ranking = JSON.parse(localStorage.getItem('ranking')) || [];
        ranking.push({ nombre: jugador.nombre, score: jugador.score });
        localStorage.setItem('ranking', JSON.stringify(ranking));
    }

    static obtenerRanking() {
        let ranking = JSON.parse(localStorage.getItem('ranking')) || [];
        // Ordenar de mayor a menor por puntaje
        ranking.sort((a, b) => b.score - a.score);
        return ranking;
    }
}
