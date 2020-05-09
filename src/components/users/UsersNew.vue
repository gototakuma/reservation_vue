<template>
  <div>
    <v-container>

      <!-- 名前 -->
      <v-row>
        <v-col>
          <v-text-field 
            v-model="name" 
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
              v-model="email"
              :rules="emailRules"
              label="メールアドレス"
              prepend-icon="mdi-email"
            ></v-text-field>
          </v-form>
        </v-col>
      </v-row>

      <!-- パスワード -->
      <v-row>
        <v-col>
          <v-form ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordRules"
              :type="show ? 'text' : 'password'"
              label="パスワード"
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
              v-model="age"
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
              v-model="sex"
              prepend-icon="mdi-account-group"
            ></v-select>
          </v-form>
        </v-col>
      </v-row>

      <!-- ボタン -->
      <v-btn 
        color="primary"
        @click="createUser"
      ><v-icon left>mdi-account-plus</v-icon>作成</v-btn>

    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      name: "", 
      email: "",
      password: "",
      age:  "",
      sexData: ["男","女","その他"],
      sex: "",
      show: false,
      valid: true,
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
  methods: {
    createUser() {
      axios.post(
        'http://localhost:3000/api/v1/user-create',
        {
          user: {
          name: this.name,
          email: this.email,
          password: this.password,
          age: this.age,
          sex: this.sex
          }
        })
      .then((res) => {
        if (res.status == '200') {
          this.$store.state.value = true
          this.$store.state.flashType = "success"
          this.$store.state.message = "ユーザーを作成しました。"
          this.$router.push('/home')
        }
      })
    }
  }
}
</script>