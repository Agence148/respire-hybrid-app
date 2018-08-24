<template>

  <div class="profile">
    <h1 v-if="shared.user.api_token">Bonjour <span>{{ shared.user.name }}</span> !</h1>
    <div v-if="shared.user.signalements.length > 0">
      <h2>Historique <br/> de signalement</h2>
      <ul class="signalement-container">
        <li v-for="signalement in shared.user.signalements" :key="signalement.id">
          <div class="signalement-infos">
            <span class="signalement-date" v-html="formatDate(signalement.date)"></span>
            <div class="infos-right">
              <ul class="signalement-icons">
                <li v-for="incident in signalement.incidents" :key="incident.id" v-html="require('../assets/images/icons/signalements/' + incident.icon + '.svg')"></li>
                <li v-for="symptome in signalement.symptomes" :key="symptome.id" v-html="require('../assets/images/icons/signalements/' + symptome.icon + '.svg')"></li>
              </ul>
              <button class="open-collapse" v-html="require('../assets/images/icons/menu.svg')" aria-labelledby="menu"></button>
            </div>
          </div>
          <div class="collapse">
            <router-link :to="'/signalements/' + signalement.id" v-html="require('../assets/images/icons/map.svg') + ' Voir sur la carte'"></router-link>
            <button class="btn" v-html="require('../assets/images/icons/close.svg') + ' Supprimer le signalement'" aria-labelledby="Supprimer"></button>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <span class="cross-icon">&#10008;</span>
      <h2>Aucun signalement</h2>
      <p>Vous n'avez aucun signalement...</p>
      <!-- <router-link :to="'/signalements/create'" class="create-signalement">Créez un signalement</router-link> -->
    </div>

    <div v-if="shared.user.api_token">
      <button @click.prevent="logout" >Se déconnecter</button>
    </div>
    <div v-else>
      <router-link to="/login" class="link--login">Se connecter</router-link>
      <router-link to="/register" class="link--register">Créer mon compte</router-link>
    </div>
  </div>

</template>

<script>

  import moment from 'moment'

  export default {
    data() {
      return {
        shared: store
      }
    },
    methods : {
      logout() {
        store.authenticated = false;
      },
      formatDate(date) {
        return moment(date).locale('fr').format('D MMMM YYYY');
      }
    },
    mounted(){
      var btn = document.querySelector(".open-collapse");
      var content = document.querySelector(".collapse");
      btn.addEventListener("click", function() {
          this.classList.toggle("open");
          if (content.style.maxHeight){
              content.style.maxHeight = null;
          } else {
              content.style.maxHeight = content.scrollHeight + "px";
          }
      });
    }
  }

</script>

<style lang="scss">

  .profile {
    padding: 50px 30px;
    background: #fff;
    transform: translateY(7%);
    box-shadow: 10px 10px 20px 0 rgba(0, 0, 0, .15);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    h1 {
      font-size: 26px;
      color: $violet;
    }
    h2 {
      font-size: 24px;
      color: $violet;
      font-variant: none;
    }

    .cross-icon {
      text-align: center;
      display: block;
      font-size: 4em;
      color: $violet;
      
      & + h2 {
        text-align: center;
        font-size: 24px;
        color: $violet;
      }
    }

    .signalement {
      &-container {
        list-style: none;
        padding: 0;
        margin: 0;
        li {
          padding-top: 30px;
          padding-bottom: 29px;
          border-bottom: 1px solid $gris-clair;
          line-height: 1;
        }
        .collapse {
          max-height: 0;
          overflow: hidden;
          transition: max-height .2s ease-out;
          a, .btn {
            font-size: 14px;
            color: $gris;
            display: block;
          }
          .btn{
            padding: 0;
            margin-top: 15px;
            width: auto;
          }
          svg {
            width: 18px;
            fill: $gris;
            margin-right: 7px;
            vertical-align: text-bottom;
          }
        }
      }
      &-infos {
        display: flex;
        flex-direction: row;
        align-items: center;
        .infos-right {
          .signalement-icons {
            li svg {
              width: 24px;
            }
          }
          .open-collapse {
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
      }
      &-date {
        color: $noir;
        font-size: 14px;
        flex-grow: 1;
        &::before {
          content: '';
          width: 10px;
          height: 10px;
          border-radius: 50px;
          display: inline-block;
          background: $rouge;
          margin-left: 0;
          margin-right: 12px;
        }
      }
    }
  }

</style>
