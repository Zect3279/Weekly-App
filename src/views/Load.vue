<template>
<v-container>
  <v-row class="text-center" justify="center">
    <v-col cols="12">
      <p style="font-size: 60px;font-weight: bold;">Load & Edit</p>
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
      sm="4"
    >
      <v-btn
        block
        class="ma-1"
        :loading="loading"
        :disabled="loading"
        color="green accent-3"
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
  <v-row justify="center">
    <v-col cols="10">

      <v-card
        max-width="600"
        class="mx-auto"
      >
      <v-list
        subheader
        two-line
      >
        <v-list-item
          v-for="(q, index) in questions"
          :key="index"
        >
          <v-list-item-avatar>
            <v-icon
              class="grey lighten-1"
              dark
            >
              mdi-help
            </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="q"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon @click="Deelete(index)">
              <v-icon color="grey lighten-1">mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>

        <v-divider />

        <v-list-item>
          <v-list-item-avatar>
            <v-btn icon @click="Neew">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Add Item</v-list-item-title>
          </v-list-item-content>

        </v-list-item>

      </v-list>
      </v-card>
    </v-col>
  </v-row>
  <v-row class="text-center" justify="center">
    <v-col
      cols="12"
      sm="7"
    >
      <v-btn
        block
        class="ma-1"
        color="info"
        @click="Sttart"
      >
        Start
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
        v-model="addDialog"
        max-width="450"
      >
        <v-card>
          <v-card-title class="text-h5">
            Add New Text
          </v-card-title>
          <v-card-subtitle class="text-center mt-2 mb-n5">
            漢字非対応!!!
          </v-card-subtitle>
          <v-form>
            <v-container>
              <v-row justify="center">
                <v-col
                  cols="12"
                  sm="11"
                >
                  <v-text-field
                    v-model="forQuestion"
                    label="New Question"
                    filled
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
              @click="addDialog = false;Addd()"
            >
              Add
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row justify="center">
      <v-dialog
        v-model="nullDialog"
        max-width="450"
        persistent
      >
        <v-card>
          <v-card-title class="text-h5">
            Question list is Empty
          </v-card-title>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="nullDialog = false"
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
  name: 'Load',
  computed: {
    // state から
    ...mapState(['quList'])
  },
  mounted: function () {
    this.questions = this.quList
  },
  data: () => ({
    loader: null, // loader
    loading: false, // loader
    token: '',
    errorCameUp: false,
    questions: [
      'Hello World!'
    ],
    forQuestion: '',
    addDialog: false,
    nullDialog: false
  }),
  methods: {
    loadToken () {
      const decoded = jwt.verify(this.token, process.env.VUE_APP_JWT_secret)
      console.log(decoded)
      try {
        this.questions = decoded.qus
      } catch (error) {
        this.errorCameUp = true
        console.error(error)
      }
      this.token = ''
    },
    Neew () {
      this.addDialog = true
    },
    Addd () {
      const newqu = this.forQuestion
      this.forQuestion = ''
      console.log({ newqu })
      if (!newqu) { return }
      this.questions.push(newqu)
    },
    Deelete (index) {
      this.questions.splice(index, 1)
    },
    Sttart () {
      if (!this.questions.length) {
        this.nullDialog = true
        return
      }
      this.$store.commit('putQU', { qus: this.questions })
      this.$router.push('/sushida')
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
