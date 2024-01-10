const botonInicio = document.getElementById('inicio');
const botonFin = document.getElementById('fin');
let mediaStream;
let mediaRecorder;

botonInicio.addEventListener('click', async () => {
    mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: { ideal: 60, max: 60 } }
    });

    mediaRecorder = new MediaRecorder(mediaStream, { mimeType: 'video/webm; codecs=vp8, opus' });
    mediaRecorder.start();

    const [video] = mediaStream.getVideoTracks();
    video.addEventListener("ended", () => {
        detenerGrabacion();
    });

    mediaRecorder.addEventListener("dataavailable", (e) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(e.data);
        link.download = "captura.webm";
        link.click();
    });
});

botonFin.addEventListener('click', () => {
    detenerGrabacion();
});

function detenerGrabacion() {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        // Detener todas las pistas de medios para evitar el mensaje persistente
        mediaStream.getTracks().forEach(track => track.stop());
    }
}
