<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  <v-footer
    color="primary lighten-1"
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
      'Clock',
      'Stop Watch'
    ]
  }),
  methods: {
    jump (to) {
      switch (to) {
        case 'Home':
          this.$router.push('/')
          break
        case 'Clock':
          this.$router.push('/clock')
          break
        case 'Stop Watch':
          this.$router.push('/watch')
          break
        default:
          break
      }
    }
  }
}
</script>
