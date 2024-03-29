/* 路由权限控制 */

import Vue from 'vue'
import router from './router'
import store from './store'

import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import zmDevice from './utils/native'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['mLogin'] // no redirect whitelist
const defaultRoutePath = '/home'
const loginRoutePath = '/login'

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title}`))
  // 判断是否是app，是：走app登录方式，否：走m站登录方式
  if (zmDevice.isZmApp) {
    next()
  } else {
    if (window.localStorage.getItem('TOKEN')) {
      if (to.path === loginRoutePath) {
        next({ path: defaultRoutePath })
      } else {
        next()
      }
    } else {
      if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
        next()
      } else {
        next({ path: loginRoutePath })
        NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
