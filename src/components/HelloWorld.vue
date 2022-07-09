<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mt-16 mb-3">
          Sushida
        </h1>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <v-row justify="center" class="my-5">
          <v-btn
            dark
            min-width="400px"
            color="blue darken-1"
            @click="startBingo"
          >
            Start
          </v-btn>
        </v-row>
        <v-row justify="center" class="my-5">
          <v-btn
            dark
            min-width="400px"
            color="blue darken-1"
            @click="loadBingo"
          >
            Load & Edit
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',

  data: () => ({
    //
  }),
  mounted: function () {
    //
  },
  methods: {
    startBingo () {
      // console.log('start')
      this.$router.push('/sushida')
    },
    loadBingo () {
      // console.log('load')
      this.$router.push('/load')
    }
  }
}
</script>
