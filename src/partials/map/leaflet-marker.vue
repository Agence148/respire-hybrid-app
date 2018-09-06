<template></template>
<script>

  import L from 'leaflet'

  export default {

    props: ['map', 'data'],

    data () {
      return {
        marker: false,
        uuid: store.uuid,
        user_id: store.user_id
      }
    },

    mounted () {
      var markerClass = 'map-marker ';
      if (this.data.symptomes.length > 0) {
        if (this.data.incidents.length > 0) {
          markerClass += 'map-marker-both ';
        } else {
          markerClass += 'map-marker-symptomes ';
        }
      } else {
        markerClass += 'map-marker-incidents ';
      }
      if ((this.data.uuid == this.uuid && this.data.anonymous == 0) || (this.user_id && this.data.user_id == this.user_id)) {
        markerClass += 'map-marker-owner ';
      }
      var icon = L.divIcon({
        className: markerClass,
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

        this.$router.push({path: '/signalements/' + this.data.id})
      }
    }

  }

</script>

<style lang="scss">

  @import "../../assets/scss/_vars.scss";

  .map-marker {
    top: -7px;
    left: -7px;
    width: 14px;
    height: 14px;
    background: $undefined;
    border-radius: 50px;
    box-shadow: 5px 5px 20px 0 rgba(0, 0, 0, .15);

    &-symptomes {
      background: $symptomes;
      &.map-marker-owner {
        background: transparent;
        border: 2px solid $symptomes;
      }
    }
    &-incidents {
      background: $incidents;
      &.map-marker-owner {
        background: transparent;
        border: 2px solid $incidents;
      }
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
