<template>
  <div>
    <canvas id="myCanvas" width="480" height="320" style="padding-left: 0; padding-right: 0; margin-left: auto; margin-right: auto; display: block; border: 1px solid black;"></canvas>
    <div style="display: none;">
      <img id="source" src="@/assets/coin.png">
    </div>
    <button @click="toggle">Toggle</button>
    <ul>
      <li>{{ scores }}</li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Canvas',
  data() {
    return {
      isPlaying: false,
      ctx: '',
      coinImage: '',
      scores: {}
    }
  },
  sockets: {
    connect() {
      this.newPlayer();
    },
    state(gameState) {
      this.drawBoard(gameState);
    }
  },
  mounted() {
    this.coinImage = document.getElementById('source');
    this.ctx = document.getElementById('myCanvas').getContext('2d');
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

    setInterval(() => {
      this.$socket.emit('playerMovement', playerMovement);
    }, 1000 / 60);
  },
  methods: {
    toggle() {
      this.$socket.emit('toggleGame')
    },
    drawBoard(gameState) {
      this.ctx.clearRect(0, 0, 480, 320);
      let coins = gameState.coins;
      for(let id in gameState.players) {
        this.$set(this.scores, id, { score })
        
        for(let i = 0; i < coins.length; i++) {
        if(gameState.players[id].x < coins[i].x + 25 &&
          gameState.players[id].x + 25 > coins[i].x &&
          gameState.players[id].y < coins[i].y + 25 &&
          gameState.players[id].y + 25 > coins[i].y) {
            coins.splice(i, 1);
            this.$socket.emit('coinState', coins);
            this.scores[id].score++;
          } else {
            this.ctx.drawImage(this.coinImage, coins[i].x, coins[i].y, 25, 25);
          }
        }
        this.ctx.beginPath();
        this.ctx.rect(gameState.players[id].x, gameState.players[id].y, gameState.players[id].width, gameState.players[id].height);
        this.ctx.fillStyle = '#0095DD';
        this.ctx.fill();
        this.ctx.closePath();
      }
    },
    newPlayer() {
      this.$socket.emit('newPlayer');
    }
  }
};
</script>
