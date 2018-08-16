<template></template>
<script>

  import L from 'leaflet'

  export default {

    props: ['map', 'data'],

    data () {
      return {
        marker: false
      }
    },

    mounted () {
      var icon = L.divIcon({
        className: 'map-marker ',
        iconSize: null,
        html: '<div></div>'
      })

      this.marker = L.marker([this.data.lat, this.data.lng], {icon: icon}).addTo(this.map)

      this.marker.on('click', this.onClick)

    },

    beforeDestroy () {
      this.map.removeLayer(this.marker)
    },

    methods: {
      onClick () {
        this.marker._icon.classList.add('click')
        setTimeout(() => {
          this.marker._icon.classList.remove('click')
        }, 500)

        this.$router.push('/signalements/' + this.data.id)
      }
    }

  }

</script>

<style lang="scss">

    @import "../../assets/scss/_vars.scss";

    .map-marker {

        left: -10px;
        top: -10px;

        width: 21px;
        height: 21px;

        border-radius: 10px;
        border: 3px solid $rouge;

        &:before {
            content: '';

            position: absolute;
            top: 5px;
            left: 5px;

            display: block;
            width: 5px;
            height: 5px;

            border-radius: 3px;
            background: $rouge;
        }
        &:after {
            content: '';

            position: absolute;
            top: -3px;
            left: -3px;

            display: block;
            width: 21px;
            height: 21px;

            border-radius: 10px;
            border: 3px solid $rouge;
        }

        &.click {
            &:after {
                transition: all .4s;
                width: 42px;
                height: 42px;
                border-radius: 21px;
                left: -13px;
                top: -13px;
                opacity: 0;
            }
        }
    }

</style>
