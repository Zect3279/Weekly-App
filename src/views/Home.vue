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
      <v-hover
        v-slot="{ hover }"
      >
      <v-card
        class="mx-auto my-n3"
        outlined
        :elevation="hover ? 4 : 1"
        @click="juump(w.link)"
      >
        <!-- <v-card-title v-text="w.name" />
        <v-card-text v-text="w.des" /> -->
        <v-list-item three-line>
          <v-list-item-content>
            <div class="text-overline mb-1" v-text="w.index + '週目'" />
            <v-list-item-title
              class="text-h5 mb-1 font-weight-bold"
              :class="{ 'color-green': hover }"
              v-text="w.name"
            />
            <v-list-item-subtitle class="my-2 font-weight-medium" v-text="w.des" />
          </v-list-item-content>
        </v-list-item>
      </v-card>
      </v-hover>
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
    juump (url) {
      if (url.startswith('https://')) {
        window.open(url, '_blank')
      } else {
        window.open(`https://${url}.zscode.net`, '_blank')
      }
    }
  }
}
</script>

<style>

h1 {
  margin: 30px auto;
  color: #6a6a6a;
  font-weight: lighter;
}
h2 {
  font-weight: normal;
  color: #444;
  margin-bottom: 15px;
}
p {
  font-weight: lighter;
  color: #000;
  margin-bottom: 25px;
}
.color-green {
  color: #4CAF50;
}
</style>
