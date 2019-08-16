import Vue from 'vue'
import Router from 'vue-router'
import TaskList from '@/components/taskList'
import CashBook from '@/components/cashBook'
import DiaryBook from '@/components/diaryBook'
import Setting from '@/components/setting'
import ErrorPage from '@/components/errorPage'
import MainPage from '@/components/mainPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainPage',
      component: MainPage,
      children: [
        {
          path: '/task/:id',
          name: 'taskList',
          component: TaskList
        },
        {
          path: '/account/:id',
          name: 'cashBook',
          component: CashBook
        },
        {
          path: '/diary/:id',
          name: 'diaryBook',
          component: DiaryBook
        },
        {
          path: '/setting/:id',
          name: 'setting',
          component: Setting
        }
      ]
    },
    {
      path: '*',
      name: 'errorPage',
      component: ErrorPage
    }
  ]
})
