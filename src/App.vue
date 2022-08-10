<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
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
    //
  }),
  methods: {
    //
  },
  watch: {
    //
  }
}
</script>

<style>

</style>
