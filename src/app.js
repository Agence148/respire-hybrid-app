/*
|--------------------------------------------------------------------------
| App
|--------------------------------------------------------------------------
|
| Main App object
|
*/

import './assets/scss/main.scss'

/**
 * Load our bootstrap
 */
import './bootstrap.js'

import VueCordova from 'vue-cordova'

/**
 * Load our router to plug it in our Vue instance later
 */
import router from './routes.js'

import TopBar from './partials/top-bar.vue'
import MainNav from './partials/main-nav.vue'

Vue.use(VueCordova)

/**
 * Let's create our Vue instance
 * el is for the html element we want to hook
 * router reference our VueRouter instance in ./routes.js
 */
new Vue({
  el: '#app',
  router: router,
  components: {'TopBar': TopBar, 'MainNav': MainNav},
  data: {
    shared: store,
    cordova: Vue.cordova
  },
  mounted () {
    if (this.isRunningStandalone()) {
      router.push({path: '/'})
      this.checkUser()
    } else {
      if (this.$route.path !== '/install') {
        this.checkUser()
      }
    }
  },
  watch: {
    'shared.authenticated': function (authenticated) {
      if (authenticated) {
        if (this.$route.query.redirect) {
          router.push({path: this.$route.query.redirect})
        } else {
          if (this.$route.path === '/' || this.$route.path == '/login') {
            router.push({path: '/signalements/index'})
          }
        }
      } else {
        local.clear('user')
        router.push({path: '/login'})
      }
    }
  },
  methods: {
    checkUser () {
      local.get('user')
        .then(() => {
          if (store.user.api_token) {
            local.get()
            this.updateUser()

          }
        })
        .catch((err) => {
            console.log(err)
            store.authenticated = false
          }
        )
    },
    updateUser () {
      const url = appURL + '/api/v1/users/' + store.user.id
      const AuthStr = 'Bearer '.concat(store.user.api_token)
      axios.get(url, {headers: {Authorization: AuthStr}})
        .then(response => {

          console.log(response)
          store.authenticated = true
        })
        .catch(error => {
          if (error.response) {
            if (error.response.status === 401) {
              this.shared.authenticated = false
            }
          }
        })

    },
    isIos () {
      // Reference: http://stackoverflow.com/questions/9038625/detect-if-device-is-ios#answer-9039885
      return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
    },

    isRunningStandalone () {
      // Bullet proof way to check if iOS standalone
      var isRunningiOSStandalone = window.navigator.standalone

      // Reliable way (in newer browsers) to check if Android standalone.
      // http://stackoverflow.com/questions/21125337/how-to-detect-if-web-app-running-standalone-on-chrome-mobile#answer-34516083
      var isRunningAndroidStandalone = window.matchMedia('(display-mode: standalone)').matches

      return isRunningiOSStandalone || isRunningAndroidStandalone
    }
  }
})
