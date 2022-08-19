const readlineSync = require('readline-sync');
const { mag, monster } = require("./playersData.js");
const { Player } = require("./Player.js");

function initiateGame() {
    const initialHealth = readlineSync.questionInt('Enter your health: ');
    game(initialHealth);
}
initiateGame();


function game(initialHealth) {
    const hero = new Player(mag, initialHealth);
    const computer = new Player(monster, monster.maxHealth);
    let roundNumber = 0;

    while (true) {
        const computerMovesAvailable = computer.getAvailableMoves();
        const heroMovesAvailable = hero.getAvailableMoves();

        const computerMoveCurrent = computerMovesAvailable[Math.floor(Math.random() * computerMovesAvailable.length)] || computerMovesAvailable[0];
        roundNumber += 1;

        console.log(`_________________________________________________________________________ \n`);
        console.log(`Round ${roundNumber}!`);
        console.log(`Enemy health - ${computer.getHealth()}, Your health - ${hero.getHealth()} \n`);
        console.log(`ENEMY IS ATTACKING with - ${computerMoveCurrent.name} (physicalDmg - ${computerMoveCurrent.physicalDmg}, magicDmg - ${computerMoveCurrent.magicDmg}, physicArmorPercents - ${computerMoveCurrent.physicArmorPercents}, magicArmorPercents - ${computerMoveCurrent.magicArmorPercents}) \n`);
        console.log(`Your available strikes:`);

        heroMovesAvailable.forEach((item, index) => {
          console.log(`Press ${index} - ${item.name} (physicalDmg - ${item.physicalDmg}, magicDmg - ${item.magicDmg}, physicArmorPercents - ${item.physicArmorPercents}, magicArmorPercents - ${item.magicArmorPercents})`)
        });

        let heroMoveCurrent = readlineSync.questionInt('Your choice - ');
        while (heroMoveCurrent > heroMovesAvailable.length - 1) {
          heroMoveCurrent = readlineSync.questionInt(`Please enter correct number (0 to ${heroMovesAvailable.length - 1}) - `);
        }

        computer.setRoundResult(computerMoveCurrent, heroMovesAvailable[heroMoveCurrent]);
        hero.setRoundResult(heroMovesAvailable[heroMoveCurrent], computerMoveCurrent);

        hero.getHealth() === 0 && anotherGame('You lose...')
        computer.getHealth() === 0 && anotherGame('You won!')
    }
}


function anotherGame(text) {
    console.log(`_________________________________________________________________________ \n`);
    const wantAnotherGame = readlineSync.questionInt(`${text} Want to play again? 1 - yes, 0 - no: `);
    wantAnotherGame === 1 ? initiateGame() : process.exit();
}