//DOM elements Accessing
let random = Math.floor(1 + Math.random() * 100)
let guess = document.querySelector(".guess");
let submit = document.querySelector(".sbmt");
let mainMsg = document.querySelector(".main-msg");
let history = document.querySelector(".guessesSlot");
let totalAttempts = document.querySelector(".totalAttempts");
let resetBtn = document.querySelector(".reset-btn");
let newBtn = document.querySelector(".new-btn");
let hiScore = document.querySelector('.score');

let toPlay = true;
let attempt = 0;
let scores = 0;
let storedValue;

//localStorage Check
let memory = localStorage.getItem("high")

//if Empty -> return "TBD"
if (memory == null) {
    localStorage.setItem("high", "TBD");
}

//otherwise get highScore from LocalStorage
storedValue = localStorage.getItem("high");
hiScore.innerHTML = storedValue;


//If true then play
if (toPlay) {
    submit.addEventListener("click", handleGuess)
    document.addEventListener("keydown", handleGuess)
}

//get value from input
function handleGuess(e) {
    if (e.type === "click" || (e.type === "keydown" && e.key === "Enter")) {
        e.preventDefault();
        let guessNum = parseInt(guess.value);
        guess.value = "";
        validate(guessNum);
    }
}
submit.addEventListener("click", handleGuess);
document.addEventListener("keydown", handleGuess);


//Validate a Guess Number
function validate(guessNum) {
    if (isNaN(guessNum) || guessNum == "") {
        mainMsg.style.color = "red";
        mainMsg.innerHTML = "Please Enter a valid number";
    } else if (guessNum < 1) {
        mainMsg.style.color = "red";
        mainMsg.innerHTML = "Please Enter a Number beteeen 1 to 100 !!";
    } else if (guessNum > 100) {
        mainMsg.style.color = "red";
        mainMsg.innerHTML = "Please Enter a Number beteeen 1 to 100 !!";
    } else {
        attempt = attempt + 1;
        totalAttempts.innerHTML = `${attempt}`;
        history.innerHTML += `${guessNum} `;

        checkNum(guessNum);
    }
}


//Check if guess is right/ wrong/ close/ too-long
function checkNum(guessNum) {
    if (guessNum === random) {
        mainMsg.style.color = "rgb(45, 255, 45)";
        mainMsg.innerHTML = `Hurray ${guessNum} !! , You Got a Number !!!`;

        //Disabling button
        submit.setAttribute("disabled", "")
        submit.classList.add("disabled");
        submit.removeEventListener("click", handleGuess);
        document.removeEventListener("keydown", handleGuess);

        //saving if a high score
        let checkVal = localStorage.getItem("high");

        if (checkVal === "TBD" || checkVal === null) {
            localStorage.setItem("high", Infinity);
        }

        storedValue = localStorage.getItem("high");
        if (attempt <= storedValue) {
            localStorage.setItem("high", `${attempt}`);
            storedValue = localStorage.getItem("high");
            hiScore.innerHTML = storedValue;
        }

    }
    else if (guessNum < random) {
        if (guessNum >= random - 10) {
            mainMsg.style.color = "yellow";
            mainMsg.innerHTML = `Ohhh ${guessNum} ! You're within 10, Try a bigger number.`;
        }
        else {
            mainMsg.style.color = "orange";
            mainMsg.innerHTML = `Ohhh ${guessNum} ! , Too Low! Try a bigger number.`;
        }
    }
    else if (guessNum > random) {
        if (guessNum <= random + 10) {
            mainMsg.style.color = "yellow";
            mainMsg.innerHTML = `Ohhh ${guessNum} ! You're within 10, Try a smaller number.`;
        }
        else {
            mainMsg.style.color = "orange";
            mainMsg.innerHTML = `Ohhh ${guessNum} ! , Too High! Try a smaller number.`;
        }
    }

}


//reseting all data to reset game or new game
function reset() {
    toPlay = true;
    random = Math.floor(1 + Math.random() * 100)
    submit.removeAttribute("disabled")
    submit.classList.remove("disabled");
    document.addEventListener("keydown", handleGuess)
    submit.addEventListener("click", handleGuess);
    attempt = 0;
    totalAttempts.innerHTML = attempt;

    mainMsg.style.color = "rgb(45, 255, 45)";
    mainMsg.innerHTML = `Guess the Number in Minimum Attempts !!`;

    guess.value = "";
    history.innerHTML = "";
}

resetBtn.addEventListener("click", reset)

newBtn.addEventListener("click", reset)