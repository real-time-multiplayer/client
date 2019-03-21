<template>
  <div>
    <canvas id="myCanvas" width="480" height="320" style="padding-left: 0; padding-right: 0; margin-left: auto; margin-right: auto; display: block; border: 1px solid black;"></canvas>
    <div style="display: none;">
      <img id="source" src="@/assets/coin.png">
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import io from 'socket.io-client';

export default {
  name: 'Canvas',
  data() {
    return {
      socket: io('localhost:3000'),
      isPlaying: false,
      coins: [],
    }
  },
  mounted() {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const coinImage = document.getElementById('source');
    const drawBoard = (gameState) => {
      this.coins = gameState.coins;
      let coins = this.coins
      for(let id in gameState.players) {
        for(let i = 0; i < coins.length; i++) {
        if(gameState.players[id].x < coins[i].x + 25 &&
          gameState.players[id].x + 25 > coins[i].x &&
          gameState.players[id].y < coins[i].y + 25 &&
          gameState.players[id].y + 25 > coins[i].y) {
            this.coins.splice(i, 1);
            this.socket.emit('removeCoin', i);
          } else {
            ctx.drawImage(coinImage, coins[i].x, coins[i].y, 25, 25);
          }
        }
        ctx.beginPath();
        ctx.rect(gameState.players[id].x, gameState.players[id].y, gameState.players[id].width, gameState.players[id].height);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath();
      }
    }

    const playerMovement = {
      up: false,
      down: false,
      left: false,
      right: false
    };

    const keyDownHandler = (e) => {
      if (e.keyCode == 39) {
      playerMovement.right = true;
      } else if (e.keyCode == 37) {
        playerMovement.left = true;
      } else if (e.keyCode == 38) {
        playerMovement.up = true;
      } else if (e.keyCode == 40) {
        playerMovement.down = true;
      }
    };
    
    const keyUpHandler = (e) => {
      if (e.keyCode == 39) {
        playerMovement.right = false;
      } else if (e.keyCode == 37) {
        playerMovement.left = false;
      } else if (e.keyCode == 38) {
        playerMovement.up = false;
      } else if (e.keyCode == 40) {
        playerMovement.down = false;
      }
    };

    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);

    this.socket.emit('newPlayer');

    this.socket.on('state', gameState => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBoard(gameState)
    });

    setInterval(() => {
      this.socket.emit('playerMovement', playerMovement);
    }, 1000 / 60);
  },
};
</script>
