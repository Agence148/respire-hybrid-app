
<template>

<div class="signalement-details">

    <div class="modal-header">
        <router-link to="/signalements/index?center" class="back-arrow" v-html="require('../../assets/images/icons/back.svg')" aria-labelledby="Retour"></router-link>

        <ul class="signalement-icons">
            <li v-for="incident in signalement.incidents" :key="incident.id" v-html="require('../../assets/images/icons/signalements/' + incident.icon + '.svg')"></li>
            <li v-for="symptome in signalement.symptomes" :key="symptome.id" v-html="require('../../assets/images/icons/signalements/' + symptome.icon + '.svg')"></li>
        </ul>
    </div>

    <div class="modal-container">
        <div>
            <span>Il y a {{ timeAgo }}</span>
            <h1 v-if="signalement.user">{{signalement.user.name}}</h1>
            <h1 v-else>Origine iconnue</h1>
            <span class="signalement-adresse" v-html="require('../../assets/images/icons/placeholder.svg')" aria-labelledby="Adresse"> Une adresse inconnue</span>
        </div>

        <button class="open-details" v-html="require('../../assets/images/icons/menu.svg')" aria-labelledby="menu"></button>
    </div>

    <ul class="details">
        <li v-for="incident in signalement.incidents" :key="incident.id" v-html="incident.title" class="details-incidents">
            <!-- <div v-html="join(signal.description)"></div> -->
        </li>
        <li v-for="symptome in signalement.symptomes" :key="symptome.id" v-html="symptome.title_combined" class="details-symptomes">
            <!-- <div v-html="join(signal.description)"></div> -->
        </li>
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

    methods:{


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

        const url = appURL + "/api/v1/signalements/" + this.$route.params.id;

        axios.get(url)
            .then(response => {
                this.$parent.liste = [response.data];
                this.signalement = response.data;
                E.$emit('map-locate-report', response.data);
            })
            .catch(error => {
                if (error.response) {
                    if(error.response.status === 401){
                        this.shared.authenticated = false;
                    }
                }
            });

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
    methods:{
        // join(arr){
        //     return " " + arr.join(', ') ;
        // }



    }
}
</script>


<style lang="scss">

.signalement-details{
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
        &-incidents, &-symptomes {
            margin: 0;
            font-size: 14px;
            &::before {
                content: '-';
                padding-right: 8px;
                color: $violet;
            }
        }
        span{
            color:#555;
        }
        h3{
                color: $noir;
            margin-bottom:10px;
        }
    }
}

</style>
