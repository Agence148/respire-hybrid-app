<template>
    <nav class="main-nav bottom-nav" v-show="show">
        <ul>
            <li v-for="item in navItems">
                <router-link :to="item.url" :class="item.icon">{{item.name}}</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
  export default {
    data () {
      return {
        navItems: [
          {name: 'carte', url: '/signalements/index', icon: 'icon-map-o'},
          {name: 'signalement', url: '/signalements/create', icon: 'icon-dot-circled'},
          {name: 'profil', url: '/profil', icon: 'icon-user-outline'}
        ],
        show: false
      }

    },
    mounted () {
      E.$on('showMainNav', (show) => {
        this.show = show
      })
    }
  }
</script>

<style lang="scss">

    @import "../assets/scss/_vars.scss";
    @import "../assets/scss/helpers/_rem.scss";

    .bottom-nav {
        z-index: 10000;
        position: fixed;
        bottom: 0;
        left: 0;

        width: 100%;

        background: #fff;

        @include font-size(1.2);

        li {
            display: inline-block;
            width: 33.32%;
            text-align: center;
        }
        a {
            display: inline-block;
            vertical-align: top;
            padding: 8px 5px 2px;
            line-height: 1;

            &.router-link-active {
                color: $principale;
            }
        }
        [class^="icon-"]:before, [class*=" icon-"]:before {
            display: block;
            margin: 0 auto 8px;

            font-size: 220%;
        }
    }
</style>