
<template>

<div>

    
    <form v-show="sent===false" id="form-signalement" method="POST" action="" @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)">
    
        <h1>Comment vous <br>sentez-vous<br> aujourd'hui ?</h1>

        <signalement-symptome-form-group 
            v-for="category in shared.symptomes_categories"
            :category="category"
            :model="symptomes"
            :key="category.id"
        >
        </signalement-symptome-form-group>
        
        <div class="send-container">
            <button @click.prevent="onSubmit">Envoyer</button>    
        </div>
        
    </form>
    
    <div v-show="sent">
        <h1>Merci !</h1>
        <router-link to="/signalements/index" >retour vers la carte</router-link>
    </div>
   
</div>

</template>

<script>

    import Form from "../../helpers/form/Form.js"
    import moment from 'moment'

    Vue.component('signalement-symptome-form-group',require('../../partials/signalement-symptome-form-group.vue'));

    export default {
        data(){
            return {
                
                shared:store,
                form: new Form({
                    symptomes : [],
                    long:0,
                    lat:0,
                    created_at:0
                }),
                sending:false,
                sent:false,
                symptomes:[[],[],[],[],[],[],[]]

            }
        },
        
        methods:{

            onSubmit() {
                
                this.form.created_at = moment().format('Y-m-d H:i:s');
                this.form.lat = this.shared.user_position[0];
                this.form.long = this.shared.user_position[1];
                this.form.symptomes = this.flatten(this.symptomes);
                
                let s = (store.signalements.push(this.form.data()))-1;
               
                local.save("signalements");

                this.form.submit('post',appURL + '/api/v1/signalements')
                    .then((response) => {

                        this.sent = true;
                        store.signalements[s].id=response.id;
                        local.save("signalements");

                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            flatten(arr) {
                return arr.reduce( (flat, toFlatten) => {
                    return flat.concat(Array.isArray(toFlatten) ? this.flatten(toFlatten) : toFlatten);
                }, []);
            }
        },

        mounted(){
            this.$parent.classes="signalements-create";
            local.get("symptomes_categories")

            this.$parent.mapCenter = this.shared.user_position;
            this.$parent.mapZoom = 15;
        }
    }
</script>

<style lang="scss">


.page-signalement{
    padding-right:0px;
}
#form-signalement{

    h1{
        margin-bottom:50px;
    }

    .send-container{
        padding-right:70px;
    }
    button{
        margin-top:40px;
        margin-bottom:40px;
    }

}


</style>