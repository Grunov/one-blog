import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store/index';
import middlewarePipeline from './middlewarePipeline';
import {
  CHEK_AUTH
} from '@/store/constants'


Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  scrollBehavior: (to, from ,savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  }
})

router.beforeEach(async (to, from, next) => {
  await store.dispatch(`auth/${CHEK_AUTH}`);
  if (!to.meta.middleware) {
    return next();
  }
  const middleware = to.meta.middleware
  const context = {
    to,
    from,
    next,
    store
  }
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

export default router
