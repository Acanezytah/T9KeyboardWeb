document.addEventListener("DOMContentLoaded", () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // función global para poder llamarla desde numpad.js
    window.reproducirNota = (frecuencia) => {
        if (audioCtx.state === "suspended") {
            audioCtx.resume();
        }

        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        osc.type = "sine"; 
        osc.frequency.value = frecuencia;

        gainNode.gain.value = 0.1; // volumen bajo
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.15); // dura 150ms
    };

    // Evento para clicks de botones
    const botones = document.querySelectorAll("#teclado button");
    botones.forEach(btn => {
        btn.addEventListener("click", () => {
            const freq = parseFloat(btn.dataset.freq);
            if (!isNaN(freq)) {
                window.reproducirNota(freq);
            }
        });
    });
});


