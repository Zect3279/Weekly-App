<template>
  <v-container>
    <v-row class="text-center" justify="space-between">
      <v-col
        cols="12"
        sm="5"
      >
        <v-card
          class="mx-auto"
          max-width="400"
        >
          <v-list>
            <v-list-item-group
              v-model="selectItem"
              mandatory
              color="indigo"
            >
              <v-list-item
                v-for="(item, i) in itemList"
                :key="i"
                @click="Seelect(item.id)"
              >
                <v-list-item-icon>
                  <v-icon v-text="'mdi-note'" />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title v-text="item.name" />
                </v-list-item-content>
              </v-list-item>
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
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="5"
      >
        <div class="CounterNumber">
          <p v-text="countNumber" />
        </div>
        <v-row class="text-center" justify="center">
          <v-col
            cols="12"
            sm="8"
          >
            <v-btn
              block
              class="ma-1"
              color="info"
              @click="Coount"
            >
              Add
            </v-btn>
          </v-col>
          <v-col
            cols="12"
            sm="8"
          >
            <v-btn
              block
              class="ma-1"
              color="error"
              @click="Reeset"
            >
              Reset
            </v-btn>
          </v-col>
          <v-col
            cols="12"
            sm="8"
          >
            <v-btn
              block
              class="ma-1"
              color="cyan"
              @click="Saave"
            >
              Save
            </v-btn>
          </v-col>
          <v-col
            cols="12"
            sm="11"
          >
            <v-btn
              block
              class="ma-1"
              @click="$router.push('/')"
            >
              Go Back
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-dialog
        v-model="saveDialog"
        max-width="450"
      >
        <v-card>
          <v-card-title class="text-h5">
            Save current state
          </v-card-title>

          <v-card-text>
            Keep this Token till next time you use this.
          </v-card-text>
          <v-form>
            <v-container>
              <v-row justify="center">
                <v-col
                  cols="12"
                  sm="11"
                >
                  <v-text-field
                    v-model="token"
                    label="Token"
                    filled
                    readonly
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
              @click="saveDialog = false"
            >
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row justify="center">
      <v-dialog
        v-model="AddDialog"
        max-width="450"
      >
        <v-card>
          <v-card-title class="text-h5">
            Add New Counter
          </v-card-title>

          <v-card-text>
            Enter the Name of Counter
          </v-card-text>
          <v-form>
            <v-container>
              <v-row justify="center">
                <v-col
                  cols="12"
                  sm="11"
                >
                  <v-text-field
                    v-model="diaName"
                    label="Name"
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
import { mapState } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
const jwt = require('jsonwebtoken')

export default {
  name: 'Counter',
  computed: {
    // state から
    ...mapState(['itemList'])
  },
  mounted: function () {
    //
  },
  data: () => ({
    numList: [], // 全体
    saveDialog: false, // 状態保存用ダイアログ
    AddDialog: false,
    token: '', // JWTトークン
    diaName: '',
    selectItem: 0,
    idUsing: '',
    countNumber: 0
  }),
  methods: {
    Saave () {
      // JWT使って状態を保存
      const token = jwt.sign({
        itemList: this.itemList
      }, process.env.VUE_APP_JWT_secret)
      this.token = token
      this.saveDialog = true
    },
    Coount () {
      this.$store.commit('addNum', { id: this.idUsing })
      this.countNumber = this.itemList[this.idUsing].count
    },
    Seelect (id) {
      this.idUsing = id
      const keyList = Object.keys(this.itemList)
      this.selectItem = keyList.indexOf(id) + 1
      this.countNumber = this.itemList[id].count
    },
    Reeset () {
      this.$store.commit('resetNum', { id: this.idUsing })
      this.countNumber = this.itemList[this.idUsing].count
    },
    AddItem () {
      const id = uuidv4()
      this.$store.commit('addItem', { id, name: this.diaName })
      this.diaName = ''
      this.AddDialog = false
      this.Seelect(id)
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
