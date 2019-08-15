import Vue from 'vue'
import Router from 'vue-router'
import MenuContainer from '@/components/menuContainer'
import TaskList from '@/components/taskList'
import CashBook from '@/components/cashBook'
import DiaryBook from '@/components/diaryBook'
import Setting from '@/components/setting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/:id',
      name: 'content',
      component: MenuContainer
    },
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
    // ,
    // {
    //   path: '*',
    //   name: 'DiaryBook',
    //   component: DiaryBook
    // }
  ]
})
