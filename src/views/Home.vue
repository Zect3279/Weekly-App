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
          <v-toolbar-title>Chip - Tap 2</v-toolbar-title>
        </v-toolbar>

        <v-card-text class="text-center">
          <v-chip
            v-for="n in numList"
            v-bind:key="n"
            class="ma-2 chosenList pa-4"
            :color="active.includes(n) ? hard ? 'green accent-2' : 'light-blue accent-2' : 'grey lighten-1'"
            @click="puush(n)"
          >
            {{ n }}
            <!-- <v-icon v-if="plessed.includes(n)">
              mdi-minus
            </v-icon>
            <v-icon v-else>
              mdi-plus
            </v-icon> -->
          </v-chip>
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
        Chip Tap 2
      </h1>
    </v-col>

    <v-col
      class="mb-5"
      cols="12"
    >
      <h2 class="font-weight-bold mt-8 mb-3" style="color:#304FFE">
        イージ モード
      </h2>
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

    <v-col
      class="mb-5"
      cols="12"
    >
      <h2 class="font-weight-bold mt-8 mb-3" style="color:#00C853">
        ハード モード
      </h2>
      <v-btn
        class="ma-4"
        min-width="80px"
        dark
        color="green darken-1"
        @click="sttart(10);hard=true"
      >
        10コ
      </v-btn>
      <v-btn
        class="ma-4"
        min-width="80px"
        dark
        color="green darken-1"
        @click="sttart(30);hard=true"
      >
        30コ
      </v-btn>
      <v-btn
        class="ma-4"
        min-width="80px"
        dark
        color="green darken-1"
        @click="sttart(50);hard=true"
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
          GAME OVER
        </v-card-title>

        <v-card-text>
          またチャレンジしてね
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
    numList: [],
    active: [],
    acctivator: null
  }),
  methods: {
    sttart (count) {
      console.log(`start: ${count}`)
      this.makeNumList(count)
      this.onGame = true
      this.acctivator = setInterval(this.acctiveChip, 700)
    },
    makeNumList (count) {
      this.active = []
      const nums = [...Array(count).keys()].map(i => ++i)
      this.numList = nums
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    },
    puush (num) {
      if (this.active.includes(num)) {
        const newAct = this.active.filter(n => n !== num)
        this.active = newAct
      }
    },
    reeset () {
      this.numList = []
      this.active = []
    },
    sortList (list) {
      const back = list.sort(function (first, second) {
        if (first > second) {
          return -1
        } else if (first < second) {
          return 1
        } else {
          return 0
        }
      })
      return back
    },
    acctiveChip () {
      const diff = this.numList.filter(i => this.active.indexOf(i) === -1)
      const pusher = diff
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
      this.active.push(pusher[0])
    }
  },
  watch: {
    active () {
      if (this.hard) {
        const nums = this.numList
        this.numList = nums
          .map(value => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value)
      }
      if (this.numList.length === this.active.length) {
        this.dialog = true
        clearInterval(this.acctivator)
      }
    }
  }
}
</script>

<style>
</style>
