<template>
  <div>
    <v-app>
      <v-content>
        <v-container>
          <v-row>
            <v-col class="text-left">
              <h2>今日の予約</h2>
            </v-col>
          </v-row>

          <!-- 予約なし -->
          <div v-if="reservationsNow.message">
            <v-row>
              <v-col>
                <h4>{{ reservationsNow.message }}</h4>
              </v-col>
            </v-row>
          </div>

          <!-- 予約情報 -->
          <div v-else>
            <v-row>
              <v-col cols="6" sm="3">
                <v-text-field
                  label="担当スタッフ"
                  :value= "reservationsNow.staff"
                  prepend-icon="mdi-account-arrow-right"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="6" sm="3">
                <v-text-field
                  label="コース"
                  :value= "reservationsNow.cource"
                  prepend-icon="mdi-file-outline"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="4" sm="2">
                <v-text-field
                  label="予約時間"
                  :value= "reservationsNow.reservation_date"
                  prepend-icon="mdi-calendar-range"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="4" sm="2">
                <v-text-field
                  label="所要時間(分)"
                  :value= "reservationsNow.time"
                  prepend-icon="mdi-clock-outline"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="4" sm="2">
                <v-text-field
                  label="料金(円)"
                  :value= "reservationsNow.price"
                  prepend-icon="mdi-cash"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
          </div>

          <!-- 予約検索 -->
          <v-row>
            <v-col class="text-left">
              <h2>予約履歴</h2>
            </v-col>
          </v-row>

          <!-- 検索結果 -->
          <v-row >
            <v-col cols="6" sm="12">
              <v-menu
              ref="menu"
              v-model="dateModal"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="time"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
                <template v-slot:activator="{ on }">
                  <v-text-field
                      v-model="date"
                      label="日付"
                      prepend-icon="mdi-calendar-range"
                      readonly
                      v-on="on"
                    ></v-text-field>
                </template>
                <v-date-picker
                  v-if="dateModal"
                  v-model="date"
                  full-width
                  @change="dateSearch"
                  @click:minute="$refs.menu.save(time)"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>

          <!-- 予約データなし -->
          <div v-if="reservationsHis.message">
            <v-row>
              <v-col>
                <h4>{{ reservationsHis.message }}</h4>
              </v-col>
            </v-row>
          </div>

          <!-- 予約日検索結果 -->
          <div v-else>
            <v-row>
              <v-col cols="6" sm="3">
                <v-text-field
                  label="担当スタッフ"
                  :value= "reservationsHis.staff"
                  prepend-icon="mdi-account-arrow-right"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="6" sm="3">
                <v-text-field
                  label="コース"
                  :value= "reservationsHis.cource"
                  prepend-icon="mdi-file-outline"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="4" sm="2">
                <v-text-field
                  label="予約時間"
                  :value= "reservationsHis.reservation_date"
                  prepend-icon="mdi-calendar-range"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="4" sm="2">
                <v-text-field
                  label="所要時間(分)"
                  :value= "reservationsHis.time"
                  prepend-icon="mdi-clock-outline"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="4" sm="2">
                <v-text-field
                  label="料金(円)"
                  :value= "reservationsHis.price"
                  prepend-icon="mdi-cash"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        reservationsNow: [],
        reservationsHis: [],
        date: "",
        time: "",
        dateModal: false,
      }
    },
    mounted() {
      axios.get('http://localhost:3000/api/v1/reservation-today',{
        params: {user_id: this.$store.state.id}
      })
      .then(res => {
        console.log(res.data.data)
        this.reservationsNow = res.data.reservationNow
      })
    },
    methods: {
      dateSearch() {
        axios.post('http://localhost:3000/api/v1/reservation-search', 
          {
            date: this.date,
            user_id: this.$store.state.id
        })
        .then(res => {
          console.log(res)
          this.reservationsHis = res.data.reservation_his
        })
      }
    }
  }
</script>