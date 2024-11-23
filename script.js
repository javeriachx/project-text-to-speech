const textarea = document.querySelector("textarea");
const btn1 = document.querySelector(".btn1");
const voiceSelect = document.getElementById("voiceSelect");
const trySampleButton = document.querySelector(".video-button");  
const textToSpeechContainer = document.querySelector(".container"); 

let synth = window.speechSynthesis;
let voices = [];


const loadVoices = () => {
  voices = synth.getVoices();
 
  voiceSelect.innerHTML = voices
    .map(
      (voice, index) =>
        `<option value="${index}">${voice.name} (${voice.lang}) ${
          voice.default ? "(Default)" : ""
        }</option>`
    )
    .join('');
};


synth.onvoiceschanged = loadVoices;


const textToSpeech = () => {
  const text = textarea.value.trim();

  if (!text) {
    alert("Please enter some text."); 
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);


  const selectedVoiceIndex = voiceSelect.value;
  const selectedVoice = voices[selectedVoiceIndex];
  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

 
  utterance.pitch = 1; 
  utterance.rate = 1; 

  synth.speak(utterance); 
};


btn1.addEventListener("click", textToSpeech);

trySampleButton.addEventListener("click", () => {
  textToSpeechContainer.scrollIntoView({ behavior: "smooth" });
});






window.addEventListener("load", () => {
  loadVoices();
});




