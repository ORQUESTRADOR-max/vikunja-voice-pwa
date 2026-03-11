const recordBtn = document.getElementById('recordBtn');
const statusEl = document.getElementById('status');

let mediaRecorder;
let audioChunks = [];

// WEBHOOK DO N8N (Coloquei a base do seu dominio, você pode ajustar o path no n8n)
const N8N_WEBHOOK_URL = 'https://n8n.lkaoyj.easypanel.host/webhook/voice-to-vikunja';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(console.error);
}

async function setupAudio() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        
        mediaRecorder.ondataavailable = e => {
            if (e.data.size > 0) audioChunks.push(e.data);
        };

        mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            audioChunks = [];
            await sendAudioToN8n(audioBlob);
        };
        statusEl.textContent = 'Pronto para gravar';
    } catch (err) {
        statusEl.textContent = 'Erro: Permita o uso do microfone nas configurações do site.';
        console.error(err);
    }
}

async function sendAudioToN8n(blob) {
    statusEl.textContent = 'Enviando para a IA... ⏳';
    recordBtn.classList.remove('bg-red-500');
    recordBtn.classList.add('bg-gray-600');
    recordBtn.disabled = true;

    const formData = new FormData();
    formData.append('data', blob, 'recording.webm');

    try {
        const response = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            statusEl.textContent = 'Tarefas extraídas e criadas! 🎉';
            setTimeout(() => { statusEl.textContent = 'Pronto para gravar'; }, 4000);
        } else {
            statusEl.textContent = 'Erro ao enviar para o n8n.';
        }
    } catch (err) {
        statusEl.textContent = 'Falha de conexão com o n8n.';
        console.error(err);
    } finally {
        recordBtn.classList.remove('bg-gray-600');
        recordBtn.classList.add('bg-blue-600');
        recordBtn.disabled = false;
    }
}

// Touch/Mouse Events
const startRecording = (e) => {
    e.preventDefault();
    if (!mediaRecorder || mediaRecorder.state === 'recording') return;
    audioChunks = [];
    mediaRecorder.start();
    recordBtn.classList.replace('bg-blue-600', 'bg-red-500');
    recordBtn.classList.add('recording');
    statusEl.textContent = 'Gravando... Fale suas tarefas 🎙️';
};

const stopRecording = (e) => {
    e.preventDefault();
    if (!mediaRecorder || mediaRecorder.state === 'inactive') return;
    mediaRecorder.stop();
    recordBtn.classList.remove('recording');
};

recordBtn.addEventListener('mousedown', startRecording);
recordBtn.addEventListener('mouseup', stopRecording);
recordBtn.addEventListener('mouseleave', stopRecording);
recordBtn.addEventListener('touchstart', startRecording);
recordBtn.addEventListener('touchend', stopRecording);

setupAudio();
