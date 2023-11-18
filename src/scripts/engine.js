const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeRange = document.querySelector("#vol");
const keysCheck = document.querySelector(".keys-check input");

//Array com as teclas existentes ["a","w", "s", ...]
const mappedKeys = [...pianoKeys].map((item) => item.dataset.key);
//instanciando o audio
let audio = new Audio();

//função para tocar de forma dinâmica o som das teclas
function playTune(key) {
  audio.src = `./src/tunes/${key}.wav`;

  audio.play();

  const clickedKey = document.querySelector(`[data-key=${key}]`);
  clickedKey.classList.add("active");

  setTimeout(() => clickedKey.classList.remove("active"), 200);
}

//função para aumentar ou diminuir o volume
function handleVolume(e) {
  audio.volume = e.target.value;
}

//função para mostrar ou esconder as teclas 
function showHideKeys() {
  pianoKeys.forEach((key) => {
    key.classList.toggle("hide");
  });
}

pianoKeys.forEach((key) => {
  const k = key.dataset.key;
  key.addEventListener("click", () => {
    if (mappedKeys.includes(k)) {
      playTune(k);
    }
  });
});

document.addEventListener("keydown", (e) => {
  if (!mappedKeys.includes(e.key)) {
    return;
  }
  playTune(e.key);
});

volumeRange.addEventListener("input", handleVolume);
keysCheck.addEventListener("click", showHideKeys);
