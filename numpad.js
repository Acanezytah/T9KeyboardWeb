document.addEventListener("DOMContentLoaded", () => {
    const keyMap = {
        '1': 'uno',
        '2': 'dos',
        '3': 'tres',
        '4': 'cuatro',
        '5': 'cinco',
        '6': 'seis',
        '7': 'siete',
        '8': 'ocho',
        '9': 'nueve',
        '0': 'cero',
        '.': 'f', // f es # y espacio
        '-': 'd', // borrar
        '/': 'b', //Mayusculas
        'ArrowUp': 'up',
        'ArrowDown': 'down',
        'ArrowLeft': 'left',
        'ArrowRight': 'right',
    };

    document.addEventListener('keydown', (event) => {
        const tecla = event.key;
        const botonId = keyMap[tecla];
        if (!botonId) return;

        const btn = document.getElementById(botonId);
        if (!btn) return;

        // Animación visual
        btn.classList.add('presionado');
        setTimeout(() => btn.classList.remove('presionado'), 150);

        if (botonId === 'd') {
            // Borrar
            if (btn.click) btn.click();
        } 
        else if (botonId === 'b') {
            // Mayusculas
            if (btn.click) btn.click();
        }
        if (['up', 'down', 'left', 'right'].includes(botonId)) {
            // Navegación
            if (btn.click) btn.click();
        }
        else {
            // Escribe letra usando handleT9Click 
            if (typeof handleT9Click === "function") {
                handleT9Click(botonId);
            }

            // Reproduce sonido usando la función global de sonido.js
            if (btn.dataset.freq) {
                const freq = parseFloat(btn.dataset.freq);
                if (!isNaN(freq) && typeof window.reproducirNota === "function") {
                    window.reproducirNota(freq);
                }
            }
        }

        event.preventDefault();
    });
});









