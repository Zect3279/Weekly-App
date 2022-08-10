<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="">
        <p
          style="font-size: 15vw;"
          v-text="cardText"
          class="overflow-x-auto"
        />
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialog"
      max-width="500px"
      persistent
    >
      <v-card>
        <v-card-text>
          <v-textarea
            label="File name"
            v-model="changeText"
            rows="1"
          />

          <small class="grey--text">* This doesn't actually save.</small>
        </v-card-text>

        <v-card-actions>
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
</template>

<script>
export default {
  name: 'Home',
  components: {
    //
  },
  data: () => ({
    dialog: true,
    cardText: '',
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
