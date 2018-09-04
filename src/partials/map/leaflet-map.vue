<template>
    <div>
        <div id="map"></div>
        <top-bar></top-bar>
        <slider-marker></slider-marker>
        <leaflet-marker v-for="marker in markers" :map="map" :key="marker.id" :data="marker"></leaflet-marker>
        <leaflet-user-marker v-if="map" :map="map"></leaflet-user-marker>
    </div>
</template>


<script>
  import L from 'leaflet'
  import * as proj4leaflet from 'proj4leaflet'
  import * as proj4 from 'proj4'
  import leafletMarker from './leaflet-marker.vue'
  import leafletUserMarker from './leaflet-user-marker.vue'

  Vue.component('top-bar',require('../top-bar.vue'));
  Vue.component('slider-marker',require('../slider-marker.vue'));

  export default {

    props: ['locate', 'markers', 'center', 'zoom'],

    data () {
      return {
        shared: store,
        map: false,
        layers: {},
        resizeInterval: undefined,
        resizeCpt: 0,
      }
    },

    components: {
      'leaflet-marker': leafletMarker,
      'leaflet-user-marker': leafletUserMarker
    },

    methods: {

      initHeatMap() {
        var switchHeatmap = document.querySelector('#switch-heatmap');
        this.map.addLayer(this.layers.heatmap);
        switchHeatmap.classList.add('btn-active');
      },

      createMap () {

        this.layers.base = L.tileLayer('https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
          maxZoom: 18,
          minZoom: 2,
        });

        this.layers.heatmap = L.tileLayer.wms('http://magellan.airparif.asso.fr/geoserver/apisHorAir/wms?', {
            service: 'WMS',
            version: 1.3,
            request: 'GetMap',
            layers: 'apisHorAir:indice_api',
            format: 'image/png',
            transparent: true,
            opacity: 0.7,
            authkey: 'f18d13c0-feec-f830-e039-9e397f5aa62b',
        })

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
            this.layers.base
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
        // requestAnimationFrame(this.resizeMap)
      })
      E.$on('map-locate-user', () => {
        this.map.setView(store.user_position, 12)
      })
      E.$on('map-locate-report', (report) => {
        this.map.setView(new L.LatLng(report.lat, report.lng), 16)
      })

      var switchHeatmap = document.querySelector('#switch-heatmap');

      // Init AirParif
      this.initHeatMap()

      switchHeatmap.addEventListener('click', (e) => {
        if(this.map.hasLayer(this.layers.heatmap)) {
          switchHeatmap.classList.remove('btn-active');
          this.map.removeLayer(this.layers.heatmap);
        } else {
          this.map.addLayer(this.layers.heatmap);
          switchHeatmap.classList.add('btn-active');
        }
      })

      var btnnLocate = document.querySelector('#button-locate');
      btnnLocate.addEventListener('click', () => {
        this.map.setView(this.center, 15)
      })

    }
  }

</script>
