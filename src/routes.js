/*
|--------------------------------------------------------------------------
| routes
|--------------------------------------------------------------------------
|
| Here you can define routes and some guard
|
*/

/**
 * Load Vue Router
 */
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/**
 * Define routes
 */
const routes = [
  {
    path: '/',
    component: require('./views/Home.vue'),
    meta: {
      requiresAuth: false,
      showMainNav: false
    }
  },
  {
    path: '/login',
    component: require('./views/Login.vue'),
    meta: {
      requiresAuth: false,
      showMainNav: false
    }
  },
  {
    path: '/install',
    component: require('./views/Install.vue'),
    meta: {
      requiresAuth: false,
      showMainNav: false
    }
  },
  {
    path: '/signalements',
    component: require('./views/Signalements/signalements.vue'),
    meta: {
      requiresAuth: true,
      showMainNav: true
    },
    children: [
      {
        path: 'index',
        component: require('./views/Signalements/index.vue')
      },
      {
        path: 'create',
        component: require('./views/Signalements/create.vue')
      },
      {
        path: ':id',
        component: require('./views/Signalements/show.vue')
      },
    ]
  },
  {
    path: '/signalement',
    component: require('./views/Signalements/create.vue'),
    meta: {
      requiresAuth: true,
      showMainNav: true
    }
  },
  {
    path: '/profil',
    component: require('./views/Profil.vue'),
    meta: {
      requiresAuth: true,
      showMainNav: true
    }
  }

]

/**
 * Instanciate the router
 */
let router = new VueRouter({
  routes: routes,
  // base:'/mobile/',
  // mode:'history'
})

/**
 * Navigation guards
 */
router.beforeEach((to, from, next) => {

  E.$emit('route-change', {
    to: to,
    from: from
  })

  /**
   * this route requires auth,
   * check if logged in
   * if not, redirect to login page.
   */
  if (to.matched.some(record => record.meta.requiresAuth)) {

    if (!store.authenticated) {

      if (store.authenticated === undefined) {
        next({
          path: '/',
          query: {redirect: to.fullPath}
        })
      } else {
        next({
          path: '/login',
          query: {redirect: to.fullPath}
        })
      }

    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }

  /**
   * Should we show the main navigation
   */
  if (to.matched.some(record => record.meta.showMainNav)) {
    E.$emit('showMainNav', true)
    next()
  }
  else {
    E.$emit('showMainNav', false)
    next()
  }
})

export default router