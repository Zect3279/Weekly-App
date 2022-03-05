<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <div class="BingoNumber">
          <p v-text="TT" />
        </div>
      </v-col>
    </v-row>
    <v-row class="text-center" justify="center">
      <v-col
        cols="12"
        sm="6"
      >
        <v-btn
          block
          class="ma-1"
          color="info"
          @click="Start"
        >
          Start
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="text-center" justify="center">
      <v-col
        cols="12"
        sm="6"
      >
        <v-btn
          block
          class="ma-1"
          color="error"
          @click="Stop"
        >
          Stop
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="text-center" justify="center">
      <v-col
        cols="12"
        sm="6"
      >
        <v-btn
          block
          dark
          class="ma-1"
          color="indigo"
          @click="Reset"
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
  name: 'StopWatch',
  computed: {
    // state から
    // ...mapState(['firstNumber']), // 最初(編集不可)
    // ...mapState(['lastNumber']), // 最後
    // ...mapState(['alreadyList']) // 既出リスト
  },
  mounted: function () {
    //
  },
  data: () => ({
    nowWatch: false,
    firstT: null,
    TT: '00:00:00:00',
    dTT: 0,
    baseMT: 0,
    TTInterval: null,
    MST: 0,
    ST: 0,
    MT: 0,
    HT: 0
  }),
  methods: {
    Start () {
      if (this.nowWatch) { return }
      this.firstT = new Date()
      this.TTInterval = setInterval(() => {
        this.nowWatch = true
        const nowT = new Date()
        this.dTT = (nowT - this.firstT) + this.baseMT
        const mili = Math.floor(this.dTT) % 1000
        const sec = Math.floor(this.dTT / 1000) % 60
        const min = Math.floor(this.dTT / 1000 / 60) % 60
        const hours = Math.floor(this.dTT / 1000 / 60 / 60)
        switch (String(mili).length) {
          case 1:
            this.MST = String('00' + mili)
            break
          case 2:
            this.MST = String('0' + mili)
            break
          default:
            this.MST = String(mili)
            break
        }
        switch (String(sec).length) {
          case 1:
            this.ST = String('0' + sec)
            break
          default:
            this.ST = String(sec)
            break
        }
        switch (String(min).length) {
          case 1:
            this.MT = String('0' + min)
            break
          default:
            this.MT = String(min)
            break
        }
        switch (String(hours).length) {
          case 1:
            this.HT = String('0' + hours)
            break
          default:
            this.HT = String(hours)
            break
        }
        this.TT = `${this.HT}:${this.MT}:${this.ST}:${this.MST.substring(0, 2)}`
      }, 10)
    },
    Stop () {
      clearInterval(this.TTInterval)
      this.TTInterval = null
      this.nowWatch = false
      this.baseMT = this.dTT
    },
    Reset () {
      clearInterval(this.TTInterval)
      this.TTInterval = null
      this.nowWatch = false
      this.baseMT = 0
      this.TT = '00:00:00:00'
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
  font-size: 120px;
  font-weight: bold;
}
</style>
