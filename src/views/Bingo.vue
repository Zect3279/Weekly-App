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
        sm="1"
      >
        <v-text-field
          class="centered-input"
          outlined
          readonly
          v-model="tmpFNumber"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="1"
      >
        <v-icon class="pt-4">mdi-arrow-right-bold-outline</v-icon>
      </v-col>
      <v-col
        cols="12"
        sm="1"
      >
        <v-text-field
          class="centered-input"
          outlined
          :readonly="nowBingo"
          v-model="tmpLNumber"
        ></v-text-field>
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
          :loading="loading"
          :disabled="loading"
          color="info"
          @click="Bingo(); loader = 'loading'"
        >
          Start
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>mdi-cached</v-icon>
            </span>
          </template>
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="numList" class="text-center" justify="center">
      <v-col
        cols="12"
        sm="1"
        v-for="num in numList"
        :key="num"
      >
        <v-chip v-if="alreadyList.includes(num)" v-text="num" color="light-blue lighten-1" />
        <v-chip v-else v-text="num" />
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
          :loading="onSave"
          :disabled="onSave"
          color="cyan"
          @click="Saave(); loader = 'onSave'"
        >
          Save
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>mdi-cached</v-icon>
            </span>
          </template>
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
          :loading="onReset"
          :disabled="onReset"
          color="error"
          @click="Reeset(); loader = 'onReset'"
        >
          Reset
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>mdi-cached</v-icon>
            </span>
          </template>
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
    <v-row justify="center">
      <v-dialog
        v-model="saveDialog"
        max-width="450"
      >
        <v-card>
          <v-card-title class="text-h5">
            Save current state
          </v-card-title>

          <v-card-text>
            Keep this Token till next time you use this.
          </v-card-text>
          <v-form>
            <v-container>
              <v-row justify="center">
                <v-col
                  cols="12"
                  sm="11"
                >
                  <v-text-field
                    v-model="token"
                    label="Token"
                    filled
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="saveDialog = false"
            >
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
const jwt = require('jsonwebtoken')

export default {
  name: 'Bingo',
  computed: {
    // state から
    ...mapState(['firstNumber']), // 最初(編集不可)
    ...mapState(['lastNumber']), // 最後
    ...mapState(['alreadyList']) // 既出リスト
  },
  mounted: function () {
    this.nowBingo = false
    this.numList = []
    this.tmpFNumber = this.firstNumber
    this.tmpLNumber = this.lastNumber
    if (this.alreadyList[0]) {
      this.nowBingo = true
      const tmpNumList = []
      for (let i = Number(this.firstNumber); i < (Number(this.lastNumber) + 1); i++) {
        tmpNumList.push(i)
      }
      this.numList = tmpNumList
    }
  },
  data: () => ({
    loader: null, // loader
    loading: false, // loader
    onReset: false, // loader
    onSave: false, // loader
    nowBingo: false, // 最大値の変更の可/不可
    bingoNumber: 0, // 表示する番号
    tmpFNumber: 1, // 一時的に最初の番号を保存する
    tmpLNumber: 10, // 一時的に最後の番号を保存する
    numList: [], // 全体
    saveDialog: false, // 状態保存用ダイアログ
    token: '' // JWTトークン
  }),
  methods: {
    Saave () {
      // JWT使って状態を保存
      const token = jwt.sign({
        firstNumber: this.firstNumber,
        lastNumber: this.lastNumber,
        alreadyList: this.alreadyList
      }, process.env.VUE_APP_JWT_secret)
      this.token = token
      this.saveDialog = true
    },
    Bingo () {
      this.bingoNumber = 0
      // Number Checker
      if (isNaN(this.tmpFNumber) || isNaN(this.tmpLNumber)) {
        console.log('not number')
        this.bingoNumber = 'Error'
        return
      } else if (Number(this.tmpFNumber) <= 0 || Number(this.tmpLNumber) <= 1) {
        console.log('too small')
        this.bingoNumber = 'Error'
        return
      }

      if (!this.nowBingo) {
        this.$store.commit('resetAList', {})
        this.$store.commit('changeFNum', { num: this.tmpFNumber })
        this.$store.commit('changeLNum', { num: this.tmpLNumber })
        const tmpNumList = []
        for (let i = Number(this.firstNumber); i < (Number(this.lastNumber) + 1); i++) {
          tmpNumList.push(i)
        }
        this.numList = tmpNumList
        this.nowBingo = true
      }

      // Loading
      const loadBingo = setInterval(() => {
        this.bingoNumber = this.numList[Math.floor(Math.random() * this.numList.length)]
      }, 100)
      setTimeout(() => {
        clearInterval(loadBingo)
        const notYetList = this.numList.filter(i => this.alreadyList.indexOf(i) === -1)
        this.bingoNumber = notYetList[Math.floor(Math.random() * notYetList.length)]
        // this.alreadyList.push(this.bingoNumber)
        this.$store.commit('appendAList', { num: this.bingoNumber })
        if (notYetList.length <= 1) {
          this.nowBingo = false
        }
      }, 1500)

      // Bingo
    },
    Reeset () {
      setTimeout(() => {
        this.nowBingo = false
        this.tmpFNumber = 1
        this.tmpLNumber = 10
        this.numList = []
        this.$store.commit('resetAList', {})
        this.bingoNumber = 0
      }, 1800)
    }
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 2000)

      this.loader = null
    }
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

.centered-input input {
  text-align: center
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
