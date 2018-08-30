<template>

  <div class="top-bar">
    <div class="top-bar-left">
      <button class="btn" :class="disable ? 'disable' : ''" id="button-locate" v-html="require('../assets/images/icons/gps.svg')" aria-labelledby="Geolocalisation"></button>
    </div>
    <div class="top-bar-center">
      <button class="btn" id="switch-heatmap" v-html="require('../assets/images/icons/layers.svg')" aria-labelledby="Heat map"></button>
    </div>
    <div class="top-bar-right">
      <button @click="goToMentionLegales" class="btn" v-html="require('../assets/images/icons/info.svg')" aria-labelledby="Informations"></button>
    </div>
  </div>

</template>

<script>

  export default {
    data() {
      return {
        shared: store,
        disable: false,
      }
    },
    methods : {
      goToMentionLegales() {
        this.$router.push({path: '/mentions-legales'});
      }
    },
    mounted() {
      E.$on('user-location-unavailable', (offline) => {
        this.disable = offline
      })
      E.$on('user-location-updated', (offline) => {
        this.disable = offline
      })
    }
  }

</script>

<style lang="scss">

  .top-bar {
    z-index: 2000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 30px 20px;
    display: flex;
    flex-direction: row;

    &-left,
    &-right,
    &-center {
      text-align: center;
      display: inline-block;
      margin: 0 10px;

      .btn {
        padding: 0;
        font-family: sans-serif;
        width: 50px;
        height: 50px;
        border-radius: 50px;
        box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.15);
        &.disable {
          pointer-events: none;
          background: $offline;
          svg {
            fill: #fff;
          }
        }

        svg {
          width: 22px;
        }
        &-active {
          background: $violet;

          svg {
            fill: #fff;
          }
        }
      }
    }

    &-left {
      .btn {
        svg {
          width: 24px;
        }
      }
    }

    &-center {

    }

    &-right {
      position: absolute;
      right: 20px;
      opacity: 0.65;

      .btn {
        box-shadow: none;
      }
    }

    a {
      color: #fff;
    }
  }

</style>
