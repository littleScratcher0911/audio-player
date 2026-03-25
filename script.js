function actualAudio() {
  const title = document.getElementById("Titel");
  const audioInput = document.getElementById('audioInput');
  const audio = document.getElementById('player');
  const searchButton = document.getElementById('searchButton');
  const file = audioInput.files[0];
  if (!file) return;

  const fileURL = URL.createObjectURL(file);
  audio.src = fileURL;
  audio.play();

  const fileName = file.name.replace(/\.[^/.]+$/, "");
  title.textContent = `Audio Player (${fileName})`;

  searchButton.style.display = 'inline-block';

  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    canvas = document.getElementById("visualizer");
    canvasCtx = canvas.getContext("2d");

    source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    draw();
  }
}

function searchGoogle() {
  const audioInput = document.getElementById('audioInput');
  const file = audioInput.files[0];
  if (!file) return;

  const fileName = file.name.replace(/\.[^/.]+$/, "");
  const query = encodeURIComponent(fileName);
  const url = `https://www.google.com/search?q=${query}`;
  window.open(url, "_self");
}
