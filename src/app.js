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
 * Load config
 */
import './config.js'

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

  computed: {
  },

  mounted() {
    store.uuid = !device === 'undefined' || device.platform === 'browser' ? 'dev-test' : device.uuid
    // store.uuid = 'dev-test'
    if (this.isRunningStandalone()) {
      router.push({path: '/'})
      this.checkUser()
    } else {
      if (this.$route.path !== '/install') {
        this.checkUser()
      }
    }

    // Get signalements
    axios.get(appURL + '/api/v1/signalements')
      .then(response => {
        store.signalements = response.data
      })

    // Get incidents
    axios.get(appURL + '/api/v1/incidents')
      .then(response => {
        store.incidents = response.data
      })

    // Get symptomes
    axios.get(appURL + '/api/v1/symptomes')
      .then(response => {
        store.symptomes = response.data
      })

    // Get orphans
    axios.get(appURL + '/api/v1/signalements/' + store.uuid + '/orphelins')
      .then(response => {
        store.orphelins = response.data
        if (!store.authenticated) {
          store.user.signalements = response.data
        }
      })

  },

  watch: {
    'shared.authenticated': function (authenticated) {
      if (authenticated) {
        if (this.$route.query.redirect) {
          router.push({path: this.$route.query.redirect})
        } else {
          if (this.$route.path === '/' || this.$route.path === '/login') {
            router.push({path: '/signalements/index'})
          }
        }
      } else {
        local.clear('user')
        router.push({path: '/signalements'})
      }
    }
  },

  methods: {
    checkUser () {
      local.get('user')
        .then(() => {
          if (store.user.api_token) {
            local.get()
            this.getUser()
          }
        })
        .catch(() => {
          store.authenticated = false
        })
    },
    getUser () {
      const url = appURL + '/api/v1/users/' + store.user.id
      const AuthStr = 'Bearer '.concat(store.user.api_token)
      axios.get(url, {headers: {Authorization: AuthStr}})
        .then(response => {
          store.authenticated = true
        })
        .catch(error => {
          if (error.response) {
            if (error.response.status === 401) {
              store.authenticated = false
            }
          }
        })
    },
    getOrphansReports () {
      const url = appURL + '/api/v1/signalements/' + store.uuid + '/orphelins'
      axios.get(url)
        .then(response => {
          store.user.signalements = response.data
        })
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
