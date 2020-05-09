<template>
  <div>
    <v-app id="inspire">
        <v-container>
          <h1>ユーザー一覧</h1>

          <!-- ユーザー一覧表示テーブル -->
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">名前</th>
                  <th class="text-left">メールアドレス</th>
                  <th class="text-left">年齢</th>
                  <th class="text-left">性別</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.id">
                  <td><router-link :to= "{name: 'user_id', params: {id: user.id} }">{{ user.name }}</router-link></td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.age }}</td>
                  <td>{{ user.sex }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <!-- ユーザー詳細 -->
          <router-view></router-view>
          
        </v-container>
    </v-app>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      users: []
    }
  },
  mounted() {
    axios.get('http://localhost:3000/api/v1/users')
    .then(res => (this.users = res.data))
    .catch(() => this.$router.go('/users'))
    console.log(this.$store.state.token)
  }
}
</script>