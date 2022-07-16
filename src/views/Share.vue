<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <div class="shareText">
          <p>YouTubeのリンクを交換</p>
        </div>
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
          label="YouTubeリンクをここに入力"
          :disabled="onShare"
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
          @click="Shhare"
          :disabled="onShare"
        >
          Share
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
export default {
  name: 'Share',
  computed: {
    // state から
    // ...mapState(['quList'])
  },
  mounted: function () {
    //
  },
  data: () => ({
    answerMSG: '',
    onShare: false
  }),
  methods: {
    Shhare () {
      this.onShare = true
      const link = this.answerMSG
      if (link.startsWith('https://youtu.be/')) {
        const link2 = link.split('?')[0]
        console.log(link2)
        this.$store.commit('putLink', { link: link2 })
        this.$router.push('/get')
      } else if (link.startsWith('https://www.youtube.com/watch?v=')) {
        const link2 = link.split('?')[1].split('&')
        let link3 = ''
        for (const l of link2) {
          if (l.startsWith('v=')) {
            link3 = 'https://youtu.be/' + l.slice(2)
          }
        }
        console.log(link3)
        this.$store.commit('putLink', { link: link3 })
        this.$router.push('/get')
      }
      this.onShare = false
    }
  },
  watch: {
    //
  }
}
</script>

<style>

.shareText{
  margin:2em 0;
  position: relative;
  padding: 0.5em 1.5em;
  border-top: solid 2px black;
  border-bottom: solid 2px black;
}
.shareText:before, .shareText:after{
  content: '';
  position: absolute;
  top: -10px;
  width: 2px;
  height: -webkit-calc(100% + 20px);
  height: calc(100% + 20px);
  background-color: black;
}
.shareText:before {left: 10px;}
.shareText:after {right: 10px;}
.shareText p {
  margin: 0;
  padding: 0;
  font-size: 40px;
  font-weight: bold;
}

</style>
