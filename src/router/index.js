import Vue from 'vue'
import Router from 'vue-router'
import TaskList from '@/components/menu/taskList'
import CashBook from '@/components/menu/cashBook'
import DiaryBook from '@/components/menu/diaryBook'
import Setting from '@/components/menu/setting'
import ErrorPage from '@/components/errorPage'
import MainPage from '@/components/mainPage'
import RightPage from '@/components/rightPage'
import LoginPage from '@/components/auth/loginPage'
import resetPassword from '@/components/auth/resetPassword'
import signUp from '@/components/auth/signUp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainPage',
      component: MainPage,
      children: [
        {
          path: '/record',
          name: 'record',
          component: RightPage,
          children: [
            {
              path: 'task/:id',
              name: 'taskList',
              component: TaskList
            },
            {
              path: 'account/:id',
              name: 'cashBook',
              component: CashBook
            },
            {
              path: 'diary/:id',
              name: 'diaryBook',
              component: DiaryBook
            }
          ]
        },
        {
          path: '/setting/:id',
          name: 'setting',
          component: Setting
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/reset_password',
      name: 'resetPassword',
      component: resetPassword
    },
    {
      path: '/sign_up',
      name: 'signUp',
      component: signUp
    },
    {
      path: '*',
      name: 'error',
      component: ErrorPage
    }
  ]
})
