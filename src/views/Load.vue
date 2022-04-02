<template>
<v-container>
  <v-row class="text-center" justify="center">
    <v-col cols="12">
      <p style="font-size: 100px;font-weight: bold;">Load</p>
    </v-col>
  </v-row>
  <v-row class="text-center" justify="center">
    <v-col
      cols="12"
      sm="8"
    >
      <v-text-field
        outlined
        v-model="token"
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
        color="green darken-2"
        dark
        @click="loadToken(); loader = 'loading'"
      >
        Load
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
</v-container>
</template>

<script>
const jwt = require('jsonwebtoken')

export default {
  name: 'Load',

  data: () => ({
    loader: null, // loader
    loading: false, // loader
    token: '',
    errorCameUp: false
  }),
  methods: {
    loadToken () {
      const decoded = jwt.verify(this.token, process.env.VUE_APP_JWT_secret)
      try {
        this.$store.commit('changeList', { itemList: decoded.itemList })
        console.log(decoded.itemList)
        this.$router.push('/count')
      } catch (error) {
        this.errorCameUp = true
        console.error(error)
      }
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
