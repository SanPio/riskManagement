import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Index from '@/pages/Index'
import PassInfo from '@/pages/PassInfo'
import Manage from '@/pages/Manage'
import Operation from '@/pages/Operation'
import RefuseInfo from '@/pages/RefuseInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      // 登录页
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      // 通过页
      path: '/passinfo',
      name: 'PassInfo',
      component: PassInfo
    },
    {
      // 审核页
      path: '/manage',
      name: 'Manage',
      component: Manage
    },
    {
      // 操作记录页
      path: '/operation',
      name: 'Operation',
      component: Operation
    },
    {
      // 拒绝页
      path: '/refuseinfo',
      name: 'RefuseInfo',
      component: RefuseInfo
    }
  ]
})
