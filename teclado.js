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

let cursorPosPantalla = 0; // posición del cursor en pantallaTexto
let cursorPosPara = 0;     // posición del cursor en paraTexto
let cursorPosSub = 0;     // posición del cursor en subTexto

// Cursor parpadeante
let cursorVisible = true;

function renderPantalla() {
    let texto = buffer;
    let pos = cursorPosPantalla;
    // Solo muestra el cursor si este apartado está activo
    if (apartadoActual === "pantalla") {
        if (cursorVisible) {
            texto = texto.slice(0, pos) + '<span style="visibility:visible">|</span>' + texto.slice(pos);
        } else {
            texto = texto.slice(0, pos) + '<span style="visibility:hidden">|</span>' + texto.slice(pos);
        }
    }
    pantallaTexto.innerHTML = texto;
}

const MAX_PARA = 6;
const MAX_SUB = 25;

// Función para manejar la pulsación de un botón
function handleT9Click(key) {
    if (lastKey === key) {
        pressCount = (pressCount + 1) % t9Map[key].length;
        let letra = t9Map[key][pressCount];
        if (mayusculas && letra.match(/[a-z]/i)) {
            letra = letra.toUpperCase();
        }
        if (apartadoActual === "pantalla" && cursorPosPantalla > 0) {
            buffer = buffer.slice(0, cursorPosPantalla - 1) + letra + buffer.slice(cursorPosPantalla);
            renderPantalla();
        } else if (apartadoActual === "para" && cursorPosPara > 0) {
            bufferPara = bufferPara.slice(0, cursorPosPara - 1) + letra + bufferPara.slice(cursorPosPara);
            renderPara();
        }
        else if (apartadoActual === "sub" && cursorPosSub > 0) {
        bufferSub = bufferSub.slice(0, cursorPosSub - 1) + letra + bufferSub.slice(cursorPosSub);
        renderSub();
        } 
    }
    else {
        pressCount = 0;
        let letra = t9Map[key][pressCount];
        if (mayusculas && letra.match(/[a-z]/i)) {
            letra = letra.toUpperCase();
        }
        
        if (apartadoActual === "pantalla") {
            buffer = buffer.slice(0, cursorPosPantalla) + letra + buffer.slice(cursorPosPantalla);
            cursorPosPantalla++;
            renderPantalla();
        } else if (apartadoActual === "para") {
        if (bufferPara.length < MAX_PARA) {
            bufferPara = bufferPara.slice(0, cursorPosPara) + letra + bufferPara.slice(cursorPosPara);
            cursorPosPara++;
            renderPara();
        }
        } else if (apartadoActual === "sub") {
        if (bufferSub.length < MAX_SUB) {
        bufferSub = bufferSub.slice(0, cursorPosSub) + letra + bufferSub.slice(cursorPosSub);
        cursorPosSub++;
        renderSub();
    }
    }
}

    lastKey = key;
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
        if (apartadoActual === "pantalla" && cursorPosPantalla > 0) {
            buffer = buffer.slice(0, cursorPosPantalla - 1) + buffer.slice(cursorPosPantalla);
            cursorPosPantalla--;
            renderPantalla();
        } else if (apartadoActual === "para" && cursorPosPara > 0) {
            bufferPara = bufferPara.slice(0, cursorPosPara - 1) + bufferPara.slice(cursorPosPara);
            cursorPosPara--;
            renderPara();
        }
        else if (apartadoActual === "sub" && cursorPosSub > 0) {
        bufferSub = bufferSub.slice(0, cursorPosSub - 1) + bufferSub.slice(cursorPosSub);
        cursorPosSub--;
        renderSub();
        }
    });
}

// Inicia el parpadeo del cursor
setInterval(() => {
    cursorVisible = !cursorVisible;
    if (apartadoActual === "pantalla") {
        renderPantalla();
    } else if (apartadoActual === "para") {
        renderPara();
    } else if (apartadoActual === "sub") {
        renderSub();
    }
}, 500);

// Maneja el botón de mayúsculas
const mayusBtn = document.getElementById('b');
if (mayusBtn) {
    mayusBtn.addEventListener('click', () => {
        mayusculas = !mayusculas;
        mayusBtn.classList.toggle('activo', mayusculas); // para cambiar estilo
    });
}

/* ---------------------------------------------------*/
// Maneja el texto "Para:"
const paraTexto = document.getElementById('paraTexto');
let bufferPara = ''; // Texto para "Para:"

function renderPara() {
    let texto = bufferPara;
    let pos = cursorPosPara;
    // Solo muestra el cursor si este apartado está activo
    if (apartadoActual === "para") {
        if (cursorVisible) {
            texto = texto.slice(0, pos) + '<span style="visibility:visible">|</span>' + texto.slice(pos);
        } else {
            texto = texto.slice(0, pos) + '<span style="visibility:hidden">|</span>' + texto.slice(pos);
        }
    }
    paraTexto.innerHTML = texto;
}

/* ---------------------------------------------------*/
// Maneja el texto "Sub:"
const subTexto = document.getElementById('subTexto');
let bufferSub = ''; 

function renderSub() {
    let texto = bufferSub;
    let pos = cursorPosSub;
    if (apartadoActual === "sub") {
        if (cursorVisible) {
            texto = texto.slice(0, pos) + '<span style="visibility:visible">|</span>' + texto.slice(pos);
        } else {
            texto = texto.slice(0, pos) + '<span style="visibility:hidden">|</span>' + texto.slice(pos);
        }
    }
    subTexto.innerHTML = texto;
}


/* ---------------------------------------------------*/
// Mueve el cursor en el apartado actual
function moverCursor(direccion) {
    if (apartadoActual === "pantalla") {
        if (direccion === "izq" && cursorPosPantalla > 0) {
            cursorPosPantalla--;
        } else if (direccion === "der" && cursorPosPantalla < buffer.length) {
            cursorPosPantalla++;
        }
        renderPantalla();

    } else if (apartadoActual === "para") {
        if (direccion === "izq" && cursorPosPara > 0) {
            cursorPosPara--;
        } else if (direccion === "der" && cursorPosPara < bufferPara.length) {
            cursorPosPara++;
        }
        renderPara();

    } else if (apartadoActual === "sub") {
        if (direccion === "izq" && cursorPosSub > 0) {
            cursorPosSub--;
        } else if (direccion === "der" && cursorPosSub < bufferSub.length) {
            cursorPosSub++;
        }
        renderSub();
    }
}

/* ---------------------------------------------------*/

//Maneja la rueda
const upBtn = document.getElementById('up');
const downBtn = document.getElementById('down');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');
const centerBtn = document.getElementById('center');

// Lista de apartados en orden
const apartados = ["para", "sub", "pantalla"];
let apartadoIndex = 2; // empiezas en "pantalla" (índice 2)
let apartadoActual = apartados[apartadoIndex];

function cambiarApartado(nuevoIndex) {
    apartadoIndex = (nuevoIndex + apartados.length) % apartados.length; // ciclo
    apartadoActual = apartados[apartadoIndex];
    renderPantalla();
    renderPara();
    renderSub();
}

if (upBtn) {
    upBtn.addEventListener('click', () => {
        cambiarApartado(apartadoIndex - 1); // subir = índice anterior
    });
}

if (downBtn) {
    downBtn.addEventListener('click', () => {
        cambiarApartado(apartadoIndex + 1); // bajar = índice siguiente
    });
}

if (leftBtn) {
    leftBtn.addEventListener('click', () => {
        moverCursor("izq");
    });
}

if (rightBtn) {
    rightBtn.addEventListener('click', () => {
        moverCursor("der");
    });   
}

