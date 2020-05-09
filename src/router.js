import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import UsersNew from './components/users/UsersNew.vue'
import Users from './components/users/Users'
import UserShow from './components/users/UserShow.vue'
import UserEdit from './components/users/UserEdit.vue'
import ReservationNew from './components/reservations/ReservationNew.vue'
import ReservationShow from './components/reservations/ReservationShow.vue'
import ReservationCheck from './components/reservations/ReservationCheck.vue'
import StaffNew from './components/staffs/StaffNew.vue'
import Staffs from './components/staffs/Staffs.vue'

// ログイン
import Login from './components/Login.vue'

//store
import Store from './store/store.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [

    // ホーム
    {
      path: '/home',
      component: Home
    },

    // ログイン
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {isPublic: true}
    },

    // ユーザー作成
    {
      path: '/user_new',
      component: UsersNew
    },

    // ユーザー設定
    {
      path: '/user-update',
      component: UserEdit
    },

    // ユーザー一覧
    {
      path: '/users', 
      component: Users,
      children: [
        // ユーザー詳細
        {
          path: ':id', 
          component: UserShow, 
          name: "user_id"
        }
      ]
    },

    // スッタフ作成
    {
      path: '/staff_new',
      component: StaffNew
    },

    // スタッフ一覧
    {
      path: '/staffs',
      component: Staffs
    },

    // 予約作成
    {
      path: '/reservation',
      component: ReservationNew,
    },

    // 予約検索
    {
      path: '/reservation-show',
      component: ReservationShow,
    },

    // 予約全データー取得
    {
      path: '/reservation-check',
      component: ReservationCheck
    },
    
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(page => page.meta.isPublic) || Store.state.token) {
    next()
  } else {
    next('/login')
  }
})

export default router