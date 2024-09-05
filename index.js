// Example sentences
const wordsArray = [
    "abacus", "butterfly", "cactus", "dolphin", "eagle",
    "fountain", "grape", "horizon", "iguana", "jigsaw",
    "koala", "lamp", "mystery", "notebook", "octopus",
    "puzzle", "quasar", "robot", "sunflower", "telescope",
    "umbrella", "vortex", "whistle", "xylophone", "yacht",
    "zebra", "astronaut", "breeze", "cloud", "dragonfly",
    "enigma", "flame", "giraffe", "hammock", "island",
    "jellyfish", "kaleidoscope", "lantern", "meadow", "ninja",
    "orchestra", "penguin", "quilt", "rainbow", "sapphire",
    "tiger", "unicorn", "village", "waterfall", "xenon",
    "yarn", "zeppelin", "adventure", "blueprint", "caravan"
];

const textDisplay = document.querySelector('.text-display p');
const userInputField = document.querySelector('.input-wrapper input')
const btnRestart = document.querySelector('#btn-restart');


const spanTotalClicks = document.querySelector('.totalClicks span');
const spanAvgCps = document.querySelector('.averageCps span');
const spanTotalWords = document.querySelector('.totalWords span');
const spanAvgWps = document.querySelector('.averageWps span');
const spanMistakes = document.querySelector('.mistakes span');

let totalClicks = 0;

let clicksPerSecond = 0;
let averageCps;
let wordsPerSecond = 0;
let averageWps;

let charIndex = 0;
let mistakes = 0;
let isTyping = false;

let timer;
let maxTime;
let timeLeft;


function loadText () {
    textDisplay.innerHTML = '';

    for (let i = 0; i < 100; i++) {
        let randomIndex = Math.floor(Math.random() * wordsArray.length);
        wordsArray[randomIndex].split('').forEach(char => {

            let span = `<span>${char}</span>`;
            textDisplay.innerHTML += span;
    
        })

        let emptySpan = `<span> </span>`;
        textDisplay.innerHTML += emptySpan;
    }

    textDisplay.addEventListener('click', () => userInputField.focus())
    document.addEventListener('keydown', () => userInputField.focus())
}


function checkUserInput () {

    let spanArray = textDisplay.querySelectorAll('span');
    let userInput = userInputField.value.split('');
    let correct = true;

    spanArray.forEach((span, index) => {
        const char = userInput[index];

        if (char === span.innerText) {
            span.classList.remove('incorrectInput');
            span.classList.add('correctInput');
        } else {
            span.classList.remove('correctInput');
            span.classList.add('incorrectInput');
            correct = false;
        }

    })

    // if (correct && userInput.length === spanArray.length) {
    //     loadText()
    // }


}

function startGame () {

    // if (!isTyping) {
    //     timer = setInterval(timeLeft--, 1000);
    //     isTyping = true;
    // }

    let chars = textDisplay.querySelectorAll('span');
    let typedChar = userInputField.value.split('')[charIndex];

    if (chars[charIndex].innerHTML == typedChar) {
        chars[charIndex].classList.add('correctInput');
    } else {
        chars[charIndex].classList.add('incorrectInput');
    }

    charIndex++

}



loadText()
userInputField.addEventListener('input', () => startGame())
userInputField.addEventListener('input', () => checkUserInput())