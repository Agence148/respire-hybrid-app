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
        geolocated: false,
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
    transition: all .3s;
    &::before {
        content: '';
        transition: .4s;
        transition-delay: 0.1s;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 2000;
        width: 100%;
        height: 50%;
        background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
        pointer-events: none;
    }
  }

  .signalements-create, .signalements-show {
    
    .signalement-content {
      
    }
  }

</style>