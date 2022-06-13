// dom variables
const toggle = document.querySelector(".toggle");
const toggleBtn = document.querySelector(".toggle__btn");
const toggleImg = document.querySelector(".toggle__btn img");
const moonImg = "./Assets/moon.png";
const sunImg = "./Assets/sun.png";

const modeName = document.querySelector(".mode");
const body = document.querySelector("body");
const pointBox = [...document.querySelectorAll(".point__box")];
const gameBoard = document.querySelector(".game-board");
const flipBox = [...document.querySelectorAll(".flip")];


let plCount = 0;
let compCount = 0;
localStorage.setItem("player", plCount);
localStorage.setItem("computer", compCount);
const plPoint = document.querySelector(".player__point");
const compPoint = document.querySelector(".computer__point");

const restartMsg = document.querySelector(".restart-msg");
const restartBtn = document.querySelector(".restart-btn");

// controlling mode using boolean value
let nightMode = false;

// day based function
const day = function () {
  modeName.innerHTML = "dark mode";

  body.style.background = "#e4ede6";
  body.style.color = "#3c423d";
  toggle.style.border = "2px solid #232624";
  pointBox.forEach((pBox) => {
    pBox.style.border = "2px solid #b2bbb4";
    pBox.style.boxShadow = "0px 1px 3px rgba(0, 0, 0, .3)";
    pBox.style.background = "rgba(0, 0, 0, .1)";
  });

  gameBoard.style.background = "#b2bbb4";

  flipBox.forEach((fBox) => {
    fBox.style.background = "#77776f";
  });
};

// night based function
const night = function () {
  modeName.innerHTML = "light mode";

  body.style.background =
    "linear-gradient(190deg, rgba(2,0,36,1) 0%, rgba(3,1,48,1) 22%, rgba(9,9,121,1) 65%)";
  body.style.color = "#fff";
  toggle.style.border = "2px solid #fff";
  pointBox.forEach((pBox) => {
    pBox.style.border = "2px solid #090979";
    pBox.style.boxShadow = "0px 1px 3px #090979";
    pBox.style.background = "rgba(3,1,90,1)";
  });

  gameBoard.style.background = "#6e6eda";

  flipBox.forEach((fBox) => {
    fBox.style.background = "#030130";
  });
};

// toggle event 
toggle.addEventListener("click", () => {
  if (!nightMode) {
    toggleBtn.style.transform = "translateX(33px)";
    toggleImg.src = sunImg;
    night();
    nightMode = true;
  } else {
    toggleBtn.style.transform = "translate(2px)";
    toggleImg.src = moonImg;
    day();
    nightMode = false;
  }
});


// ================ game

let cardArray = [
  null, null, null,
  null, null, null,
  null, null, null
]

let selection = true;

function compChoice() {

  function recursion() {

    let remaining;

    for (let i = 0; i < cardArray.length; i++) {
      if (cardArray[i] === null) {
        remaining = true;
      }
    }

    const randomNum = Math.floor(Math.random() * 9);
    if (!cardArray[randomNum]) {
      return randomNum
    } else if (remaining) {
      return recursion();
    }

  }

  const flipNum = recursion();

  if (flipNum) {
    const compElem = document.getElementById(flipNum)
    compElem.style.transform = "rotateY(180deg)";
    compElem.children[1].innerHTML = "o";
    compElem.children[1].classList.add("color-o");
    cardArray[flipNum] = "o";
  } else {
    restartMsg.classList.remove("hidden");
  }
}

let matches = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function match(matchVal) {

  for (let i = 0; i < matches.length; i++) {

    const array = [];
    for (let j = 0; j < matches[i].length; j++) {
      const check = matches[i][j];

      if (cardArray[check] === matchVal) {
        array.push(check);
      }
    }

    if (array.length === 3) {
      matches.splice(i, 1);
      array.push(matchVal);
      array.push(i)
      return array;
    }
  }
}

flipBox.forEach((fBox) => {
  fBox.addEventListener("click", (e) => {
    fBox.style.transform = "rotateY(180deg)";
    fBox.children[1].innerHTML = "x";
    fBox.children[1].classList.add("color-x");
    const boxNum = e.target.parentElement.getAttribute("id");
    cardArray[boxNum] = "x";

    setTimeout(() => {
      compChoice();

      const plArray = match("x");
      const compArray = match("o");
      const plVal = plArray ? [...plArray] : null;
      const compVal = compArray ? [...compArray] : null;
      if (plVal && plVal[3] === "x") {
        localStorage.setItem("player", plCount += 1);
        const xPoint = localStorage.getItem("player");
        plPoint.innerHTML = xPoint;
        matches.splice(plVal[plVal.length - 1], 1)
      } if (compVal && compVal[3] === "o") {
        localStorage.setItem("computer", compCount += 1);
        const oPoint = localStorage.getItem("computer");
        compPoint.innerHTML = oPoint;
        matches.splice(compVal[compVal.length - 1], 1);
      }
    }, 1000);
  })
})

restartBtn.addEventListener("click", () => {
  matches = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  cardArray = [
    null, null, null,
    null, null, null,
    null, null, null
  ]

  restartMsg.classList.add("hidden");

  flipBox.forEach((fBox) => {
    fBox.style.transform = "rotateY(0deg)";
    fBox.children[1] = "";
    fBox.children[1].classList.remove("color-x");
    fBox.children[1].classList.remove("color-o");
  })

})