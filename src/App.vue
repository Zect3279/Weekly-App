<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  <v-footer
    color="green darken-1"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        text
        rounded
        class="my-2"
        @click="jump(link)"
      >
        {{ link }}
      </v-btn>
    </v-row>
  </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    links: [
      'Home',
      'Count',
      'Load'
    ]
  }),
  methods: {
    jump (to) {
      switch (to) {
        case 'Home':
          this.$router.push('/')
          break
        case 'Count':
          this.$router.push('/count')
          break
        case 'Load':
          this.$router.push('/load')
          break
        default:
          break
      }
    }
  }
}
</script>
