/*
|--------------------------------------------------------------------------
| bootstrap
|--------------------------------------------------------------------------
|
| load global objects at startup
|
*/

window.appURL = 'http://respire.test:8888'

/**
 * Load Vue
 * vue is the base framework of our app
 *
 * and make it available globally
 */
import Vue from 'vue'

window.Vue = Vue

/**
 * Load localforage
 * localforage is a crossbrowser localstorage wrapper
 *
 * and make it available globally
 */
import localforage from 'localforage'

window.localforage = localforage

/**
 * Load Local
 * Local is a helper to pass data from store to local storage and vice versa
 *
 * and make it available globally
 */
import Local from './helpers/data/Local.js'

window.local = Local

/**
 * Load axios
 * axios is for http requests
 *
 * and make it available globally
 */
import axios from 'axios'

window.axios = axios
window.axios.defaults.headers.common = {
  // 'X-CSRF-TOKEN': window.Laravel.csrfToken,
  'X-Requested-With': 'XMLHttpRequest'
}

/**
 * Global Event dispatcher
 */
window.E = new Vue({
  // this is an Event Dispatcher
})

/**
 * Load the state Store
 *
 * and make it available globally
 */
import store from './helpers/data/Store.js'

window.store = store

/**
 * FastClick
 * remove 300ms delay on iOS
 */
let FastClick = require('fastclick')
FastClick.attach(document.body)

/**
 * iNoBounce
 * remove body bounce
 */
import inobounce from 'inobounce'

/**
 * Partials
 */
Vue.component('top-bar', require('./partials/top-bar.vue'))
Vue.component('main-nav', require('./partials/main-nav.vue'))
