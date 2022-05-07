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
          <v-toolbar-title>Chip - Tap</v-toolbar-title>
        </v-toolbar>

        <v-card-text class="text-center">
          <v-chip
            v-for="n in numList"
            v-bind:key="n"
            class="ma-2 chosenList pa-4"
            :color="plessed.includes(n) ? 'grey lighten-1' : 'light-blue accent-2'"
            @click="puush(n)"
            :disabled="plessed.includes(n)"
          >
            {{ n }}
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
        Chip Tap
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
    numList: [],
    plessed: []
  }),
  methods: {
    sttart (count) {
      console.log(`start: ${count}`)
      this.makeNumList(count)
      this.onGame = true
    },
    makeNumList (count) {
      this.plessed = []
      const nums = [...Array(count).keys()].map(i => ++i)
      this.numList = nums
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    },
    puush (num) {
      if (!this.plessed.length && num === 1) {
        this.plessed.push(num)
        return
      }
      const sorts = this.sortList(this.plessed)
      const nextN = sorts[0] + 1
      if (num !== nextN) {
        return
      }
      this.plessed.push(num)
    },
    reeset () {
      this.numList = []
      this.plessed = []
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
    }
  },
  watch: {
    plessed () {
      if (this.hard) {
        const nums = this.numList
        this.numList = nums
          .map(value => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value)
      }
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
