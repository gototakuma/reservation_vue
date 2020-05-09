<template>
  <div>
    <v-container>

      <!-- エラーメッセージ -->
      <p class="ex_message">{{ message }}</p>

      <!-- 名前 -->
      <v-row>
        <v-col>
          <v-text-field 
            v-model="user.name"
            label="名前"
            :rules="rules"
            prepend-icon="mdi-account-arrow-right"
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- メールアドレス -->
      <v-row>
        <v-col>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="user.email"
              :rules="emailRules"
              label="メールアドレス"
              prepend-icon="mdi-email"
            ></v-text-field>
          </v-form>
        </v-col>
      </v-row>

      <!-- 古いパスワード -->
      <v-row>
        <v-col>
          <v-form ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="oldPassword"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordRules"
              :type="show ? 'text' : 'password'"
              label="古いスワード"
              hint="8文字以上"
              counter
              prepend-icon="mdi-shield-key"
              @click:append="show = !show"
            ></v-text-field>
          </v-form>
        </v-col>
      </v-row>
      <!-- 新しいパスワード -->
      <v-row>
        <v-col>
          <v-form ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="newPassword"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordRules"
              :type="show ? 'text' : 'password'"
              label="新しいパスワード"
              hint="8文字以上"
              counter
              prepend-icon="mdi-shield-key"
              @click:append="show = !show"
            ></v-text-field>
          </v-form>
        </v-col>
      </v-row>

      <!-- 年齢・性別 -->
      <v-row>
        <v-col>
          <v-form ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              tyep="number"
              :rules="ageRules"
              v-model="user.age"
              label="年齢"
              hint="0~100歳の間で記載してください。"
              prepend-icon="mdi-chart-donut"
            ></v-text-field>
          </v-form>
        </v-col>
        <v-col>
          <v-form 
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-select
              :items="sexData"
              label="性別"
              v-model="user.sex"
              prepend-icon="mdi-account-group"
            ></v-select>
          </v-form>
        </v-col>
      </v-row>

      <!-- ボタン -->
      <v-btn 
        color="primary"
        @click="createUser"
      ><v-icon left>mdi-account-plus</v-icon>更新</v-btn>

    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      user: [],
      name: "", 
      email: "",
      oldPassword: "",
      newPassword: "",
      age:  "",
      sexData: ["男","女","その他"],
      sex: "",
      show: false,
      valid: true,
      message: "",
      emailRules: [
        value => !!value || '入力してください',
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || '有効なメールアドレスを記載してください。'
        },
      ],
      passwordRules: [
        value => !!value || '入力してください',
        value => value.length >= 8 || '8文字以上入力してください。',
      ],
      ageRules: [
        value => !!value || '入力してください',
        value => {
          const number = /^[1-9]|[1-9][0-9]$/
          return number.test(value) || '0~99の間です。'
        }
      ],
      rules: [
        value => !!value || '入力してください',
      ],
    }
  },
  mounted() {
    axios.get('http://localhost:3000/api/v1/users-show',{
      params: {user_id: this.$store.state.id}
    })
    .then(res => {
      this.user = res.data.user
      console.log(res.data.user)
    })
  },
  methods: {
    createUser() {
      axios.post(
        'http://localhost:3000/api/v1/user-update',
        {
          id: this.$store.state.id,
          name: this.user.name,
          email: this.user.email,
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
          age: this.user.age,
          sex: this.user.sex
        })
      .then((res) => {
        this.message = res.data.message
        console.log(res.data.status)
        if (res.data.status == 'success') {
          this.$store.state.value = true
          this.$store.state.flashType = "success"
          this.$store.state.message = "設定を更新しました。"
          this.$router.push('/home')
        }
      })
      .catch( () => {
          this.message = "システムエラーが発生しました。"
        })
    }
  }
}
</script>