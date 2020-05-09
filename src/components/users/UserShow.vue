<template>
  <div>
    <v-app>
      <v-container>
        <h1>詳細ページ</h1>

        <!-- ユーザー詳細情報 -->
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
                <tr>
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.age }}</td>
                  <td>{{ user.sex }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <!-- ユーザー予約情報 -->
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">担当スタッフ</th>
                  <th class="text-left">日付</th>
                  <th class="text-left">コース</th>
                  <th class="text-left">時間</th>
                  <th class="text-left">料金</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="reservation in reservations"
                  :key="reservation.id"
                >
                  <td>{{ reservation.staff }}</td>
                  <td>{{ reservation.reservation_date }}</td>
                  <td>{{ reservation.cource }}</td>
                  <td>{{ reservation.time }}</td>
                  <td>{{ reservation.price }}</td>
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
        user: "",
        reservations: []
      }
    },
    watch: {
      '$route' () {
        axios.get('http://localhost:3000/api/v1/users-show', {
          params: {user_id: this.$route.params.id}})
        .then(res => {
          this.user = res.data.user
          this.reservations = res.data.reservation
          console.log(res.data)
        })
      }
    }
  }
</script>