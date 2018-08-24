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
      showMainNav: true
    }
  },
  {
    path: '/register',
    component: require('./views/Register.vue'),
    meta: {
      requiresAuth: false,
      showMainNav: true
    }
  },
  {
    path: '/signalements',
    component: require('./views/Signalements/Base.vue'),
    meta: {
      requiresAuth: false,
      showMainNav: true
    },
    children: [
      {
        path: 'index',
        component: require('./views/Signalements/Index.vue')
      },
      {
        path: 'create',
        component: require('./views/Signalements/Create.vue')
      },
      {
        path: ':id',
        component: require('./views/Signalements/Show.vue')
      }
    ]
  },
  {
    path: '/profil',
    component: require('./views/Profil.vue'),
    meta: {
      requiresAuth: false,
      showMainNav: true
    }
  },
  {
    path: '/orphelins',
    component: require('./views/Orphelins.vue'),
    meta: {
      requiresAuth: true,
      showMainNav: false
    }
  }

]

/**
 * Instanciate the router
 */
let router = new VueRouter({
  routes: routes
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
    E.$emit('nav-show', true)
    next()
  } else {
    E.$emit('nav-show', false)
    next()
  }
})

export default router
