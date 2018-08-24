
<template>

<div class="signalement-details">

    <div class="modal-header">
        <router-link to="/signalements/index" class="back-arrow" v-html="require('../../assets/images/icons/back.svg')" aria-labelledby="Retour"></router-link>

        <ul class="signalement-icons">
            <li v-for="incident in signalement.incidents" :key="incident.id" v-html="require('../../assets/images/icons/signalements/' + incident.icon + '.svg')"></li>
            <li v-for="symptome in signalement.symptomes" :key="symptome.id" v-html="require('../../assets/images/icons/signalements/' + symptome.icon + '.svg')"></li>
        </ul>
    </div>

    <div class="modal-container">
        <div>
            <span>Il y a {{ timeAgo }}</span>
            <h1 v-if="signalement._type == 'symptomes'">Symptôme</h1>
            <h1 v-else-if="signalement._type == 'incidents'">Incident</h1>
            <h1 v-else>Signalement</h1>
            <span class="signalement-adresse" v-html="require('../../assets/images/icons/placeholder.svg') + ' ' + getDistanceFromUser(signalement.lat, signalement.lng)" aria-labelledby="Adresse"></span>
        </div>

        <button class="open-details" v-html="require('../../assets/images/icons/menu.svg')" aria-labelledby="menu"></button>
    </div>

    <ul class="details">
        <li v-for="incident in signalement.incidents" :key="incident.id" v-html="incident.title" class="details-incidents"></li>
        <li v-for="symptome in signalement.symptomes" :key="symptome.id" v-html="symptomeCombinedTitle(symptome)" class="details-symptomes"></li>
    </ul>

</div>

</template>


<script>

  import moment from 'moment'

  export default {
    data(){
      return {
        shared:store,
        signalement:{
          user:{},
          symptome_category:{}
        },
        timeAgo: '',
      }
    },

    beforeUpdate() {
        axios.get(appURL + "/api/v1/signalements/" + this.$route.params.id)
            .then(response => {
            this.$parent.liste = [response.data];
            this.signalement = response.data;
            E.$emit('map-locate-report', response.data);

            setTimeout(() => {
                document.querySelector('.view .signalement-details').classList.add('modal-show');
            }, 100)
            })
            .catch(error => {
                if (error.response) {
                    if(error.response.status === 401){
                    this.shared.authenticated = false;
                    }
                }
            });
    },

    updated() {
      var timeBetween = moment().diff(this.signalement.date, 'minute');
      if (timeBetween/60 > 24) {
          this.timeAgo = moment().diff(this.signalement.date, 'days') + 'j';
      } else if (timeBetween > 59) {
          this.timeAgo = moment().diff(this.signalement.date, 'hour') + 'h';
      } else {
          this.timeAgo = timeBetween + 'min';
      }



    },

    mounted(){
      this.$parent.classes="signalements-show";

      axios.get(appURL + "/api/v1/signalements/" + this.$route.params.id)
        .then(response => {
          this.$parent.liste = [response.data];
          this.signalement = response.data;

          if (signalement.symptomes.length > 0) {
            if (signalement.incidents.length > 0) {
              signalement._type = 'both'
            } else {
              signalement._type = 'symptomes'
            }
          } else {
            signalement._type = 'incidents'
          }

          E.$emit('map-locate-report', response.data);

          setTimeout(() => {
            document.querySelector('.view .signalement-details').classList.add('modal-show');
          }, 100)

        })
        .catch(error => {
          if (error.response) {
            if(error.response.status === 401){
              this.shared.authenticated = false;
            }
          }
        })

      var btn = document.querySelector(".open-details");
      var content = document.querySelector(".details");
      btn.addEventListener("click", function() {
        this.classList.toggle("open");
        if (content.style.maxHeight){
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    },

    methods: {
      symptomeCombinedTitle(symptome) {
        return symptome.symptome_category.title_combined.replace('...', symptome.title_combined)
      },
      degreesToRadians(degrees) {
        return degrees * Math.PI / 180
      },
      getDistanceFromUser(lat, lng) {
        const earthRadiusKm = 6371
        var dLat = this.degreesToRadians(this.shared.user_position[0] - lat)
        var dLon = this.degreesToRadians(this.shared.user_position[1] - lng)

        var lat1 = this.degreesToRadians(this.shared.user_position[0])
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
      }
    }
  }

</script>


<style lang="scss">

  .signalement-details {
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2002;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    padding: 30px;
    transform: translateY(-100%);
    transition: all .3s;
    transition-delay: .5s;
    &.modal-show {
        transform: translateY(0%);
    }
    .back-arrow {
        display: inline-block;
        margin-bottom: 10px;
        svg {
          width: 20px;
        }
    }
    .modal-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-content: center;
        .signalement-icons {
            padding: 0;
            margin: 0;
            color: $violet;
            list-style: none;
            display: inline-block;
            li {
                display: inline-block;
                margin-left: 5px;
                svg {
                    height: 30px;
                }
            }
        }
    }
    .modal-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        div {
            flex-grow: 1;
            h1 {
                color: $violet;
                font-size: 24px;
                font-variant: inherit;
            }
            span {
                color: $noir;
                font-style: italic;
                font-size: 12px;
                color: $gris;
            }
            .signalement-adresse {
                svg {
                  height: 15px;
                  vertical-align: text-bottom;
                }
            }
        }
        .open-details {
            padding: 0;
            width: 50px;
            height: 50px;
            border-radius: 50px;
            font-size: 0;
            transition: all .3s;

            svg {
              width: 20px;
            }
            &.open {
                background: rgba($color: $noir, $alpha: 0.05);
            }
        }
    }
    .details{
      max-height: 0;
      overflow: hidden;
      transition: max-height .2s ease-out;
      color: $violet;
      padding: 0;
      margin: 5px 0;
      list-style-type: none;

      &-incidents,
      &-symptomes {
        margin: 0;
        font-size: 14px;
        &::before {
          content: '-';
          padding-right: 8px;
          color: $violet;
        }
      }
      h3{
        color: $noir;
        margin-bottom:10px;
      }
    }
  }

</style>
