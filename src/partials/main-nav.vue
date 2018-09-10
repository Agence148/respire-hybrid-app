<template>

  <aside id="main-nav-wrapper" :class="showPopupSignalement ? ' popup-visible' : ''" v-show="show">
    <nav class="main-nav bottom-nav">
      <ul class="nav-items">
        <li>
          <router-link to="/signalements/index" class="map" id="link-carte" v-html="require('../assets/images/icons/map.svg')" aria-labelledby="carte"></router-link>
        </li>
        <li :class="unclickable ? 'unclickable' : ''">
          <button class="plus" id="link-signalement" @click="showPopups" v-html="require('../assets/images/icons/plus.svg')" aria-labelledby="signalement"></button>
        </li>
        <li>
          <router-link to="/profil" class="avatar" id="link-profil" v-html="require('../assets/images/icons/avatar.svg')" aria-labelledby="profil"></router-link>
        </li>
      </ul>
    </nav>

    <div class="popup-signalement">
      <div class="boutons-signalement-container">
        <router-link to="/signalements/create/incident" v-html="require('../assets/images/icons/danger.svg') + 'Signaler un incident'"></router-link>
        <span class="line"></span>
        <router-link to="/signalements/create/symptome" v-html="require('../assets/images/icons/lifeline.svg') + 'Signaler un symptôme'"></router-link>
      </div>
    </div>

    <div v-if="unclickable" class="popup-error" ref="popupError">
      <h2>Aucune connexion</h2>
      <p>Vous ne pouvez pas créer de signalement</p>
    </div>
  </aside>

</template>

<script>

  export default {
    data () {
      return {
        showPopupSignalement: false,
        show: true,
        unclickable: false,
      }
    },

    methods: {
      showPopupError () {
        this.$refs.popupError.classList.add('show-error')
        setTimeout(() => {
          this.$refs.popupError.classList.remove('show-error')
        }, 2000);
      },
      showPopupSignalements() {
        E.$emit('nav-popup-show', !this.showPopupSignalement)
      },
      showPopups() {
        this.unclickable ? this.showPopupError() : this.showPopupSignalements()
      }
    },

    mounted () {
      E.$on('user-location-unavailable', (offline) => {
        this.unclickable = offline
      })
      E.$on('user-location-updated', (offline) => {
        this.unclickable = offline
      })
      E.$on('nav-show', (show) => {
        this.show = show
      })
      E.$on('nav-popup-show', (show) => {
        this.showPopupSignalement = show
      })
    }
  }
</script>

<style lang="scss">

  @import "../assets/scss/helpers/_rem.scss";

  .popup-signalement {
    position: fixed;
    bottom: 50px;
    left: 0;
    transform: translateY(130%);
    transition: all .5s;
    height: calc(30vh - 15px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    background: #fff;
    width: 100%;
    z-index: 2010;
    box-shadow: 10px 10px 20px 0 rgba(0,0,0,0.15);

    .popup-visible & {
      transform: translateY(0%);
    }
    .boutons-signalement-container {
      width: 65%;

      a {
        display: block;
        color: $noir;
        padding: 1em;
        text-align: center;
        font-size: 14px;

        svg  {
          width: 24px;
          margin-right: 10px;
        }
      }
      .line {
        background: rgba(151, 151, 151, 0.25);
        height: 1px;
        width: 85%;
        margin: auto;
        display: block;
      }
    }
  }

  .bottom-nav {
    z-index: 10000;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    border-top: 1px solid $gris-clair;

    @include font-size(1.2);

    .nav-items {
      width: 80%;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      align-content: center;
      align-items: center;
      justify-content: space-between;
      overflow: visible;
      position: relative;

      li {
        width: 33.32%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;

        &:nth-child(2) {
          background: $rouge;
          border-radius: 50px;
          width: 75px;
          height: 75px;
          left: 50%;
          transform: translateX(-50%);
          position: fixed;
          box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.15);
          #link-signalement {
            padding: 13px 10px;
            background: none;
            svg {
              width: 24px;
              height: 24px;
            }
          }
          &.unclickable {
            background: $offline;
          }
        }
        a {
          display: inline-block;
          vertical-align: top;
          padding: 13px 10px;
          line-height: 1;
          position: relative;
          transition: all .3s;
          opacity: 0.3;
          overflow: hidden;

          &.router-link-active {
            opacity: 1;
            &::before {
              content: '';
              position: absolute;
              top: -5px;
              left: 50%;
              transform: translateX(-50%);
              width: 10px;
              height: 10px;
              background: $principale;
              border-radius: 50px;
            }
          }
          svg {
            width: 24px;
            height: 24px;
          }
        }
      }

      [class^="icon-"]:before, [class*=" icon-"]:before {
        display: block;
        margin: 0 auto 8px;
        font-size: 220%;
      }
    }
  }

  .popup-error {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 30px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    z-index: 3000;
    background: $offline;
    box-shadow: 10px 10px 20px 0 rgba(0,0,0,0.15);
    transform: translateY(-130%);
    transition: all 0.3s;
    h2, p {
      font-variant: none;
    }
    &.show-error {
      transform: translateY(0%);
    }
  }

</style>
