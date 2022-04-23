<template>
  <v-card>
    <v-toolbar
      flat
      color="blue-grey"
      dark
    >
      <v-toolbar-title>Base Converter - 進数変換機</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <v-row>
        <v-col cols="11">
          <v-text-field
            filled
            label="2進数"
            v-model="two"
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-btn
            color="success"
            x-large
            @click="conv(2)"
          >
            変換
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="11">
          <v-text-field
            filled
            label="5進数"
            v-model="five"
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-btn
            color="success"
            x-large
            @click="conv(5)"
          >
            変換
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="11">
          <v-text-field
            filled
            label="8進数"
            v-model="eight"
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-btn
            color="success"
            x-large
            @click="conv(8)"
          >
            変換
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="11">
          <v-text-field
            filled
            label="10進数"
            v-model="ten"
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-btn
            color="success"
            x-large
            @click="conv(10)"
          >
            変換
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="11">
          <v-text-field
            filled
            label="16進数"
            v-model="six"
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-btn
            color="success"
            x-large
            @click="conv(16)"
          >
            変換
          </v-btn>
        </v-col>
      </v-row>

    </v-card-text>

  </v-card>
</template>

<script>
// import { mapState } from 'vuex'
// const jwt = require('jsonwebtoken')

export default {
  name: 'Home',
  computed: {
    //
  },
  mounted: function () {
    //
  },
  data: () => ({
    two: null,
    five: null,
    eight: null,
    ten: null,
    six: null
  }),
  methods: {
    conv (num) {
      switch (num) {
        case 2: {
          const pattern = /^[0-1]*$/
          if (!pattern.test(Number(this.two))) { break }
          const base = parseInt(Number(this.two), 2)
          this.five = base.toString(5)
          this.eight = base.toString(8)
          this.ten = base.toString(10)
          this.six = base.toString(16)
          break
        }
        case 5: {
          const pattern = /^[0-4]*$/
          if (!pattern.test(Number(this.five))) { break }
          const base = parseInt(Number(this.five), 5)
          this.two = base.toString(2)
          this.eight = base.toString(8)
          this.ten = base.toString(10)
          this.six = base.toString(16)
          break
        }
        case 8: {
          const pattern = /^[0-7]*$/
          if (!pattern.test(Number(this.eight))) { break }
          const base = parseInt(Number(this.eight), 8)
          this.two = base.toString(2)
          this.five = base.toString(5)
          this.ten = base.toString(10)
          this.six = base.toString(16)
          break
        }
        case 10: {
          const pattern = /^[0-9]*$/
          if (!pattern.test(Number(this.ten))) { break }
          const base = parseInt(Number(this.ten), 10)
          this.two = base.toString(2)
          this.five = base.toString(5)
          this.eight = base.toString(8)
          this.six = base.toString(16)
          break
        }
        case 16: {
          const pattern = /^[0-9a-fA-f]*$/
          if (!pattern.test(this.six)) { break }
          const base = parseInt(this.six, 16)
          this.two = base.toString(2)
          this.five = base.toString(5)
          this.eight = base.toString(8)
          this.ten = base.toString(10)
          break
        }
        default:
          break
      }
    }
  }
}
</script>

<style>
</style>
