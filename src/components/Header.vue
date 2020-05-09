<template>
  <v-app id="inspire">

    <v-app-bar
      color="blue lighten-4"
      app
      clipped-left
    >
      <v-toolbar-title class="headline text-uppercase white--text">Reservation</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu
        transition="slide-y-transition"
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn
            color="primary"
            dark
            v-on="on"
            icon
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <!-- 管理者 -->
          <div v-if="position === 'admin' ">

            <v-list-item class="list_hover">
              <v-list-item-title>
                <router-link
                  to="/home"
                  class="link"
                >ホーム</router-link>
              </v-list-item-title>
            </v-list-item>

            <v-list-item class="list_hover">
              <v-list-item-title>
                <router-link
                  to="/staff_new"
                  class="link"
                >スタッフ作成</router-link>
              </v-list-item-title>
            </v-list-item>

            <v-list-item class="list_hover">
              <v-list-item-title>
                <router-link
                  to="/user_new"
                  class="link"
                >ユーザー作成</router-link>
              </v-list-item-title>
            </v-list-item>

            <v-list-item class="list_hover">
              <v-list-item-title>
                <router-link
                  to="/users/1"
                  class="link"
                >ユーザー一覧</router-link>
              </v-list-item-title>
            </v-list-item>

            <v-list-item class="list_hover">
              <v-list-item-title>
                <router-link
                  to="/reservation-check"
                  class="link"
                >予約一覧</router-link>
              </v-list-item-title>
            </v-list-item>

            <v-list-item class="list_hover">
              <v-list-item-title @click="logout">
                <router-link
                  to="/login"
                  class="link"
                >ログアウト</router-link>
              </v-list-item-title>
            </v-list-item>

          </div>

          <!-- ユーザー -->
          <div v-else-if="position === 'user'">

            <v-list-item class="list_hover">
              <v-list-item-title>
                <router-link
                  to="/home"
                  class="link"
                >ホーム</router-link>
              </v-list-item-title>
            </v-list-item>

            <v-list-item class="list_hover">
              <v-list-item-title>
                <router-link
                  to="/reservation"
                  class="link"
                >予約</router-link>
              </v-list-item-title>
            </v-list-item>

            <v-list-item class="list_hover">
              <v-list-item-title>
                <router-link
                  to="/reservation-show"
                  class="link"
                >予約確認</router-link>
              </v-list-item-title>
            </v-list-item>

            <v-list-item class="list_hover">
              <v-list-item-title @click="logout">
                <router-link
                  to="/login"
                  class="link"
                >ログアウト</router-link>
              </v-list-item-title>
            </v-list-item>

          </div>

          <div v-else>
            <v-list-item class="list_hover">
              <v-list-item-title>
                <router-link
                  to="/login"
                  class="link"
                >ログイン</router-link>
              </v-list-item-title>
            </v-list-item>
          </div>
        </v-list>
      </v-menu>
    </v-app-bar>

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

    <v-content>
      <transition mode="out-in">
        <router-view></router-view>
      </transition>
    </v-content>

  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        position: this.$store.state.position,
        value: this.$store.state.value,
        flashMessage: this.$store.state.flashMessage,
        flashType: this.$store.state.flasType
      }
    },
    methods: {
      logout() {
        sessionStorage.clear()
        this.$router.go('/logout')
      },
    },
    mounted() {
      console.log("読み込み")
    }
  }
</script>

<style scoped>
  .link, .link:hover {
    text-decoration: none;
    color: black;
  }

  .list_hover:hover {
    background-color: #F5F5F5;
  }


  .v-enter {
    transform: translate(-100px, 0);
    opacity: 0;
  }
  .v-enter-to {
    opacity: 1;
  }
  .v-enter-active {
    transition: all 1s 0s ease;
  }
  .v-leave {
    transform: translate(0, 0);
    opacity: 1;
  }
  .v-leave-to {
    transform: translate(100px, 0);
    opacity: 0;
  }
  .v-leave-active {
    transition: all .5s 0s ease;
  }
</style>