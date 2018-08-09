<template>
    <div :class="classes">
        <leaflet-map locate="true" :markers="liste" :center="mapCenter" :zoom="mapZoom"></leaflet-map>
        <router-view class="signalement-content"></router-view>
    </div>
</template>

<script>

  Vue.component('leaflet-map', require('../../partials/map/leaflet-map.vue'))

  export default {
    data () {
      return {
        shared: store,
        liste: [],
        mapCenter: store.user_position,
        mapZoom: 12,
        classes: 'signalements',
        geolocated: false
      }
    },
    methods: {
      userPosition (position) {

        this.geolocated = true
        this.shared.user_position = [position.coords.latitude, position.coords.longitude]

        this.mapCenter = [position.coords.latitude, position.coords.longitude]
        this.mapZoom = 15
      }
    },
    mounted () {
      if (navigator.geolocation && this.geolocated == false) {
        navigator.geolocation.getCurrentPosition(this.userPosition)
      }
    }
  }

</script>

<style lang="scss">

    #map {
        height: 100vh;
        transition: all .5s;
    }

    .signalements-create, .signalements-show {

        #map {
            margin-top: 60px;
            height: 220px;
        }
        .signalement-content {
            padding: 30px 0px 60px 70px;
        }
    }

</style>