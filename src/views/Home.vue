<template>
<v-container fluid>
  <v-row
    v-if="onGame"
    justify="space-around"
    align="center"
  >
    <v-col
      cols="8"
    >

      <v-card>
        <v-toolbar
          flat
          color="blue-grey"
          dark
        >
          <v-toolbar-title>Base Game</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <p class="mt-5 text-center font-weight-bold display-1" v-text="`${base}進数`" />
          <p class="mt-5 text-center font-weight-bold display-3" v-text="question" />
        </v-card-text>

        <v-card-text class="text-center">
          <v-chip
            v-for="n in chipList"
            v-bind:key="n"
            class="ma-2 chosenList pa-4"
            :color="plessed.includes(n) ? 'grey lighten-1' : hard ? 'green accent-2' : 'light-blue accent-2'"
            @click="puush(n)"
            :disabled="plessed.includes(n)"
            v-text="n"
          />
        </v-card-text>

      </v-card>
    </v-col>
  </v-row>
  <v-row
    class="text-center"
    v-else
  >
    <v-col class="mb-4">
      <h1 class="display-2 font-weight-bold mt-16 mb-3">
        Base Game
      </h1>
    </v-col>

    <v-col
      class="mb-5"
      cols="12"
    >
      <v-btn
        class="ma-4"
        min-width="80px"
        dark
        color="blue darken-1"
        @click="sttart(10)"
      >
        10コ
      </v-btn>
      <v-btn
        class="ma-4"
        min-width="80px"
        dark
        color="blue darken-1"
        @click="sttart(30)"
      >
        30コ
      </v-btn>
      <v-btn
        class="ma-4"
        min-width="80px"
        dark
        color="blue darken-1"
        @click="sttart(50)"
      >
        50コ
      </v-btn>
    </v-col>

  </v-row>
  <v-row>
    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          クリア！
        </v-card-title>

        <v-card-text>
          あめでとう！
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="dialog=false; onGame=false"
          >
            CLOSE
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</v-container>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    //
  },
  mounted: function () {
    //
  },
  data: () => ({
    onGame: false,
    hard: false,
    dialog: false,
    chipList: [],
    numList: [],
    plessed: [],
    base: 0,
    question: 0,
    answer: 0
  }),
  methods: {
    sttart (count) {
      console.log(`start: ${count}`)
      this.makeNumList(count)
      // this.makeNumList(3)
      this.setQA()
      this.onGame = true
    },
    setQA () {
      const diff = this.numList.filter(n => this.plessed.indexOf(n) === -1)
      const raw = diff[Math.floor(Math.random() * diff.length)]
      const rawList = raw.split(' ')
      this.answer = Number(rawList[0])
      this.base = Number(rawList[1])
      const base = parseInt(this.answer, 10)
      this.question = base.toString(this.base)
      // console.log(this.answer)
    },
    makeNumList (count) {
      this.plessed = []
      const nums = [...Array(count).keys()].map(i => ++i)
      var quList = []
      for (const n of nums) {
        quList.push(`${n} 2`)
        quList.push(`${n} 5`)
        quList.push(`${n} 8`)
        quList.push(`${n} 16`)
      }
      this.chipList = nums
      this.numList = quList
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    },
    puush (num) {
      // 正解判定
      if (num !== this.answer) { return }
      this.plessed.push(`${num} ${this.base}`)
      console.log(`⭕: ${this.answer}は${this.base}進数で${this.question}`)
      const diff = this.numList.filter(n => this.plessed.indexOf(n) === -1)
      if (!diff.length) { return }
      this.setQA()
    },
    reeset () {
      this.numList = []
      this.plessed = []
      this.chipList = []
      this.base = 0
      this.question = 0
      this.answer = 0
    }
  },
  watch: {
    plessed () {
      const diff = this.numList.filter(n => this.plessed.indexOf(n) === -1)
      if (diff.length) {
        return
      }
      this.dialog = true
    }
  }
}
</script>

<style>
</style>
