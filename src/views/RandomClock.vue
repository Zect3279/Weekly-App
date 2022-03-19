<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <div class="BingoNumber">
          <p v-text="`${HT}:${MT}:${ST}`" />
        </div>
      </v-col>
    </v-row>
    <v-row class="text-center" justify="center">
      <v-col
        cols="12"
        sm="3"
      >
        <v-btn
          block
          class="ma-1"
          @click="Reset"
          color="error"
        >
          Reset
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="text-center" justify="center">
      <v-col
        cols="12"
        sm="4"
      >
        <v-btn
          block
          class="ma-1"
          @click="$router.push('/')"
        >
          Go Back
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { mapState } from 'vuex'

export default {
  name: 'RandomClock',
  computed: {
    //
  },
  mounted: function () {
    this.Reset()
    this.Start()
  },
  data: () => ({
    TTInterval: null,
    ST: 0,
    MT: 0,
    HT: 0,
    TTTimeStop: false
  }),
  methods: {
    Start () {
      this.TTStopTime = Math.floor(Math.random() * 2000)
      console.log(this.TTStopTime)
      setTimeout(() => {
        this.ST = Number(this.ST)
        this.MT = Number(this.MT)
        this.HT = Number(this.HT)
        this.ST += 1
        if (this.ST >= 60) {
          this.ST = 0
          this.MT += 1
        }
        if (this.MT >= 60) {
          this.MT = 0
          this.HT += 1
        }
        if (this.HT >= 24) {
          this.HT = 0
        }
        if (this.ST <= 9) {
          this.ST = '0' + this.ST
        }
        if (this.MT <= 9) {
          this.MT = '0' + this.MT
        }
        if (this.HT <= 9) {
          this.HT = '0' + this.HT
        }
        this.TTTimeStop = true
      }, this.TTStopTime)
      // 条件が成立するまで setInterval でポーリング的なループ
      const intervalId = setInterval(() => {
        if (!this.TTTimeStop) {
          // 条件関数が false を返した時はループ続行
          return
        }
        // 条件関数が true を返した時はループ用の interval を消去
        clearInterval(intervalId)
        this.TTTimeStop = false
        this.Start()
      }, 10)
    },
    Stop () {
      clearInterval(this.TTInterval)
      this.TTInterval = null
    },
    Reset () {
      const TT = new Date()
      switch (String(TT.getSeconds()).length) {
        case 0:
          this.ST = Number('0' + TT.getSeconds())
          break
        case 1:
          this.ST = Number('0' + TT.getSeconds())
          break
        default:
          this.ST = Number(TT.getSeconds())
          break
      }
      switch (String(TT.getMinutes()).length) {
        case 0:
          this.MT = Number('0' + TT.getMinutes())
          break
        case 1:
          this.MT = Number('0' + TT.getMinutes())
          break
        default:
          this.MT = Number(TT.getMinutes())
          break
      }
      switch (String(TT.getHours()).length) {
        case 0:
          this.HT = Number('0' + TT.getHours())
          break
        case 1:
          this.HT = Number('0' + TT.getHours())
          break
        default:
          this.HT = Number(TT.getHours())
          break
      }
    }
  },
  watch: {
    //
  }
}
</script>

<style>
.BingoNumber{
  margin:2em 0;
  position: relative;
  padding: 0.5em 1.5em;
  border-top: solid 2px black;
  border-bottom: solid 2px black;
}
.BingoNumber:before, .BingoNumber:after{
  content: '';
  position: absolute;
  top: -10px;
  width: 2px;
  height: -webkit-calc(100% + 20px);
  height: calc(100% + 20px);
  background-color: black;
}
.BingoNumber:before {left: 10px;}
.BingoNumber:after {right: 10px;}
.BingoNumber p {
  margin: 0;
  padding: 0;
  font-size: 100px;
  font-weight: bold;
}
</style>
