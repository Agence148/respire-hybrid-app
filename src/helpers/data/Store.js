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

  geolocalised: false,
  authenticated: undefined,

  symptomes: [],
  orphelins: [],
  origines: [],
  signalements: [],
  symptomes_categories: [] // TODO: delete ?

}

export default store
