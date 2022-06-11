
// variables 
const body = document.querySelector("body");
const inputValue = prompt("please enter your name, only 5 letters are allowed");
const playerNames = document.querySelectorAll(".player__name");
const playBtn = document.querySelector(".play-btn");
const okBtn = document.querySelector(".ok-btn");
const restartBtn = document.querySelector(".restart-btn");
const popUp = document.querySelector('.pop-up');
const winner = document.querySelector(".message");
const icons = document.querySelector('.game__players');
const score = document.querySelector(".scoreboard");
const plyrResult = document.querySelector(".player__result img");
const compResult = document.querySelector(".computer__result img");
const plyrScore = document.querySelector(".player__score");
const compScore = document.querySelector(".computer__score");
const win = document.querySelector(".win");
const lose = document.querySelector(".lose");
const emoji = document.querySelector(".emoji");
const questionBtn = document.querySelector(".question");
const questionEvnt = document.querySelector(".question span");
const instruction = document.querySelector(".instruction");
const closeBtn = document.querySelector(".close-btn");

// toter score of players
let plyrTotal = 0;
let compTotal = 0;

if (inputValue) {
    playerNames.forEach((name) => name.innerHTML = inputValue.slice(0, 5))
} else {
    playerNames.forEach((name) => name.innerHTML = 'you')
}

// image function
const image = (val1, val2) => {
    const rockPath = "./Assets/rock.png";
    const paperPath = "./Assets/paper.png";
    const scissorPath = "./Assets/scissor.png";

    function importing(value, place) {
        if (value === 0) { place.src = rockPath }
        else if (value === 1) { place.src = paperPath }
        else if (value === 2) { place.src = scissorPath }
    }

    importing(val1, plyrResult);
    importing(val2, compResult);
}

// css class function
const cssClass = () => {
    body.classList.toggle('overlay');
    icons.classList.toggle('hide');
    score.classList.toggle('hide');
}

// score counting 
const scoreBoard = (playerVal, computerVal) => {
    if (playerVal === 0 && computerVal === 2) {
        plyrTotal += 1;
    } else if (computerVal === 0 && playerVal === 2) {
        compTotal += 1;
    } else if (playerVal === 2 && computerVal === 1) {
        plyrTotal += 1;
    } else if (computerVal === 2 && playerVal === 1) {
        compTotal += 1;
    } else if (playerVal === 1 && computerVal === 0) {
        plyrTotal += 1;
    } else if (computerVal === 1 && playerVal === 0) {
        compTotal += 1;
    }

    plyrScore.innerHTML = plyrTotal;
    compScore.innerHTML = compTotal;
}

//  play btn event 
playBtn.addEventListener("click", () => {
    const playerVal = Math.floor(Math.random() * 3);
    const computerVal = Math.floor(Math.random() * 3);

    popUp.classList.toggle('hide');

    // classes add or remove elements when clicking play btn 
    cssClass();

    // image function calling for pop up time show exact result
    image(playerVal, computerVal);

    // score function calling
    scoreBoard(playerVal, computerVal);
})

// ok btn event 
okBtn.addEventListener("click", () => {
    // css class function calling 
    cssClass();

    popUp.classList.toggle("hide");

    if (plyrTotal >= 10) {
        cssClass();
        winner.classList.remove("hide");

        // music for success
        new Audio("./Assets/music/success.mp3").play();
        lose.style.display = "none";
        win.style.display = "block";
        emoji.innerHTML = "&#129395";
    } else if (compTotal >= 10) {
        cssClass();

        // music for fail
        new Audio("./Assets/music/fail.mp3").play();
        winner.classList.remove("hide");
        win.style.display = "none";
        lose.style.display = "block";
        emoji.innerHTML = "&#128546";
    }

});

// restart btn event
restartBtn.addEventListener("click", () => {
    cssClass();
    winner.classList.add("hide");
    plyrTotal = 0;
    compTotal = 0;
    plyrScore.innerHTML = plyrTotal;
    compScore.innerHTML = compTotal;
})

// question button event
questionBtn.addEventListener("mouseover", () => {
    questionEvnt.style.display = "block";
})

questionBtn.addEventListener("mouseout", () => {
    questionEvnt.style.display = "none";
})

questionBtn.addEventListener("click", () => {
    instruction.classList.remove("hide");
})

// close btn event
closeBtn.addEventListener("click", () => {
    instruction.classList.add("hide");
})

// service worker registration
if (window.navigator.serviceWorker) {
    window.navigator.serviceWorker.register("./sw.js");
}