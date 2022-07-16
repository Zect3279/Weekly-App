<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <div class="sushidaText">
          <p>リンクを取得しました</p>
        </div>
      </v-col>
    </v-row>
    <v-row class="text-center" justify="center">
      <v-col
        cols="12"
        sm="8"
      >
        <v-text-field
          v-model="getlink"
          solo
          label="YouTube link"
          readonly
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
          color="green"
          dark
          @click="Oppen"
        >
          Open on YouTube
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
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { getDatabase, ref, child, get, set } from 'firebase/database'

export default {
  name: 'GetLink',
  computed: {
    // state から
    ...mapState(['linkHolder'])
  },
  mounted: function () {
    // 接続
    const db = getDatabase()
    const dbRef = ref(db)
    // データ取得
    get(child(dbRef, 'youtube')).then((snapshot) => {
      if (snapshot.exists()) {
        this.getlink = snapshot.val()
        console.log(this.getlink)
      } else {
        console.log('No data available')
      }
    }).catch((error) => {
      console.error(error)
    }).then((a) => {
      set(ref(db, 'youtube'), this.linkHolder).catch((error) => {
        console.error(error)
      })
    })
  },
  data: () => ({
    getlink: ''
  }),
  methods: {
    Oppen () {
      window.open(this.getlink, '_blank')
    }
  },
  watch: {
    //
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
