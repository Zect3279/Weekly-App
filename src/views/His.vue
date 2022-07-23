<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <div class="BingoNumber">
          <p v-text="bingoNumber" />
        </div>
      </v-col>
    </v-row>
    <v-row class="text-center" justify="center">
      <v-col
        cols="12"
        sm="6"
      >
        <v-btn
          class="ma-1"
          color="info"
          @click="Shhow"
        >
          Show
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { mapState } from 'vuex'
// const jwt = require('jsonwebtoken')

export default {
  name: 'Bingo',
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
    bingoNumber: ''
  }),
  methods: {
    Shhow () {
      this.bingoNumber = history.length
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
  font-size: 200px;
  font-weight: bold;
}

</style>
