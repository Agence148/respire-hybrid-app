<template>

  <div class="slider-container">
    <div class="slider-container__header">
      <h2>Autour de moi...</h2>
      <select id="radius-selector" v-model="radius" @change="refreshAround">
        <option value="500">500m</option>
        <option value="1000">1km</option>
        <option value="2000">2km</option>
      </select>
    </div>
    <swiper v-if="slides.length > 0" :options="swiperOption" id="slider-marker">
      <swiper-slide v-for="signalement in slides" :key="signalement.id" :class="signalement._type" @click.native="showMarker(signalement.id)">
        <ul class="icons-list">
          <li v-for="el in signalement[signalement._type]" :key="el.id" v-html="require('../assets/images/icons/signalements/' + el.icon + '.svg')"></li>
        </ul>
        <h2 v-if="signalement._type == 'symptomes'">Symptôme</h2>
        <h2 v-else-if="signalement._type == 'incidents'">Incident</h2>
        <h2 v-else>Signalement</h2>
        <div class="slide-details">
          <div class="details-left">
            <span v-if="signalement._timeAgo">Il y a {{ signalement._timeAgo }}</span>
          </div>
          <div class="details-right">
            <span class="signalement-adresse" v-html="require('../assets/images/icons/placeholder.svg') + ' à ' + getDistanceFromUser(signalement.lat, signalement.lng)"></span>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <div v-else class="slider-container__empty">
      <h2>Désolé</h2>
      <p>Il n'y a rien aux alentours...</p>
    </div>
  </div>

</template>

<script>

  import store from '../helpers/data/Store.js'
  import moment from 'moment'
  require('swiper/dist/css/swiper.css') // Swiper CSS
  import { swiper, swiperSlide } from 'vue-awesome-swiper' // Swiper Vue Component

  export default {
    components: {
      swiper,
      swiperSlide
    },

    data() {
      return {
        shared: store,
        swiperOption: {
          slidesPerView: 'auto',
          spaceBetween: 15,
          slidesPerGroup: 1,
          slidesOffsetBefore: 30,
          slidesOffsetAfter: 30,
          initialSlide: 0
        },
        slides: [],
        radius: 1000
      }
    },

    methods: {
      showMarker(id) {
        this.$router.push({path: '/signalements/' + id})
      },
      degreesToRadians(degrees) {
        return degrees * Math.PI / 180
      },
      getDistanceFromUser(lat, lng) {
        const earthRadiusKm = 6371
        var dLat = this.degreesToRadians(store.user_position[0] - lat)
        var dLon = this.degreesToRadians(store.user_position[1] - lng)

        var lat1 = this.degreesToRadians(store.user_position[0])
        var lat2 = this.degreesToRadians(lat)

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2)
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

        var distance = earthRadiusKm * c * 1000
        // 12km, 11km, 10km
        if (distance > 10000) {
          return parseInt(distance / 1000) + 'km'
        }
        // 1.2km, 1.1km, 1km
        if (distance > 1000) {
          return (parseInt(distance / 100) / 10) + 'km'
        }
        // 700m, 600m, 500m
        else if (distance > 500) {
          return (parseInt(distance / 100) * 100) + 'm'
        }
        // 499m, 498m, 497m
        else {
          return parseInt(distance) + 'm'
        }
      },
      refreshAround() {
        var data = {
          'lat': store.user_position[0],
          'lng': store.user_position[1],
          'radius': this.radius
        };

        axios.post(store.api_root + '/signalements/rayon', data).then(response => {
            this.slides = response.data;
            this.slides.forEach((el, index) => {
              var timeBetween = moment().diff(el.date, 'minute');
              if (timeBetween/60 > 24) {
                el._timeAgo = moment().diff(el.date, 'days') + 'j';
              } else if (timeBetween > 59) {
                el._timeAgo = moment().diff(el.date, 'hour') + 'h';
              } else if (timeBetween == 0) {
                el._timeAgo = moment().diff(el.date, 'seconds') + 'sec';
              } else {
                el._timeAgo = timeBetween + 'min';
              }

              if (el.symptomes.length > 0) {
                if (el.incidents.length > 0) {
                  el._type = 'both'
                } else {
                  el._type = 'symptomes'
                }
              } else {
                el._type = 'incidents'
              }
            });
          })
          .catch(error => {
            console.log('error: ', error.response.data);
          })
      }
    },

    mounted() {
      this.refreshAround()
      E.$on('user-location-updated', this.refreshAround)
    }
  }

</script>

<style lang="scss">

  .slider-container {
    position: fixed;
    z-index: 2003;
    bottom: 55px;
    left: 0;
    width: 100%;

    &__header {
      display: flex;
      justify-content: space-between;
      padding: 0 30px 10px;

      h2 {
        font-size: 18px;
        font-variant: none;
        color: $noir;
        line-height: normal;
      }
      select {
        background: #fff;
      }
    }

    &__empty {
      margin: 0 30px;
      margin-bottom: 25px;
      padding: 25px;
      height: 125px;
      background: $offline;
      border-radius: 8px;
      box-shadow: 5px 5px 20px 0 rgba(0, 0, 0, 0.15);
      h2, p {
        font-variant: none;
      }
      h2 {
        margin-bottom: 0;
      }
      p {
        margin: 0;
      }
    }

    #slider-marker {
      height: 150px;
      // width: calc(100% - 60px);
      // overflow: visible;

      .swiper-slide {
        padding: 25px;
        width: 205px !important;
        height: 125px;
        background: $undefined;
        border-radius: 8px;
        box-shadow: 5px 5px 20px 0 rgba(0, 0, 0, 0.15);

        &.symptomes {
          background: $symptomes;
        }
        &.incidents {
          background: $incidents;
        }

        .icons-list {
          list-style: none;
          padding: 0;
          margin: 0;
          margin-bottom: 10px;

          li {
            display: inline-block;
            margin-right: 5px;

            svg {
              height: 25px;
              fill: #fff;
            }
          }
        }

        h2 {
          margin: 0;
          font-variant: none;
          font-size: 18px;
          font-weight: normal;
          color: #fff;
        }

        .slide-details {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;

          .details {
            &-left, &-right {
              justify-content: flex-end;
              display: flex;
              flex-direction: column;
            }

            &-left {
              flex-grow: 1;

              span {
                font-style: italic;
                font-size: 12px;
              }
            }

            &-right {
              .signalement-adresse {
                font-size: 12px;

                svg {
                  width: 14px;
                  vertical-align: text-bottom;
                  fill: #fff;
                  margin-right: 2px;
                }
              }
            }
          }
        }
      }
    }
  }

</style>
