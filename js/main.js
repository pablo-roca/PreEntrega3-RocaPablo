document.addEventListener('DOMContentLoaded', ()=>{
let formNombre = document.querySelector('#formNombreJugador')
formNombre.addEventListener('submit', function(event) {
    event.preventDefault();
    let nombre = document.querySelector('#nombreJugador').value;

    if (nombre === '') {
        document.querySelector('#error').style.display = 'block';
    }
    else {
        // Guardar el nombre del jugador en localStorage
        localStorage.setItem('nombreJugador', nombre);
        // Redireccionar al juego
        window.location.href = 'juego.html';
    }
})
});

document.addEventListener('DOMContentLoaded', () => { 
    let formNombre = document.querySelector('#formNombreJugador');
    formNombre.addEventListener('submit', function(event) {
        event.preventDefault();
        let nombre = document.querySelector('#nombreJugador').value;

        if (nombre === '') {
            document.querySelector('#error').style.display = 'block';
        } else {
            // Guardar el nombre del jugador en localStorage
            localStorage.setItem('nombreJugador', nombre);
            // Redireccionar al juego
            window.location.href = 'juego.html';
        }
    });
});

document.querySelector('#iniciarJuego').addEventListener('click', async () => {
    let nombreJugador = localStorage.getItem('nombreJugador');

    if (!nombreJugador) {
        // Si no hay nombre, redirigir a la página de ingreso
        window.location.href = 'usuario.html';
    } else {
        document.querySelector('#nombreJugadorDisplay').textContent = `Jugador: ${nombreJugador}`;
    }
    let jugador = new Usuario(nombreJugador);

    // **Obtenemos palabras aleatorias de la API**
    let palabras = [];
    let pistas = [];
    try {
        for (let cont=0; cont < 10; cont++){
            let id = Math.floor(Math.random()* (251) )+1
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await response.json();
            palabras.push(data.name)
            pistas.push(data.types.map(tipo => tipo.type.name))

        }
        
    } catch (error) {
        console.error('Error al obtener palabras:', error);
        palabras = ['fallback', 'javascript', 'html', 'css', 'bootstrap', 'react', 'angular'];
        pistas = ['palabra de prueba', 'Lenguaje de scripting', 'Lenguaje de marcado', 'Hojas de estilo', 'Framework CSS', 'Librería de JS', 'Framework de JS'];
    }

    let palabraActual = '';
    let pistaActual = '';
    let letrasAdivinadas = [];
    let intentos = 6;

    ({ palabraActual, pistaActual, letrasAdivinadas, intentos } = resetearJuego(palabras, pistas, letrasAdivinadas, intentos, palabraActual, pistaActual));

    document.addEventListener('keydown', (evento) => {
        const letra = evento.key.toLowerCase();

        if (letrasAdivinadas.includes(letra) || !/^[a-z]$/.test(letra)) return;
        letrasAdivinadas.push(letra);

        if (palabraActual.includes(letra)) {
            mostrarPalabra(palabraActual, letrasAdivinadas);

            if (verificarGanador(palabraActual, letrasAdivinadas)) {
                mostrarAlerta(`¡Ganaste, ${jugador.nombre}! La palabra era "${palabraActual}".`, 'success');
                jugador.incrementarScore();
                Usuario.guardarRanking(jugador);
                ({ palabraActual, pistaActual, letrasAdivinadas, intentos } = resetearJuego(palabras, pistas, letrasAdivinadas, intentos, palabraActual, pistaActual));
            }
        } else {
            intentos--;
            mostrarAlerta('Letra incorrecta.', 'danger');
            actualizarIntentos(intentos);

            if (intentos === 0) {
                mostrarAlerta(`Perdiste, ${jugador.nombre}. La palabra era "${palabraActual}".`, 'danger');
                ({ palabraActual, pistaActual, letrasAdivinadas, intentos } = resetearJuego(palabras, pistas, letrasAdivinadas, intentos, palabraActual, pistaActual));
            }
        }
    });

    document.querySelector('#verRanking').addEventListener('click', () => {
        const ranking = Usuario.obtenerRanking();
        const rankingLista = document.querySelector('#modalRankingLista');
        rankingLista.innerHTML = '';

        ranking.forEach(jugador => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = `${jugador.nombre}: ${jugador.score} puntos`;
            rankingLista.appendChild(li);
        });
    });

    document.querySelector('#nombreJugadorDisplay').textContent = `Jugador: ${jugador.nombre}`;
});

let cambiarUsuario = document.querySelector('#cambiarUsuario');
cambiarUsuario.addEventListener('click', () => {
    // Redireccionar a la página de inicio (index.html)
    window.location.href = 'index.html';
});