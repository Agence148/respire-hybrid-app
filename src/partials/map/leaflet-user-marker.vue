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

      this.marker = L.circle(this.shared.user_position, {
        radius: 200,
        color: '#4dbcc3'
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
