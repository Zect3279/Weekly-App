<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mt-16 mb-3">
          WAC
        </h1>
      </v-col>
    </v-row>
    <v-row justify="center" class="my-5">
      <v-col
        class="mb-5"
        cols="12"
        xs="12"
        sm="6"
        md="3"
        lg="3"
        xl="2"
        v-for="w in wacs"
        :key="w.index"
      >
      <v-card>
        <v-card-title v-text="w.name" />
        <v-card-text v-text="w.des" />
      </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import projects from '@/common/projects'

export default {
  name: 'Home',
  components: {
    //
  },
  data: () => ({
    wacs: projects.wac
  }),
  mounted: function () {
    //
  },
  methods: {
    //
  }
}
</script>
