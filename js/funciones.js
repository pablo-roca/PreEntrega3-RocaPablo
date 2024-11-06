function resetearJuego(palabras, pistas, letrasAdivinadas, intentos, palabraActual, pistaActual) {
    const indiceAleatorio = Math.floor(Math.random() * palabras.length);
    palabraActual = palabras[indiceAleatorio];
    pistaActual = pistas[indiceAleatorio];
    letrasAdivinadas = [];
    intentos = 6;

    mostrarPalabra(palabraActual, letrasAdivinadas);
    document.querySelector('#pista').textContent = pistaActual;
    actualizarIntentos(intentos);

    return { palabraActual, pistaActual, letrasAdivinadas, intentos };
}

function mostrarPalabra(palabra, letrasAdivinadas) {
    let display = palabra.split('').map(letra => letrasAdivinadas.includes(letra) ? letra : '_').join(' ');
    document.querySelector('#palabra').textContent = display;
}

function verificarGanador(palabra, letrasAdivinadas) {
    return palabra.split('').every(letra => letrasAdivinadas.includes(letra));
}


function actualizarIntentos(intentos) {
    document.querySelector('#intentos').textContent = `Intentos restantes: ${intentos}`;
}

function mostrarAlerta(mensaje, tipo) {
    const alerta = document.querySelector('#alerta');
    alerta.textContent = mensaje;
    alerta.className = `alert alert-${tipo}`;
    alerta.style.display = 'block';
    setTimeout(() => alerta.style.display = 'none', 2000);
}
