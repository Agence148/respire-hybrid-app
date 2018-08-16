
<template>

<div>

    <h1>{{signalement.user.name}}</h1>
    <span>{{signalement.created_at}}</span>

    <div class="symp">
        <h3  v-for="cat in signalement.symptome_category">
            {{cat.description}}
            <div v-html="join(cat.symptomes)"></div>
        </h3>
    </div>

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
            }
        }
    },

    methods:{


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

    },
    methods:{
        join(arr){
            return " " +arr.join(", ") ;
        }
    }
}
</script>


<style lang="scss">

.page-signalement{
    padding-right:0px;
}
.symp{
    margin:30px 0 60px;
    span{
        color:#555;
    }
    h3{
        margin-bottom:10px;
    }
}

</style>
