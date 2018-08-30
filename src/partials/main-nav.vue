<template>

  <aside id="main-nav-wrapper" :class="showPopupSignalement ? ' popup-visible' : ''" v-show="show">
    <nav class="main-nav bottom-nav">
      <ul class="nav-items">
        <li v-for="(item, index) in navItems" :key="index">
          <router-link :to="item.url" :class="item.icon" :id="'link-' + item.name" v-html="item.image" :aria-labelledby="item.name"></router-link>
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

    <div class="popup-error">
      <h2>Aucune connexion</h2>
      <p>Vous ne pouvez pas créer de signalement</p>
    </div>
  </aside>

</template>

<script>

  export default {
    data () {
      var navItems = [
        { name: 'carte', url: '/signalements/index', icon: 'map' },
        { name: 'signalement', url: '#', icon: 'plus' },
        { name: 'profil', url: '/profil', icon: 'avatar' }
      ]
      navItems.forEach(el => {
        el.image = require('../assets/images/icons/' + el.icon + '.svg');
      });

      return {
        navItems: navItems,
        showPopupSignalement: false,
        show: true,
      }
    },

    methods: {
      unclickableButton (unclickable) {
        if(unclickable) {
          var btnPlus = document.querySelector('.plus').parentElement,
              popupError = document.querySelector('.popup-error')
          btnPlus.classList.add('unclickable')
          btnPlus.addEventListener('click', () => {
            popupError.classList.add('show-error')
            setTimeout(() => {
              popupError.classList.remove('show-error')
            }, 2000);
            this.showPopupSignalement = false;
          })
        } else {
          document.querySelector('.plus').parentElement.classList.remove('unclickable')
        }
      }
    },

    mounted () {
      E.$on('user-location-unavailable', (offline) => {
        this.unclickableButton(offline)
      })
      E.$on('user-location-updated', (offline) => {
        this.unclickableButton(offline)
      })
      E.$on('nav-show', (show) => {
        this.show = show
      })
      E.$on('nav-popup-show', (show) => {
        this.showPopupSignalement = show
      })
      document.querySelector('#link-signalement').addEventListener('click', (e) => {
        e.preventDefault();
        E.$emit('nav-popup-show', !this.showPopupSignalement)
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
