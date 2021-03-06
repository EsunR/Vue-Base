import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
// import global from './common.vue'
Vue.use(Router)

var router = new Router({
  routes: [
    // path name component
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'home', component: Home }
  ]
})

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token')) {
    console.log("get success");
    next();
  } else {
    console.log("no token!");
    // window.location.href = global.login_location
    next();
  }
})

export default router
