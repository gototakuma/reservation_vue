<template>
  <div>
    <v-app>
      <v-container>
        <h1>予約</h1>

        <!-- エラーメッセージ -->
        <p class="ex_message">{{ ex_message }}</p>
        <ul>
          <li v-for="msg in message" :key="msg">
            {{msg}}
          </li>
        </ul>

        <!-- 担当美容師選択 -->
        <v-row>
          <v-col sm="11">
            <v-select :items="staffs" label="担当美容師" v-model="staff" :rules="rules" prepend-icon="mdi-account-arrow-right"></v-select>
          </v-col>
        </v-row>

        <!-- 時間選択 -->
        <v-row>
          <!-- 日付 -->
          <v-col>
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
                  readonly
                  v-on="on"
                  prepend-icon="mdi-calendar-range"
                  :rules="rules"
                ></v-text-field>
              </template>
              <v-date-picker
                v-if="dateModal"
                v-model="date"
                full-width
                @click:minute="$refs.menu.save(time)"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <!-- 時間 -->
          <v-col>
            <v-dialog
              ref="dialog"
              v-model="timeModal"
              :return-value.sync="time"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="time"
                  label="時間"
                  readonly
                  v-on="on"
                  prepend-icon="mdi-clock-outline"
                  :rules="rules"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="timeModal"
                v-model="time"
                :ampm-in-title="true"
                full-width
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="timeModal = false">キャンセル</v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(time)">決定</v-btn>
              </v-time-picker>
            </v-dialog>
          </v-col>
        </v-row>

        <!-- コース選択 -->
        <v-row>
          <v-col>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">選択</th>
                    <th class="text-left">種類</th>
                    <th class="text-left">時間(分)</th>
                    <th class="text-left">値段(円)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="cource in cources"
                    :key="cource.id"
                  >
                    <td>
                      <v-checkbox
                        v-model="order"
                        :value="cource"
                      ></v-checkbox>
                    </td>
                    <td>{{ cource.cource }}</td>
                    <td>{{ cource.time }}</td>
                    <td>{{ cource.price }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>

        <!-- 合計金額 -->
        <v-row>
          <v-col class="text-center">
            <v-btn
              color="primary"
              dark
              @click="submitReservation"
            ><v-icon left>mdi-check-bold</v-icon>
            予約</v-btn>
          </v-col>
        </v-row>

      </v-container>
    </v-app>
  </div>
</template>

<script scoped>
  import axios from 'axios'

  export default {
    data() {
      return {
        staffs: [],
        cources: [],
        staff: "",
        date: "",
        time: "",
        cource: "",
        order: [],
        dateModal: false,
        timeModal: false,
        message: [],
        ex_message: "",
        rules: [
          value => !!value || '選択してください。',
        ],
      }
    },
    mounted() {
      axios.get('http://localhost:3000/api/v1/staff')
      .then(res => {this.staffs = res.data})
      .catch( () => {this.ex_message = "システムエラーが発生しました。"})
      axios.get('http://localhost:3000/api/v1/cource')
      .then(res => {this.cources = res.data})
      .catch( () => {this.ex_message = "システムエラーが発生しました。"})
    },
    methods: {
      submitReservation() {
        axios.post('http://localhost:3000/api/v1/reservation-create',
        {
          staff: this.staff,
          date: this.date,
          time: this.time,
          orders: this.order,
          user_id: this.$store.state.id
        })
        .then(res => {
          this.message = res.data.message
          if (res.data.status == "success") {
            this.$store.state.value = true
            this.$store.state.flashType = "success"
            this.$store.state.message = "予約受付完了しました。"
            this.$router.push('/home')
          }
        })
        .catch( () => {
          this.ex_message = "システムエラーが発生しました。"
        })
      }
    }
  }
</script>

<style scoped>
  ul {
    list-style: none;
    color: red;
  }
  .ex_message {
    color: red;
  }
</style>
