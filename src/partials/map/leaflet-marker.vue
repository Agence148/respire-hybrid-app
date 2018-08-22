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

        setTimeout(() => {
          document.querySelector('.view .signalement-details').classList.add('modal-show');
        }, 100)
      }
    }

  }

</script>

<style lang="scss">

    @import "../../assets/scss/_vars.scss";

    .map-marker {
        top: -5px;
        left: -5px;
        width: 10px;
        height: 10px;
        background: $rouge;
        border-radius: 50px;
        box-shadow: 5px 5px 20px 0 rgba(0, 0, 0, .15);
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
