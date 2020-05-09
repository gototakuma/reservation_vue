<template>
  <div>
    <v-app id="inspire">
        <v-container>
          <h1>スタッフ一覧</h1>

          <!-- ユーザー一覧表示テーブル -->
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">名前</th>
                  <th class="text-left">年齢</th>
                  <th class="text-left">性別</th>
                  <th class="text-left">説明</th>
                  <th class="text-left">編集</th>
                  <th class="text-left">削除</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for= "staff in staffs_data" :key= "staff.id">
                  <td>{{ staff.name }}</td>
                  <td>{{ staff.age }}</td>
                  <td>{{ staff.sex }}</td>
                  <td>{{ staff.description }}</td>
                  <td>
                    <v-btn
                      color="primary"
                      fab x-small dark
                      @click.stop="diaStaff(staff)"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>

                    <v-dialog
                      v-model="dialog"
                      v-if="staffData"
                      width="500"
                    >
                      <v-card>
                        <v-card-title
                          class="headline grey lighten-2"
                          primary-title
                        >
                          {{staffData.name}}
                        </v-card-title>

                        <v-card-text>
                          <!-- エラーメッセージ -->
                          <p class="ex_message">{{ ex_message }}</p>
                          <ul>
                            <li v-for="msg in message" :key="msg">
                              {{msg}}
                            </li>
                          </ul>

                          <v-text-field 
                            v-model="name" 
                            label="名前"
                            prepend-icon="mdi-account-arrow-right"
                          ></v-text-field>

                          <v-text-field
                            tyep="number"
                            v-model="age"
                            label="年齢"
                            hint="0~100歳の間で記載してください。"
                            prepend-icon="mdi-chart-donut"
                          ></v-text-field>

                          <v-select
                            :items="sexData"
                            label="性別"
                            v-model="sex"
                            prepend-icon="mdi-account-group"
                          ></v-select>

                          <v-text-field 
                            v-model="description" 
                            label="説明"
                            prepend-icon="mdi-clipboard-text"
                          ></v-text-field>

                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="primary"
                            text
                            @click="dialogCancel"
                          >
                            キャンセル
                          </v-btn>
                          <v-btn
                            color="primary"
                            @click="staffEdit(staffData.id)"
                          >
                            編集
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </td>
                  <td>
                    <v-btn
                      color="error"
                      fab x-small dark
                      @click="staffDelete(staff.id)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          
        </v-container>
    </v-app>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        staffs_data: [],
        staffData: "",
        id: "",
        name: "",
        sexData: ["男","女","その他"],
        sex: "",
        age: "",
        description: "",
        dialog: false,
        ex_message: "",
        message: [],
        value: this.$store.state.value,
        flashMessage: this.$store.state.message,
        flashType: this.$store.state.flashType
      }
    },
    methods: {
      diaStaff(staff) {
        this.staffData = staff
        this.dialog = true
      },
      dialogCancel() {
        this.name = ""
        this.age = ""
        this.sex = ""
        this.description = ""
        this.dialog = false
      },
      staffDelete(staff) {
        axios.post('http://localhost:3000/api/v1/staff-delete',{
          id: staff
        })
        .then(res => {
          this.message = res.data.message
          if (res.data.status == "success") {
            this.$store.state.value = true
            this.$store.state.flashType = "error"
            this.$store.state.message = "スタッフを削除しました。"
            this.$router.push('/home')
          }
        })
        .catch( () => {
          this.ex_message = "システムエラーが発生しました。"
        })
      },
      staffEdit(staff) {
        axios.post('http://localhost:3000/api/v1/staff-update', {
            id: staff,
            name: this.name,
            sex: this.sex,
            age: this.age,
            description: this.description
        })
        .then(res => {
          console.log(res)
          this.message = res.data.message
          if(res.data.status === "success") {
              this.$store.state.value = true
              this.$store.state.flashType = "success"
              this.$store.state.message = "スタッフ変更しました。"
              this.$router.push('/home')
          }
        })
        .catch( () => {
          this.ex_message = "システムエラーが発生しました。"
        })
      }
    },
    mounted() {
      axios.get('http://localhost:3000/api/v1/staffs')
      .then(res => {
        this.staffs_data = res.data
      })
      .catch( () => {
          this.ex_message = "システムエラーが発生しました。"
      })
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
  .fade-enter-active, .fade-leave-active {
    transition: opacity .7s;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
</style>