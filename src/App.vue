<template>
  <v-app>
    <v-main>
  <v-container>
    <v-card
      class="d-flex justify-center"
      flat
    >
      <p
        style="font-size: 12vw;text-align: center;white-space: pre-wrap;"
        v-text="cardText"
      />
    </v-card>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="12"
              >
              <v-textarea
                label="Message"
                v-model="changeText"
                rows="1"
                auto-grow
              />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions class="mt-n10">
          <v-spacer></v-spacer>

          <v-btn
            text
            color="primary"
            @click="Chhange"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
    </v-main>
        <v-btn
          color="primary"
          outlined
          fixed
          fab
          bottom
          right
          @click="dialog = !dialog"
        >
          <v-icon>mdi-reload</v-icon>
        </v-btn>
  </v-app>
</template>

<script>
export default {
  name: 'Home',
  components: {
    //
  },
  data: () => ({
    dialog: true,
    cardText: 'hello world',
    changeText: ''
  }),
  mounted: function () {
    //
  },
  methods: {
    Chhange () {
      if (!this.changeText) {
        return
      }
      this.cardText = this.changeText
      this.dialog = false
    }
  }
}
</script>
