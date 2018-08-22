
<template>

<div class="signalement-details">

    <div class="modal-header">
        <router-link to="/signalements/index" class="back-arrow"><img src="../../assets/images/icons/back.svg" alt="Retour"></router-link>

        <!-- <ul class="signalement-icons">
            <li v-for="origines in signalement.origines" :key="origines.id">{{ origines.id }}</li>
            <li v-for="symptome in signalement.symptomes" :key="symptome.id">{{ symptome.id }}</li>
        </ul> -->
    </div>

    <div class="modal-container">   
        <div>
            <span v-if="timeAgo > 59">Il y a {{ Math.round(timeAgo/60) }}h</span>
            <span v-else>Il y a {{ timeAgo }}</span>
            <h1 v-if="signalement.user">{{signalement.user.name}}</h1>
            <h1 v-else>Origine iconnue</h1>
            <span class="signalement-adresse"><img src="../../assets/images/icons/placeholder.svg" alt="Adresse"> Une adresse inconnue</span>
        </div>

        <button class="open-details"><img src="../../assets/images/icons/menu.svg" alt="menu"></button>
    </div>

    <ul class="details">
        <li v-for="origines in signalement.origines" :key="origines.id" v-html="origines.description" class="details-origines">
            <!-- <div v-html="join(signal.description)"></div> -->
        </li>
        <li v-for="symptome in signalement.symptomes" :key="symptome.id" v-html="symptome.description" class="details-symptomes">
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
        if (timeBetween/60 > 23) {
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
        const AuthStr = 'Bearer '.concat(store.user.api_token);

        axios.get(url,{ headers: { Authorization: AuthStr }})
            .then(response => {
                this.$parent.liste = [response.data];
                this.$parent.mapCenter = [response.data.lat,response.data.lng];
                this.$parent.mapZoom = 15;
                this.signalement = response.data;
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
            }
        }
    }
    .modal-container {
        display: flex;
        flex-direction: row;
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
                img {
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
        &-origines, &-symptomes {
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
