class Player {
    constructor({ name, moves }, health) {
        this._maxHealth = health;
        this._name = name;

        this._moves = moves.map(move => {
            move.isAvailable = move.cooldown
            return { ...move }
        });

    }

    _setIsAvalible() {
        this._moves.forEach(move => {
            if(move.isAvailable !== move.cooldown){
                move.isAvailable += 1;
            }
        });
    }

    _disableMove(move) {
        move.isAvailable = 0;
    }

    _setDamage(myMove, enemyMove) {

        // из описания задачи не совсем понятно как должен считаться урон, поэтому написал просто "какую-то" формулу расчета урона
        const damage = Math.ceil( ((enemyMove.physicalDmg + myMove.physicArmorPercents) / 99) + ((enemyMove.magicDmg + myMove.magicArmorPercents) / 99) );

        this._maxHealth = this._maxHealth - damage;

        this._setIsAvalible()
        this._disableMove(this._moves.find(move => move.name === myMove.name));
    }

    getAvailableMoves() {        
        return this._moves.filter(move => move.isAvailable === move.cooldown);
    }

    getHealth() {
        return this._maxHealth > 0 ? this._maxHealth : 0;
    }

    setRoundResult(myMove, enemyMove) {
        this._setDamage(myMove, enemyMove);
        this._setIsAvalible();
        this._disableMove(this._moves.find(move => move.name === myMove.name));
    }
  
}


module.exports = {
    Player
}
