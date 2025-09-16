// Selecciona la pantalla
const pantallaTexto = document.getElementById('pantallaTexto');

// Mapea los botones T9 a sus letras
const t9Map = {
    uno: ['1', '.', ',', '?', '!'],
    dos: ['a', 'b', 'c', '2'],
    tres: ['d', 'e', 'f', '3'],
    cuatro: ['g', 'h', 'i', '4'],
    cinco: ['j', 'k', 'l', '5'],
    seis: ['m', 'n', 'o', '6'],
    siete: ['p', 'q', 'r', 's', '7'],
    ocho: ['t', 'u', 'v', '8'],
    nueve: ['w', 'x', 'y', 'z', '9'],
    cero: ['0'],
    f: ['#',' ']
};

// Estado para saber qué letra mostrar
let buffer = '';
let lastKey = '';
let pressCount = 0;
let timeoutId = null;

let mayusculas = false;

// Cursor parpadeante
let cursorVisible = true;
function renderPantalla() {
    if (cursorVisible) {
        pantallaTexto.innerHTML = buffer + '<span style="visibility:visible">|</span>';
    } else {
        pantallaTexto.innerHTML = buffer + '<span style="visibility:hidden">|</span>';
    }
}


// Función para manejar la pulsación de un botón
function handleT9Click(key) {
    if (lastKey === key) {
        pressCount = (pressCount + 1) % t9Map[key].length;
        console.log(pressCount);
        buffer = buffer.slice(0, -1); // Borra la última letra
    } else {
        pressCount = 0;
    }

    let letra = t9Map[key][pressCount];
    if (mayusculas && letra.match(/[a-z]/i)) {
        letra = letra.toUpperCase();
    }

    buffer += letra;
    renderPantalla();
    lastKey = key;

    // Reinicia el ciclo si no se presiona nada en 1 segundo
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        lastKey = '';
        pressCount = 0;
    }, 1000);
}


/* ---------------------------------------------------*/

// Asigna eventos a los botones
Object.keys(t9Map).forEach(key => {
    const btn = document.getElementById(key);
    if (btn) {
        btn.addEventListener('click', () => handleT9Click(key));
    }
});

// Maneja el botón de borrar
const borrarBtn = document.getElementById('d');
if (borrarBtn) {
    borrarBtn.addEventListener('click', () => {
        buffer = buffer.slice(0, -1); // Borra el último carácter
        pantallaTexto.textContent = buffer;
    });
}

// Inicia el parpadeo del cursor
setInterval(() => {
    cursorVisible = !cursorVisible;
    renderPantalla();
}, 500);

// Maneja el botón de mayúsculas
const mayusBtn = document.getElementById('b');
if (mayusBtn) {
    mayusBtn.addEventListener('click', () => {
        mayusculas = !mayusculas;
        mayusBtn.classList.toggle('activo', mayusculas); // para cambiar estilo
    });
}