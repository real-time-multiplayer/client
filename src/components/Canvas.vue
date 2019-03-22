<template>
  <div>
    <canvas id="myCanvas" width="480" height="320" style="padding-left: 0; padding-right: 0; margin-left: auto; margin-right: auto; display: block; border: 1px solid black;"></canvas>
    <div style="display: none;">
      <img id="source" src="@/assets/coin.png">
    </div>
    <button class="btn btn-primary" @click="toggle">Toggle</button>
    <ul>
      <li v-for="player in gameState.players">{{ player.name }}: {{ player.score }}</li>
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
      gameState: {}
    }
  },
  sockets: {
    connect() {
      this.newPlayer();
    },
    state(gameState) {
      this.gameState = gameState
      this.drawBoard();
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
    drawBoard() {
      this.ctx.clearRect(0, 0, 480, 320);
      let coins = this.gameState.coins;
      for(let id in this.gameState.players) {
        
        for(let i = 0; i < coins.length; i++) {
        if(this.gameState.players[id].x < coins[i].x + 25 &&
          this.gameState.players[id].x + 25 > coins[i].x &&
          this.gameState.players[id].y < coins[i].y + 25 &&
          this.gameState.players[id].y + 25 > coins[i].y) {
            coins.splice(i, 1);
            this.$socket.emit('coinState', coins, id);
          } else {
            this.ctx.drawImage(this.coinImage, coins[i].x, coins[i].y, 25, 25);
          }
        }
        this.ctx.beginPath();
        this.ctx.rect(this.gameState.players[id].x, this.gameState.players[id].y, this.gameState.players[id].width, this.gameState.players[id].height);
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
