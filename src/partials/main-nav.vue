<template>
    <aside id="main-nav-wrapper" :class="popupShow ? ' popup-visible' : ''" v-show="show">
        <nav class="main-nav bottom-nav">
            <ul class="nav-items">
                <li v-for="item in navItems">
                    <router-link :to="item.url" :class="item.icon" :id="'link-' + item.name">
                        <img :src="item.image" :alt="item.name" />
                    </router-link>
                </li>
            </ul>
        </nav>

        <div class="popup-signalement">
            <div class="boutons-signalement-container">
                <button id="link-origine" @click="originClick">
                    <img src="../assets/images/icons/danger.svg" alt="Incident"> Signaler un incident
                </button>

                <span class="line"></span>

                <button id="link-symptome" @click="symptomeClick">
                    <img src="../assets/images/icons/lifeline.svg" alt="Symptome"> Signaler un symptôme
                </button>
            </div>
        </div>
    </aside>

</template>

<script>
  export default {
    data () {
        var navItems = [
            {name: 'carte', url: '/signalements/index', icon: 'map'},
            {name: 'signalement', url: '#', icon: 'plus'},
            {name: 'profil', url: '/profil', icon: 'avatar'}
        ]
        navItems.forEach(el => {
            el.image = require('../assets/images/icons/' + el.icon + '.svg');
        });

        return {
            navItems: navItems,
            popupShow: false,
            show: true,
            origineShow: false,
            symptomeShow: false,
        }

    },
    methods: {
        originClick() {
            this.origineShow = !this.origineShow;
            this.symptomeShow = false;
            E.$emit('origine-show', this.origineShow)
            E.$emit('symptome-show', this.symptomeShow)
        },
        symptomeClick() {
            this.symptomeShow = !this.symptomeShow;
            this.origineShow = false;
            E.$emit('origine-show', this.origineShow)
            E.$emit('symptome-show', this.symptomeShow)
        }
    },
    mounted () {
      E.$on('nav-show', (show) => {
        this.show = show
      })
      document.querySelector('#link-signalement').addEventListener('click', (e) => {
          e.preventDefault();
          this.popupShow = !this.popupShow;
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
        height: calc(30vh - 30px);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
        background: #fff;
        width: 100%;
        z-index: 2001;
        box-shadow: 10px 10px 20px 0 rgba(0,0,0,0.15);
        .popup-visible & {
            transform: translateY(0%);
        }
        .boutons-signalement-container {
            width: 65%;
            button {
                text-align: left;
                margin: 5px 0;
                color: $noir;
                img {
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
