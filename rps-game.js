//file to hold the logic behind the game rock, paper and scissors
//some var will be private to avoid conflict with coding
class RpsGame{
  constructor(player1, player2){
//this._ work for making  private
    this._players = [player1, player2];
    this._turns = [null, null];
    this._scores = [0, 0];
    this._sendToPlayers('Rock Paper Scissors Starts!');
    this._players.forEach((player, index) => {
      player.on('turn', (turn) => {
        this._onTurn(index, turn);
      });
    });
  }
  _sendToPlayer(playerIndex, msg) {
    this._players[playerIndex].emit('message', msg);
  }
  _sendToPlayers(msg){
    this._players.forEach((player) => {
      player.emit('message', msg);
    });
  }
  _onTurn(playerIndex, turn) {
    this._turns[playerIndex] = turn;
    this._sendToPlayer(playerIndex, `you selected ${turn}`);
    this._checkGameOver();
  }
  _checkGameOver(){
    const turns = this._turns;
    if(turns[0] && turns[1]){
      this._getGameResult();
      this._sendToPlayers('GAME OVER ' + turns.join(' : '));
      this._turns = [null, null];
      this._sendToPlayers('NEXT ROUND')
    }
  }
//to know who will be the winner we calculate the distance between
//of each players' decision
  _getGameResult(){
      const valueFromPlayer1 = this._decodeTurn(this._turns[0]);
      const valueFromPlayer2 = this._decodeTurn(this._turns[1]);
      const distance = (valueFromPlayer1 - valueFromPlayer2 + 3) % 3;
      switch(distance){
        case 0:
        this._sendToPlayers('Draw!');
        console.log("it works");
        break;
        case 1:
        this._scores[0]++;
        this._sendWinMessage(this._players[0], this._players[1]);
        break;
        case 2:
        this._scores[1]++;
        this._sendWinMessage(this._players[1], this._players[0]);
        break;
      }
    }
    _sendWinMessage(winner, loser){
      winner.emit('message', 'You won!! ' + this._scores[0] + ' ' + this._scores[1]);
      loser.emit('message', 'You lost!! ' + this._scores[0] + ' ' + this._scores[1]);
    }
    _decodeTurn(turn){
      switch(turn){
        case 'rock':
          return 0;
        case 'paper':
          return 1;
        case 'scissors':
          return 2;
        default:
          throw new Error(`could not decode turn ${turn}`);
      }
    }
/*
    _updateScore(winnerSide){
      winnerSide = winnerSide + 1;
      console.log(winnerSide);
    }*/
  }
module.exports = RpsGame;
