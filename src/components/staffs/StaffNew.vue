<template>
  <div>
    <v-container>
      <h1>スタッフ作成</h1>

        <!-- エラーメッセージ -->
        <p class="ex_message">{{ ex_message }}</p>
        <ul>
          <li v-for="msg in message" :key="msg">
            {{msg}}
          </li>
        </ul>

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

      <!-- 説明 -->
      <v-row>
        <v-col>
          <v-text-field 
            v-model="description" 
            label="説明"
            :rules="rules"
            prepend-icon="mdi-clipboard-text"
          ></v-text-field>
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
      description: "",
      age:  "",
      sexData: ["男","女","その他"],
      sex: "",
      ex_message: "",
      message: [],
      show: false,
      valid: true,
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
        'http://localhost:3000/api/v1/staff-create',
        {
          name: this.name,
          age: this.age,
          sex: this.sex,
          description: this.description
        })
      .then((res) => {
        this.message = res.data.message
        if (res.data.status == "success") {
          this.$store.state.value = true
          this.$store.state.flashType = "success"
          this.$store.state.message = "スタッフを作成しました。"
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