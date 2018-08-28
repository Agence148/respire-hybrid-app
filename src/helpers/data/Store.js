/*
|--------------------------------------------------------------------------
| store
|--------------------------------------------------------------------------
|
| Global unique source of trust
|
*/
let store = {

  user: {
    api_token: undefined
  },
  user_position: [48.86, 2.34],
  uuid: '',

  api_root: '',
  debug: false,

  geolocalised: false,
  authenticated: undefined,

  symptomes: [],
  orphelins: [],
  incidents: [],
  signalements: [],
  symptomes_categories: []

}

export default store
