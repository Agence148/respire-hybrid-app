<template>
    <div>
        <div id="map"></div>
        <leaflet-marker v-for="marker in markers" :map="map" :key="marker.id" :data="marker"></leaflet-marker>
        <leaflet-user-marker v-if="map" :map="map"></leaflet-user-marker>
    </div>
</template>


<script>
  import L from 'leaflet'
  import leafletMarker from './leaflet-marker.vue'
  import leafletUserMarker from './leaflet-user-marker.vue'

  export default {

    props: ['locate', 'markers', 'center', 'zoom'],

    data () {
      return {
        shared: store,
        map: false,
        resizeInterval: undefined,
        resizeCpt: 0,
      }
    },

    components: {
      'leaflet-marker': leafletMarker,
      'leaflet-user-marker': leafletUserMarker
    },

    methods: {

      createMap () {

        this.map = L.map('map', {

          keyboard: false,
          zoomControl: false,

          center: this.center,
          zoom: this.zoom,
          maxZoom: 15,
          minZoom: 10,
          maxBounds: [
            [this.shared.user_position[0] + 0.5, this.shared.user_position[1] - 0.5],
            [this.shared.user_position[0] - 0.5, this.shared.user_position[1] + 0.5]
          ],

          layers: [
            L.tileLayer('https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
              maxZoom: 18,
              minZoom: 2,
              //attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            })
          ]
        })
      },

      resizeMap () {
        this.resizeCpt++
        this.map.invalidateSize()

        if (this.resizeCpt <= 17) {
          requestAnimationFrame(this.resizeMap)
        }
        else {
          this.centerMap()
        }

      },

      centerMap () {
        this.map.setView(this.center, this.zoom)
      }
    },

    mounted () {

      this.createMap()

      this.resizeCpt = 0
      requestAnimationFrame(this.resizeMap)

      E.$on('route-change', (route) => {
        this.resizeCpt = 0
        requestAnimationFrame(this.resizeMap)
      })

    },

    watch: {
      'zoom': function () {
        this.map.setZoom(this.zoom)
      },
      'center': function () {
        this.map.setView(this.center, this.zoom)
      }

    }
  }

</script>