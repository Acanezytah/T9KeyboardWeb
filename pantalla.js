function actualizarHora() {
    const horaElem = document.getElementById('hora');
    if (!horaElem) return;
    const ahora = new Date();
    let horas = ahora.getHours();
    let minutos = ahora.getMinutes();
    let ampm = horas >= 12 ? 'PM' : 'AM';
    horas = horas % 12 || 12; // Convierte a formato 12 horas
    minutos = minutos < 10 ? '0' + minutos : minutos;
    horaElem.textContent = `${horas}:${minutos} ${ampm}`;
}

// Actualiza la hora cada segundo
setInterval(actualizarHora, 1000);
// Muestra la hora al cargar la página
actualizarHora();