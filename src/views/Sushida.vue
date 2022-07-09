<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <div class="sushidaText">
          <p>{{ sushidaText }}</p>
        </div>
      </v-col>
      <v-col cols="12">
        <p>{{ sushidaText.slice(0, OKindex) }}</p>
      </v-col>
    </v-row>
    <v-row class="text-center" justify="center">
      <v-col
        cols="12"
        sm="8"
      >
        <v-text-field
          v-model="answerMSG"
          solo
          label="回答をここに入力"
          :disabled="!onGame"
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
          color="info"
          @click="Sttart"
          :disabled="onGame"
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
          color="green"
          dark
          @click="Exxport"
        >
          Export
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
          Exit
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
    <v-row justify="center">
      <v-dialog
        v-model="clearDialog"
        max-width="450"
        persistent
      >
        <v-card>
          <v-card-title class="text-h5">
            Game Clear
          </v-card-title>

          <v-card-actions>
            <v-btn
              color="green darken-1"
              text
              @click="Exxport"
            >
              Export
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="red darken-1"
              text
              @click="clearDialog = false;$router.push('/load')"
            >
              Back to Edit
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
  name: 'Sushida',
  computed: {
    // state から
    ...mapState(['quList'])
  },
  mounted: function () {
    //
  },
  data: () => ({
    token: '',
    questions: [],
    sushidaText: 'Startを押して開始',
    answerMSG: '',
    lastLength: 0,
    OKindex: 0,
    saveDialog: false,
    clearDialog: false,
    onGame: false
  }),
  methods: {
    Geet () {
      if (!this.questions.length) {
        this.Fiin()
        return
      }
      console.log('新しい文章')
      const quIndex = Math.floor(Math.random() * this.questions.length)
      this.sushidaText = this.questions[quIndex]
      this.questions.splice(quIndex, 1)
    },
    Exxport () {
      // JWT使って状態を保存
      console.log(this.quList)
      const token = jwt.sign({
        qus: this.quList
      }, process.env.VUE_APP_JWT_secret)
      this.token = token
      this.saveDialog = true
    },
    Sttart () {
      this.onGame = true
      this.questions = [...this.quList]
      this.Geet()
    },
    Fiin () {
      this.clearDialog = true
      this.onGame = false
      this.questions = []
      this.sushidaText = 'Startを押して開始'
      this.answerMSG = ''
      this.lastLength = 0
      this.OKindex = 0
    }
  },
  watch: {
    answerMSG () {
      if (!this.onGame) { return }
      if (!this.sushidaText) {
        this.Geet()
        return
      }
      const inputtext = this.answerMSG
      const inputIndex = inputtext.length - 1
      console.log('ﾉｼ')
      console.error(`${this.lastLength}: ${inputIndex}`)
      if (this.lastLength !== inputIndex) { return }
      const lastLetter = inputtext[inputIndex]
      const lastanswer = this.sushidaText[this.OKindex]
      if (!lastLetter && !lastanswer) { return }
      if (lastLetter === lastanswer) {
        console.warn('yo')
        this.OKindex += 1
        console.log(this.sushidaText.slice(0, this.OKindex))
        if (this.sushidaText.length === this.OKindex) {
          this.sushidaText = ''
          this.answerMSG = ''
          this.lastLength = 0
          this.OKindex = 0
          return
        }
      }
      this.lastLength += 1
    }
  }
}
</script>

<style>

.sushidaText{
  margin:2em 0;
  position: relative;
  padding: 0.5em 1.5em;
  border-top: solid 2px black;
  border-bottom: solid 2px black;
}
.sushidaText:before, .sushidaText:after{
  content: '';
  position: absolute;
  top: -10px;
  width: 2px;
  height: -webkit-calc(100% + 20px);
  height: calc(100% + 20px);
  background-color: black;
}
.sushidaText:before {left: 10px;}
.sushidaText:after {right: 10px;}
.sushidaText p {
  margin: 0;
  padding: 0;
  font-size: 40px;
  font-weight: bold;
}

</style>
