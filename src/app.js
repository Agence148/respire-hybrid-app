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

/**
 * Load our router to plug it in our Vue instance later
 */
import router from './routes.js'

import TopBar from './partials/top-bar.vue'
import MainNav from './partials/main-nav.vue'

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
    cordova: Vue.cordova,
    deviceReady: false
  },

  created() {
    store.api_root = process.env.API_ROOT + process.env.API_VERSION
    store.debug = process.env.DEBUG
  },

  mounted() {
    router.push({path: '/'})

    document.addEventListener('deviceready', () => {
      // Get device UUID
      if (process.env.NODE_ENV === 'development') {
        store.uuid = 'dev-test'
      } else {
        store.uuid = (typeof device === 'undefined' || device.platform === 'browser' || device.uuid === '') ? 'dev-test' : device.uuid
      }

      // Get orphans
      axios.get(store.api_root + '/signalements/' + store.uuid + '/orphelins')
        .then(response => {
          store.orphelins = response.data
          if (!store.authenticated) {
            store.user.signalements = response.data
          }
        })

      // Get user's location
      this.checkUser()
      this.checkUserLocation(true)
    }, false)

    // Get signalements
    axios.get(store.api_root + '/signalements')
      .then(response => {
        store.signalements = response.data
      })

    // Get incidents
    axios.get(store.api_root + '/incidents')
      .then(response => {
        store.incidents = response.data
      })

    // Get symptomes categories
    axios.get(store.api_root + '/symptomes/categories')
      .then(response => {
        store.symptomes_categories = response.data
      })

    // Get symptomes
    axios.get(store.api_root + '/symptomes')
      .then(response => {
        store.symptomes = response.data
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
        router.push({path: '/signalements/index'})
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
    checkUserLocation (initial = false) {
      if (initial || this.deviceReady) {
        this.deviceReady = true
        navigator.geolocation.watchPosition(this.geolocationSuccess, this.geolocationError, { timeout: 30000 })
      }
    },
    geolocationSuccess (position) {
      this.shared.user_position = [position.coords.latitude, position.coords.longitude]
      this.shared.offline = false
      E.$emit('user-location-updated', this.shared.offline)
    },
    geolocationError (error) {
      console.log('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n')
      this.shared.offline = true
      E.$emit('user-location-unavailable', this.shared.offline)
    },
    getUser () {
      const url = store.api_root + '/users/' + store.user.id
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
    }
  }
})
