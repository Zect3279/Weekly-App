<template>
  <v-card>
    <v-toolbar
      flat
      color="blue-grey"
      dark
    >
      <v-toolbar-title>メモ帳</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-textarea
            name="input-7-1"
            filled
            label="Label"
            auto-grow
            v-model="textVal"
          ></v-textarea>
        </v-col>
        <v-col
          cols="12"
          xs="10"
          sm="8"
          md="4"
          lg="3"
          xl="2"
        >
          <v-card elevation="1">

            <v-list subheader>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>文字数：{{ textCount }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider />

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>スペース/改行あり：{{ textRCount }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider />

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>英単語数：{{ textECount }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>

        </v-col>
      </v-row>

    </v-card-text>

  </v-card>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    //
  },
  mounted: function () {
    //
  },
  data: () => ({
    textVal: null,
    textCount: 0,
    textRCount: 0,
    textECount: 0
  }),
  methods: {
    //
  },
  watch: {
    textVal: function () {
      const text = this.textVal
      if (!text) {
        this.textCount = 0
        this.textRCount = 0
        this.textECount = 0
        return
      }
      this.textCount = text.replace(/\r?\n/g, '').replace(/\s+/g, '').length
      this.textRCount = text.length
      this.textECount = text.match(/\S+/g).length
    }
  }
}
</script>

<style>
</style>
