var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"http://respire.test/api/"',
  API_VERSION: '"v1"',
  DEBUG: true
})
