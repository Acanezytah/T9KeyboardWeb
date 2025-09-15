// Selecciona la pantalla
const pantalla = document.getElementById('pantalla');

// Mapea los botones T9 a sus letras
const t9Map = {
    uno: ['1'],
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

// Función para manejar la pulsación de un botón
function handleT9Click(key) {
    if (lastKey === key) {
        pressCount = (pressCount + 1) % t9Map[key].length;
        console.log(pressCount);
        buffer = buffer.slice(0, -1); // Borra la última letra
    } else {
        pressCount = 0;
    }
    buffer += t9Map[key][pressCount];
    pantallaTexto.textContent = buffer;
    lastKey = key;

    // Reinicia el ciclo si no se presiona nada en 1 segundo
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        lastKey = '';
        pressCount = 0;
    }, 1000);
}

// Asigna eventos a los botones
Object.keys(t9Map).forEach(key => {
    const btn = document.getElementById(key);
    if (btn) {
        btn.addEventListener('click', () => handleT9Click(key));
    }
});