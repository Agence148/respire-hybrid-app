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
  geolocalised: false,
  symptomes_categories: [],
  authenticated: undefined

}

export default store
