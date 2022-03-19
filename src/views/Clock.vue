<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <div class="BingoNumber">
          <p v-text="nowT" />
        </div>
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
    //
  },
  mounted: function () {
    this.Start()
  },
  data: () => ({
    nowT: '',
    TTInterval: null
  }),
  methods: {
    Start () {
      this.TTInterval = setInterval(() => {
        const TT = new Date()
        var ST = 0
        var MT = 0
        var HT = 0
        switch (String(TT.getSeconds()).length) {
          case 1:
            ST = String('0' + TT.getSeconds())
            break
          default:
            ST = String(TT.getSeconds())
            break
        }
        switch (String(TT.getMinutes()).length) {
          case 1:
            MT = String('0' + TT.getMinutes())
            break
          default:
            MT = String(TT.getMinutes())
            break
        }
        switch (String(TT.getHours()).length) {
          case 1:
            HT = String('0' + TT.getHours())
            break
          default:
            HT = String(TT.getHours())
            break
        }
        this.nowT = `${HT}:${MT}:${ST}`
      }, 10)
    },
    Stop () {
      clearInterval(this.TTInterval)
      this.TTInterval = null
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
