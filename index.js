// Example words
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

//DOM elements
const textDisplay = document.querySelector('.text-display p');
const timerDisplayHeader = document.querySelector('#timer-display-header');
const timerDisplay = document.querySelector('#timer-display');
const userInputField = document.querySelector('.input-wrapper input');

const btnRestart = document.querySelector('#btn-restart');

// Result DOM elements
const spanTotalClicks = document.querySelector('.totalClicks span');
const spanCps = document.querySelector('.averageCps span');
const spanTotalWords = document.querySelector('.totalWords span');
const spanAvgWps = document.querySelector('.averageWps span');
const spanMistakes = document.querySelector('.mistakes span');

// Result variables 
let totalClicks = 0;
let clicksPerSecond;
let totalWords = 0;
let averageWps;
let mistakes = 0;

spanTotalWords.textContent = totalWords;
spanAvgWps.textContent = averageWps;
spanMistakes.textContent = mistakes;

// Falsy variables
let charIndex = 0;
let isTyping = false;
let timerRunning = false;

// Timer variables
let timer;
let maxTime = 30;
let timeLeftMs = maxTime * 1000;

// Functions timer
function startTimer () {
    timer = setInterval(displayTimer, 10);
    timerRunning = true;
}

function stopTimer () {
    clearInterval(timer);
    timeLeftMs = 0;
}

function displayTimer () {
    timeLeftMs -= 10;

    if (timeLeftMs <= 0) {
        stopTimer();
        timerDisplay.innerHTML = `00:${maxTime}:00`
        userInputField.disabled = true;
    
        timerDisplayHeader.innerHTML = 'Time over!';
    }

    let milliseconds = timeLeftMs % 1000;
    let seconds = Math.floor((timeLeftMs % (1000 * 60)) / 1000);
    let minutes = Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60));

    let sec = seconds < 10 ? '0' + seconds: seconds;
    let min = minutes < 10 ? '0' + minutes: minutes;

    let ms = milliseconds < 10
        ?'00' + milliseconds
        : milliseconds < 100 
        ? '0' + milliseconds
        : milliseconds;

    
    timerDisplay.innerHTML = `${min}:${sec}:${ms}`;
}

// Functions text && user input

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
    let userInput = userInputField.value.split('');
    let spanArray = textDisplay.querySelectorAll('span');
    
    spanArray.forEach((span, index) => {
        const char = userInput[index];

        if (char === span.textContent) {
            span.classList.remove('incorrectInput');
            span.classList.add('correctInput');
        } else {
            span.classList.remove('correctInput');
            span.classList.add('incorrectInput');
        }

        
    })

}

// Start / Restart game 
function startGame () {
    if (!isTyping) {
        isTyping = true;
    }

    if (!timerRunning) {
        startTimer();
    }

    let chars = textDisplay.querySelectorAll('span');
    let typedChar = userInputField.value.split('')[charIndex];

    charIndex++

    chars.forEach(span => span.classList.remove("active"));
    chars[charIndex].classList.add("active");

    checkUserInput();
}

function clearResults () {
    let spanArrayResults = document.querySelectorAll('.result-container span');

    totalClicks = 0;
    clicksPerSecond = totalClicks;
    totalWords = 0;
    averageWps;
    mistakes = 0;

    spanArrayResults.forEach(span => {
        span.innerHTML = 0;
    })
}

function restartGame () {
    stopTimer();
    timeLeftMs = maxTime * 1000;
    charIndex = 0;
    isTyping = false;
    timerRunning = false;
    timerDisplay.innerHTML = `00:${maxTime < 10 ? '0' : ''}${maxTime}:00`;
    clearResults();
    textDisplay.scrollLeft = 0;
    userInputField.value = '';
    loadText();
    userInputField.disabled = false;
}

// Init
loadText()
timerDisplay.innerHTML = `00:${maxTime < 10 ? '0' : ''}${maxTime}:00`;
userInputField.addEventListener('input', () => startGame());

userInputField.addEventListener('keyup', () => {
    if (!timerRunning) return
    totalClicks++;
    spanTotalClicks.textContent = totalClicks;
    clicksPerSecond = totalClicks / maxTime;
    spanCps.textContent = clicksPerSecond.toFixed(2);
})

btnRestart.addEventListener('click', restartGame);

userInputField.addEventListener('keyup', (event) => {
    if (event.key === 'Backspace') {
        textDisplay.scrollLeft -= 6;
    } else {
        textDisplay.scrollLeft += 6;
    }
});
