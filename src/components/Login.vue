<template>
  <div>
    <v-app>
      <v-container grid-list-md text-xs-center class="margin-top">

        <!-- エラーメッセージ -->
        <v-row justify="center" align-content="center">
          <v-col sm="5">
            <p class="err_message">{{ message }}</p>
          </v-col>
        </v-row>

        <!-- メールアドレス -->
        <v-row justify="center" align-content="center">
          <v-col sm="5">
             <div class="field">
               <div class="control">
                 <v-form>
                   <v-text-field 
                     v-model="email"
                     label="メールアドレス"
                     prepend-icon="mdi-email"
                    ></v-text-field>
                 </v-form>
               </div>
            </div>
          </v-col>
        </v-row>

        <!-- パスワード -->
        <v-row justify="center" align-content="center">
          <v-col sm="5">
            <div class="field">
              <div class="control">
                <v-form>
                  <v-text-field 
                    v-model="password"
                    label="パスワード"
                    prepend-icon="mdi-shield-key"
                    :type="pwShow ? 'text' : 'password'"
                    @click:append="pwShow = !pwShow"
                    :append-icon="pwShow ? 'mdi-eye' : 'mdi-eye-off'"
                  ></v-text-field>
                </v-form>
              </div>
            </div>
          </v-col>
        </v-row>

        <!-- ボタン -->
        <v-row>
          <v-col>
            <div class="text-center">
               <v-btn
                 color="primary"
                 dark
                 @click="login"
                ><v-icon left>mdi-login-variant</v-icon>
              ログイン</v-btn>
            </div>
          </v-col>
        </v-row>

      </v-container>
    </v-app>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: '',
      pwShow: false,
      message: "",
    }
  },
  methods: {
    login() {
      axios.post('http://localhost:3000/auth', {
        email: this.email,
        password: this.password
      })
      .then( res => {
        console.log(res)
        if (res.data.token) {
          this.$store.commit('authToken',res.data.token)
          this.$store.commit('userPosition',res.data.position)
          this.$store.commit('userId',res.data.id)
          this.$router.push('/home')
          this.$router.go('/home')
        }else {
          this.message = res.data.message
        }
      })
      .catch( res => {
        console.log(res)
      })
    }
  },
}
</script>

<style>
  .margin-top {
    margin-top: 15%;
  }
  .err_message {
    color: red;
  }
  @media screen and (max-width: 450px) {
    .margin-top {
      margin-top: 40%;
    }
  }
</style>