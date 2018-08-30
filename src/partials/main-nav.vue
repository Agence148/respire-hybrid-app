<template>

  <aside id="main-nav-wrapper" :class="showPopupSignalement ? ' popup-visible' : ''" v-show="show">
    <nav class="main-nav bottom-nav">
      <ul class="nav-items">
        <li>
          <router-link to="/signalements/index" class="map" id="link-carte" v-html="require('../assets/images/icons/map.svg')" aria-labelledby="carte"></router-link>
        </li>
        <li :class="unclickable ? 'unclickable' : ''">
          <router-link to="#" class="plus" id="link-signalement" v-html="require('../assets/images/icons/plus.svg')" aria-labelledby="signalement"></router-link>
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

    <div v-if="unclickable" class="popup-error">
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
        document.querySelector('#link-signalement').addEventListener('click', (e) => {
          var popupError = document.querySelector('.popup-error')
              popupError.classList.add('show-error')
              setTimeout(() => {
                popupError.classList.remove('show-error')
              }, 2000);
        })
      },
      showPopupSignalements() {
        document.querySelector('#link-signalement').addEventListener('click', (e) => {
          e.preventDefault();
          E.$emit('nav-popup-show', !this.showPopupSignalement)
        })
      }
    },

    mounted () {
      E.$on('user-location-unavailable', (offline) => {
        this.unclickable = offline
        this.showPopupError()
      })
      E.$on('user-location-updated', (offline) => {
        this.unclickable = offline
        this.showPopupSignalements()
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
    transform: translateY(110%);
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

      li {
        width: 33.32%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;

        &:nth-child(2) {
          background: $violet;
          border-radius: 50px;
          width: 75px;
          height: 75px;
          left: 50%;
          transform: translateX(-50%);
          position: absolute;
          box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.15);
          &.unclickable {
            background: $offline;
          }
        }
        a {
          display: inline-block;
          vertical-align: top;
          padding: 13px 10px;
          line-height: 1;

          &.router-link-active {
            color: $principale;
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
    transform: translateY(-100%);
    transition: all 0.3s;
    h2, p {
      font-variant: none;
    }
    &.show-error {
      transform: translateY(0%);
    }
  }

</style>
