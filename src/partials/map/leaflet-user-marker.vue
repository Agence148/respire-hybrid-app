<template></template>
<script>

  import L from 'leaflet'

  export default {

    props: ['map', 'data'],

    data () {
      return {
        shared: store,
        marker: false
      }
    },

    mounted () {

      this.marker = L.circleMarker(this.shared.user_position, {
        radius: 5,
        color: '#321f40',
        opacity: '0.3',
        weight: '25',
        fillOpacity: '1',

      }).addTo(this.map)

    },

    beforeDestroy () {
      this.map.removeLayer(this.marker)
    },

    watch: {
      'shared.user_position': function () {
        this.marker.setLatLng(this.shared.user_position)
      }
    }
  }

</script>
