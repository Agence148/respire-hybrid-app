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

      createMap () {

        // http://spatialreference.org/ref/epsg/ntf-paris-lambert-zone-ii/
        // var crs = new L.Proj.CRS('EPSG:27572',
        //   '+proj=lcc +lat_1=46.8 +lat_0=46.8 +lon_0=0 +k_0=0.99987742 +x_0=600000 +y_0=2200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs', {
        //     resolutions: [12.5],
        //     origin: [534892, 2471690],
        //     zoom: this.zoom
        //   })

        this.layers.base = L.tileLayer('https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
          maxZoom: 18,
          minZoom: 2,
        });
        this.layers.heatmap = L.tileLayer('http://c.tiles.wmflabs.org/hillshading/{z}/{x}/{y}.png', {
          maxZoom: 18,
          minZoom: 2,
        });
        // this.layers.heatmap = L.tileLayer.wms('http://magellan.airparif.asso.fr/geoserver/apisHorAir/wms?', {
        //   service: 'WMS',
        //   version: 1.3,
        //   request: 'GetMap',
        //   layers: 'apisHorAir:indice_api',
        //   crs: 'EPSG:27572',
        //   format: 'image/svg',
        //   authkey: 'f18d13c0-feec-f830-e039-9e397f5aa62b'
        // })

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

          // crs: crs,

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
        requestAnimationFrame(this.resizeMap)
      })
      E.$on('map-locate-user', () => {
        this.map.setView(store.user_position, 16)
      })
      E.$on('map-locate-report', (report) => {
        this.map.setView(new L.LatLng(report.lat, report.lng), 16)
      })

      var switchHeatmap = document.querySelector('#switch-heatmap');
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
      btnnLocate.addEventListener('click', this.centerMap)

    }
  }

</script>
