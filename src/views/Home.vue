<template>
  <v-container>
    <v-row class="text-center" justify="space-between">
      <v-col
        cols="12"
        sm="4"
      >
        <v-card
          class="mx-auto"
          max-width="400"
        >
          <v-list>
            <v-virtual-scroll
              :height="winHeight"
              item-height="55"
              :items="formatList"
            >
              <template v-slot:default="{ item }">
                <v-list-item
                  :key="item.id"
                >
                  <v-list-item-icon>
                    <v-icon v-text="'mdi-currency-jpy'" />
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title v-text="item.name" />
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn icon @click="Deelete(item.id)">
                      <v-icon color="grey lighten-1">mdi-delete</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </template>
            </v-virtual-scroll>
            <v-divider />
            <v-list-item
              @click="AddDialog = true"
            >
              <v-list-item-icon>
                <v-icon v-text="'mdi-plus'"></v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="'Add'"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="7"
      >
        <div class="CounterNumber">
          <p v-text="countNumber" />
        </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-dialog
        v-model="AddDialog"
        max-width="450"
      >
        <v-card>
          <v-card-title class="text-h5">
            Add New Item
          </v-card-title>

          <v-card-text>
            Enter the Name and Price of Item
          </v-card-text>
          <v-form>
            <v-container>
              <v-row justify="center">
                <v-col
                  cols="12"
                  sm="5"
                >
                  <v-text-field
                    v-model="diaN"
                    label="Name"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="5"
                >
                  <v-text-field
                    v-model="diaP"
                    label="Price"
                    filled
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="AddItem"
            >
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'Home',
  computed: {
    //
  },
  mounted: function () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },
  data: () => ({
    AddDialog: false,
    countNumber: 0,
    winWidth: 0,
    winHeight: 0,
    diaN: '',
    diaP: '',
    checkList: {},
    formatList: []
  }),
  methods: {
    Deelete (id) {
      this.countNumber = 0
      delete this.checkList[id]
      if (!this.checkList) {
        this.AddDialog = true
      } else {
        //
      }
      this.foormat()
    },
    AddItem () {
      if (!this.diaN && !this.diaP) {
        return
      }
      const id = uuidv4()
      this.AddDialog = false
      this.checkList[id] = {
        id: id,
        name: this.diaN,
        count: Number(this.diaP)
      }
      this.foormat()
      this.diaN = ''
      this.diaP = ''
    },
    foormat () {
      const before = this.checkList
      const after = []
      for (const key in before) {
        if (Object.hasOwnProperty.call(before, key)) {
          const element = before[key]
          after.push(element)
        }
      }
      this.formatList = after
    },
    handleResize: function () {
      this.winWidth = window.innerWidth
      const height = (window.innerHeight - 250)
      if ((this.formatList.length * 55) >= height) {
        this.winHeight = height
      } else {
        this.winHeight = (this.formatList.length * 55) + 5
      }
    }
  },
  watch: {
    formatList: function () {
      this.countNumber = 0
      for (const c of this.formatList) {
        this.countNumber += Number(c.count)
      }
      this.handleResize()
    }
  }
}
</script>

<style>
.CounterNumber{
  margin:2em 0;
  position: relative;
  padding: 0.5em 1.5em;
  border-top: solid 2px black;
  border-bottom: solid 2px black;
}
.CounterNumber:before, .CounterNumber:after{
  content: '';
  position: absolute;
  top: -10px;
  width: 2px;
  height: -webkit-calc(100% + 20px);
  height: calc(100% + 20px);
  background-color: black;
}
.CounterNumber:before {left: 10px;}
.CounterNumber:after {right: 10px;}
.CounterNumber p {
  margin: 0;
  padding: 0;
  font-size: 100px;
  font-weight: bold;
}

</style>
