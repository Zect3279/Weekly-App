<template>
  <v-container>
    <v-row>
      <v-col
        v-for="n in 24"
        :key="n"
        cols="4"
      >
        <v-card
          elevation="2"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">
                000
              </div>
              <v-list-item-title class="text-h5 mb-1">
                Project Title
              </v-list-item-title>
              <v-list-item-subtitle>Description</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="80"
              color="grey"
            ></v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn
              outlined
              rounded
              text
            >
              Button
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',

  components: {
    // HelloWorld
  }
}
</script>
