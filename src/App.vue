<template>
  <v-app>
    <v-app-bar
      color="teal darken-1"
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>WAC</v-toolbar-title>

    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      floating
      clipped
    >
      <v-list
      >
        <v-list-item-group
        >
          <v-list-item>
            <v-list-item-title>Comming Soon...</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    drawer: false
  })
}
</script>
