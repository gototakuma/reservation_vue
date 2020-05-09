<template>
  <div>
    <v-app>
      <v-container>

        <!-- フラッシュ -->
        <transition name="fade">
          <div v-if = "value === true">
            <v-alert
              :value = value
              dense
              text
              dismissible
              :type = flashType
            >
              {{ flashMessage }}
            </v-alert>
          </div>
        </transition>

        <!-- 管理者 -->
        <div v-if="position === 'admin'">

          <v-row>
            <v-col class="text-center">
               <v-btn
                 to="/staff_new"
                 color="primary"
                 dark
                ><v-icon left>mdi-account-plus</v-icon>
              スタッフ作成</v-btn>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="text-center">
               <v-btn
                 to="/staffs"
                 color="primary"
                 dark
                ><v-icon left>mdi-account-plus</v-icon>
              スタッフ一覧</v-btn>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="text-center">
               <v-btn
                 to="/user_new"
                 color="primary"
                 dark
                ><v-icon left>mdi-account-plus</v-icon>
              ユーザー作成</v-btn>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="text-center">
               <v-btn
                 to="/users/1"
                 color="primary"
                 dark><v-icon left>mdi-account-group</v-icon>
               ユーザー一覧</v-btn>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="text-center">
               <v-btn
                 to="/reservation-check"
                 color="primary"
                 dark><v-icon left>mdi-clipboard-check</v-icon>
               予約一覧</v-btn>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="text-center">
               <v-btn
                 color="primary"
                 @click="logout"
                 dark><v-icon left>mdi-account-arrow-left</v-icon>
               ログアウト</v-btn>
            </v-col>
          </v-row>

        </div>

        <!-- ユーザー -->
        <div v-else>

          <v-row>
            <v-col class="text-center">
               <v-btn
                 to="/user-update"
                 color="primary"
                 dark><v-icon left>mdi-account-edit</v-icon>
               ユーザー設定</v-btn>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="text-center">
               <v-btn
                 to="/reservation"
                 color="primary"
                 dark><v-icon left>mdi-check-bold</v-icon>
               予約</v-btn>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="text-center">
               <v-btn
                 to="/reservation-show"
                 color="primary"
                 dark><v-icon left>mdi-clipboard-check</v-icon>
               予約確認</v-btn>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="text-center">
               <v-btn
                 color="primary"
                 @click="logout"
                 dark><v-icon left>mdi-account-arrow-left</v-icon>
               ログアウト</v-btn>
            </v-col>
          </v-row>
          
        </div>
        
      </v-container>
    </v-app>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        position: this.$store.state.position,
        value: this.$store.state.value,
        flashMessage: this.$store.state.message,
        flashType: this.$store.state.flashType
      }
    },
    methods: {
      logout() {
        sessionStorage.clear()
        this.$router.go('/logout')
      },
    },
    mounted() {
      console.log(this.$store.state)
      setTimeout( () => {
        this.value = false
        this.$store.state.value = false
      }, 5000)
    }
  }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .7s;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
</style>