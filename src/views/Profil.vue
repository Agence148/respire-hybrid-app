<template>

  <div class="profile">
    <!-- <h1 v-if="shared.user.api_token">Bonjour <span>{{ shared.user.name }}</span> !</h1> -->
    <router-link to="/signalements/index" class="back-arrow" v-html="require('../assets/images/icons/back.svg')" aria-labelledby="Retour"></router-link>
    <div v-if="shared.user.signalements && shared.user.signalements.length > 0">
      <h2>Historique <br/> de signalement</h2>
      <ul class="signalement-container">
        <li v-for="signalement in shared.user.signalements" :key="signalement.id">
          <div class="signalement-infos">
            <span :class="'signalement-date ' + (signalement.symptomes.length > 0 ? 'symptomes' : 'incidents')" v-html="formatDate(signalement.date)"></span>
            <div class="infos-right">
              <ul :class="'signalement-icons ' + (signalement.symptomes.length > 0 ? 'symptomes' : 'incidents')">
                <li v-for="incident in signalement.incidents" :key="incident.id" v-html="require('../assets/images/icons/signalements/' + incident.icon + '.svg')"></li>
                <li v-for="symptome in signalement.symptomes" :key="symptome.id" v-html="require('../assets/images/icons/signalements/' + symptome.icon + '.svg')"></li>
              </ul>
              <button class="open-collapse" v-html="require('../assets/images/icons/menu.svg')" aria-labelledby="menu"></button>
            </div>
          </div>
          <div class="collapse">
            <router-link :to="'/signalements/' + signalement.id" v-html="require('../assets/images/icons/map.svg') + ' Voir sur la carte'"></router-link>
            <!-- <button class="btn" v-html="require('../assets/images/icons/close.svg') + ' Supprimer le signalement'" aria-labelledby="Supprimer"></button> -->
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

    <!-- <div v-if="shared.user.api_token">
      <button @click.prevent="logout" >Se déconnecter</button>
    </div>
    <div v-else>
      <router-link to="/login" class="link--login">Se connecter</router-link>
      <router-link to="/register" class="link--register">Créer mon compte</router-link>
    </div> -->
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
      setTimeout(() => {
        document.querySelector('.profile').classList.add('show')
      }, 20)

      let btn = document.querySelectorAll('.open-collapse');
      let content = document.querySelectorAll('.collapse');
      for(let i = 0; i < btn.length; i++) {
        btn[i].addEventListener('click', function() {
            btn[i].classList.toggle('open');
            if (content[i].style.maxHeight){
                content[i].style.maxHeight = null;
            } else {
                content[i].style.maxHeight = content[i].scrollHeight + 'px';
            }
        });
      }
    }
  }

</script>

<style lang="scss">

  .profile {
    transform: translateX(100%);
    transition: .3s;
    padding: 50px 30px;
    background: #fff;
    bottom: 0;
    width: 100%;
    position: fixed;
    box-shadow: 10px 10px 20px 0 rgba(0, 0, 0, .15);
    &.show {
      transform: translateX(0%);
    }
    h1 {
      font-size: 26px;
      color: $violet;
    }
    h2 {
      font-size: 24px;
      color: $violet;
      font-variant: none;
    }

    .back-arrow {
        display: inline-block;
        margin-bottom: 10px;
        svg {
          width: 20px;
        }
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
        & + p {
          color: $violet;
          text-align: center;
        }
      }
    }

    .signalement {
      &-container {
        list-style: none;
        padding: 0;
        margin: 0;
        margin-bottom: 10px;
        li {
          padding-top: 10px;
          padding-bottom: 9px;
          border-bottom: 1px solid $gris-clair;
          line-height: 1;
          &:last-child {
            border: none;
          }
        }
        .collapse {
          max-height: 0;
          overflow: hidden;
          transition: max-height .2s ease-out;
          a, .btn {
            font-size: 14px;
            color: $gris;
            display: block;
            margin-bottom: 5px;
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
          display: flex;
          align-items: center;
          .signalement-icons {
            padding: 0;
            margin-right: 10px;
            height: 25px;
            &.symptomes {
              li {
                svg {
                  fill: $symptomes;
                }
              }
            }
            &.incidents {
              li {
                svg {
                  fill: $incidents;
                }
              }
            }
            li {
              padding: 0;
              border: none;
              display: inline-block;
              margin-right: 5px;
              line-height: 1;
              svg {
                height: 25px;
              }
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
              fill: $gris;
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
          background: $violet;
          margin-left: 0;
          margin-right: 10px;
        }
        &.symptomes::before {
          content: '';
          width: 10px;
          height: 10px;
          border-radius: 50px;
          display: inline-block;
          background: $symptomes;
          margin-left: 0;
          margin-right: 10px;
        }
        &.incidents::before {
          content: '';
          width: 10px;
          height: 10px;
          border-radius: 50px;
          display: inline-block;
          background: $incidents;
          margin-left: 0;
          margin-right: 10px;
        }
      }
    }
  }

  @media screen and (max-width: 350px) {
    .profile {
        .signalement {
          &-infos {
            .infos-right {
              .open-collapse {
                width: 40px;
                height: 40px;
                svg {
                  width: 16px;
                  height: 5px;
                }
              }
              .signalement-icons {
                margin-right: 5px;
                li {
                  margin: 0 2px;
                  svg {
                    height: 20px;
                  }
                }
              }
            }
          }
        }
    }
  }

</style>
