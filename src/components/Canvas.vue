<template>
  <div>
    <canvas id="myCanvas" width="480" height="320" style="padding-left: 0; padding-right: 0; margin-left: auto; margin-right: auto; display: block; border: 1px solid black;"></canvas>
    <div style="display: none;">
      <img id="source" src="@/assets/coin.png">
    </div>
    <button class="btn btn-primary" @click="toggle" v-if="!gameState.isPlaying">Toggle</button>
    <ul>
      <li v-for="player in gameState.players">{{ player.name }}: {{ player.score }}</li>
    </ul>
    <audio controls autoplay style="display:none">
      <source src="https://www.dl-sounds.com/wp-content/uploads/edd/2018/10/Melody-in-F-preview.mp3" type="audio/mpeg">
    </audio>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Canvas',
  data() {
    return {
      ctx: '',
      coinImage: '',
      gameState: {},
      interval: '',
      playerMovement: {
        up: false,
        down: false,
        left: false,
        right: false
      }
    }
  },
  sockets: {
    connect() {
      
    },
    state(gameState) {
      this.gameState = gameState
      this.drawBoard();
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  mounted() {
    this.coinImage = document.getElementById('source');
    this.ctx = document.getElementById('myCanvas').getContext('2d');
    
    const keyDownHandler = (e) => {
      if (e.keyCode == 39) {
        this.playerMovement.right = true;
      } else if (e.keyCode == 37) {
        this.playerMovement.left = true;
      } else if (e.keyCode == 38) {
        this.playerMovement.up = true;
      } else if (e.keyCode == 40) {
        this.playerMovement.down = true;
      }
    };
    const keyUpHandler = (e) => {
      if (e.keyCode == 39) {
        this.playerMovement.right = false;
      } else if (e.keyCode == 37) {
        this.playerMovement.left = false;
      } else if (e.keyCode == 38) {
        this.playerMovement.up = false;
      } else if (e.keyCode == 40) {
        this.playerMovement.down = false;
      }
    };
    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);
    this.initGame();
  },
  methods: {
    toggle() {
      this.$socket.emit('toggleGame', this.$store.state.currentJoint)
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
            this.$socket.emit('coinState', { coins, roomName: this.$store.state.currentJoint, id });
          } else {
            this.ctx.drawImage(this.coinImage, coins[i].x, coins[i].y, 25, 25);
          }
        }
        this.ctx.beginPath();
        this.ctx.rect(this.gameState.players[id].x, this.gameState.players[id].y, this.gameState.players[id].width, this.gameState.players[id].height);
        this.ctx.fillStyle = '#0095DD';
        this.ctx.fill();
        this.ctx.fillStyle = '#000000';
        this.ctx.font = "14pt Calibri";
        this.ctx.fillText(this.gameState.players[id].name, this.gameState.players[id].x, this.gameState.players[id].y);
        this.ctx.closePath();
      }
    },
    initGame() {
      this.interval = setInterval(() => {
        this.$socket.emit('playerMovement', { playerMovement: this.playerMovement, roomName: this.$store.state.currentJoint });
      }, 1000 / 60);
    }
  }
};
</script>