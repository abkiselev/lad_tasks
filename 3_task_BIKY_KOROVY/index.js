const readlineSync = require('readline-sync');
let currentLength;
let currentNumber;
let attempts;


const setSecretNumber = (numLength) => {
    let results = [];

    while (results.length !== numLength) {
        let numb = Math.floor(Math.random() * 10);
        if (!results.includes(numb)) {
            results.push(numb)
        }
    }
    currentLength = results.length;
    currentNumber = Number(results.join(''));
    console.log(currentNumber);
    game(currentNumber)

}

const initiateGame = () => {
    let length = readlineSync.questionInt('Enter number length you wish to set (3 to 6): ');
    while (length < 3 || length > 6) {
        length = readlineSync.questionInt('Please enter digits from 3 to 6: ');
    } setSecretNumber(length)
}
initiateGame()


function game() {
    attempts = 5;
    console.log(`I set a secret number with length of ${currentLength}, you have ${attempts} attempts to guess it ;)`);
    let guess = readlineSync.questionInt(`Please enter your first guess (${currentLength} digits): `);
    while (!checkGuess(guess) && attempts) {
        guess = readlineSync.questionInt(`Please enter your guess (${currentLength} digits): `);
    } result('You lose(((')

}

function checkGuess(guess) {
    if (guess.toString().length !== currentLength) {
        console.log(`You entered ${guess.toString().length} digits, but secret number is ${currentLength} digits`);
        return false
    }

    if (guess === currentNumber) {
        result('You won!')
    }

    const rightPosition = [];
    const notRightPosition = [];
    const guessToString = guess.toString();
    const currentNumberToString = currentNumber.toString();

    for (let i = 0; i < currentLength; i++) {
        if (currentNumberToString.includes(guessToString[i]) && !rightPosition.includes(guessToString[i])) {
            if (currentNumberToString.indexOf(guessToString[i]) === i) {
                rightPosition.push(guessToString[i])
            } else if (!rightPosition.includes(guessToString[i])) {
                notRightPosition.push(guessToString[i])
            }
        }
    }

    console.log(`Right digit and on right position - ${rightPosition.length > 0 ? rightPosition : 'none'}`);
    console.log(`Right digit but NOT on right position - ${notRightPosition.length > 0 ? notRightPosition : 'none'}`);

    attempts -= 1;
    console.log(`\n ${attempts} attempts left`);
}


function result(text) {
    let anotherGame = readlineSync.questionInt(`${text} Would you like to play again? (1 - yes, 0 - no) `);
    anotherGame === 1 ? initiateGame() : process.exit();
}