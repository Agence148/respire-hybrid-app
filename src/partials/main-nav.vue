<template>
    <nav class="main-nav bottom-nav" v-show="show">
        <ul class="nav-items">
            <li v-for="item in navItems">
                <router-link :to="item.url" :class="item.icon">
                    <img :src="item.image" :alt="item.name" />
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
  export default {
    data () {
        var navItems = [
            {name: 'carte', url: '/signalements/index', icon: 'map'},
            {name: 'signalement', url: '', icon: 'plus'},
            {name: 'profil', url: '/profil', icon: 'avatar'}
        ]
        navItems.forEach(el => {
            el.image = require('../assets/images/icons/' + el.icon + '.svg');
        });
        
        return {
            navItems: navItems,
            show: false
        }

    },
    mounted () {
      E.$on('nav-show', (show) => {
        this.show = show
      })
    }
  }
</script>

<style lang="scss">
    @import "../assets/scss/helpers/_rem.scss";

    .bottom-nav {
        z-index: 10000;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background: #fff;
        border-top: 2px solid $gris-clair;

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
                }
                a {
                    display: inline-block;
                    vertical-align: top;
                    padding: 13px 10px;
                    line-height: 1;
        
                    &.router-link-active {
                        color: $principale;
                    }
                    img{
                        width: 100%;
                        height:auto;
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
</style>
