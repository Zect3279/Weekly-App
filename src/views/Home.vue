<template>
<div>

  <v-card>
    <v-toolbar
      flat
      color="blue-grey"
      dark
    >
      <v-toolbar-title>Morse Encoder</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-textarea
            name="input-7-1"
            filled
            label="Encode"
            auto-grow
            v-model="textEnc"
          ></v-textarea>
        </v-col>
        <v-col cols="12">
          <v-textarea
            name="input-7-1"
            filled
            auto-grow
            readonly
            v-model="textMor"
          ></v-textarea>
        </v-col>
      </v-row>

    </v-card-text>

  </v-card>
  <v-card>
    <v-toolbar
      flat
      color="blue-grey"
      dark
    >
      <v-toolbar-title>Morse Decoder</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-textarea
            name="input-7-1"
            filled
            label="Decode"
            auto-grow
            v-model="textDec"
          ></v-textarea>
        </v-col>
        <v-col cols="12">
          <v-textarea
            name="input-7-1"
            filled
            auto-grow
            readonly
            v-model="textVal"
          ></v-textarea>
        </v-col>
      </v-row>

    </v-card-text>

  </v-card>
</div>
</template>

<script>
import morse from 'morse'

export default {
  name: 'Home',
  computed: {
    //
  },
  mounted: function () {
    //
  },
  data: () => ({
    textEnc: null,
    textMor: null,
    textDec: null,
    textVal: null
  }),
  methods: {
    //
  },
  watch: {
    textEnc: function () {
      const text = this.textEnc
      this.textMor = morse.encode(text)
    },
    textDec: function () {
      const text = this.textDec
      this.textVal = morse.decode(text)
    }
  }
}
</script>

<style>
</style>
