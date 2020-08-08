let inputArea;
let fill;
let img;
let scoreDis;
let roverlay;
let noverlay;

let alphaLttr;

let lttrArr = [
    'hello',
    'world',
    'dog',
    'cat',
    'mouse',
    'rat',
    'hat',
    'game',
    'earth',
    'sun',
    'mercury',
    'venus',
    'mars',
    'jupiter',
    'neptune',
    'uranus',
    'saturn',
    'pluto',
    'india',
    'asia',
    'europe',
    'africa',
    'antratica',
    'australia',
    'america',
    'newton',
    'plank',
    'tree',
    'fan',
    'wind',
];
let guessLttr;
let inputedLttr;
let wrongTimes;
let score;

window.onload = function () {
    inputArea = document.getElementsByClassName('inputArea')[0];
    fill = document.getElementsByClassName('fill')[0];
    img = document.getElementsByTagName('img')[0];
    scoreDis = document.getElementById('scoreDis');
    roverlay = document.getElementsByClassName('overlay')[0];
    noverlay = document.getElementsByClassName('overlay')[1];

    alphaLttr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    lttrArr = lttrArr.map((lttr) => lttr.toUpperCase());

    startGame();
};

let startGame = () => {
    score = 0;

    initGame();
};

let initGame = () => {
    guessLttr = lttrArr[Math.floor(Math.random() * lttrArr.length)];
    inputedLttr = new Array(guessLttr.length).fill('');
    wrongTimes = 0;

    console.log(guessLttr);

    fill.innerHTML = ``;

    setScore();
    fillGuess();
    setImg();

    inputArea.innerHTML = '';
    for (const lttr of alphaLttr) {
        inputArea.innerHTML += `<span onclick="handleClick('${lttr}', this)">${lttr}</span>`;
    }
};

let fillGuess = () => {
    for (const letter of inputedLttr) {
        fill.innerHTML += `<span>${letter}</span>`;
    }
};

let setScore = () => {
    scoreDis.innerHTML = `Score: ${score}`;
};

let setImg = () => {
    let imgSrc = img.src;
    img.src = `${imgSrc.slice(
        0,
        imgSrc.lastIndexOf('.') - 1
    )}${wrongTimes++}.png`;
};

let handleClick = (lttr, elem) => {
    fill.innerHTML = ``;
    let foundAMatch = false;
    for (let i = 0; i < guessLttr.length; i++) {
        if (guessLttr[i] == lttr) {
            inputedLttr[i] = lttr;
            foundAMatch = true;
        }
    }
    fillGuess();
    if (!foundAMatch) {
        setImg();
        if (wrongTimes > 6) {
            roverlay.style.top = '0%';
        }
    } else if (inputedLttr.lastIndexOf('') < 0) {
        score++;
        setScore();
        noverlay.style.top = '0%';
    }
    elem.classList.add(foundAMatch ? 'greenbg' : 'redbg');
};

let restartGame = () => {
    startGame();
    roverlay.style.top = '-100%';
};

let nextGame = () => {
    initGame();
    noverlay.style.top = '-100%';
};
