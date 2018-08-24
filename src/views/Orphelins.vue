<template>
    <div class="orphelins">
        <div class="text">
            <div v-if="shared.orphelins.length > 1">
                <h2>Nous avons detecté <br/>{{shared.orphelins.length}} signalements</h2>
                <p>Voulez-vous récupérer vos signalements déjà effectués sur ce telephone ?</p>
            </div>
            <div v-else>
                <h2>Nous avons detecté <br/>1 signalement</h2>
                <p>Voulez-vous récupérer ce signalement déjà effectués sur ce telephone ?</p>
            </div>
        </div>
        <div class="button-container">
            <button @click="onYes">Oui</button>
            <button @click="onNo">Non</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
      return {
        shared: store,
      }
    },

    methods: {
        onYes() {
            const AuthStr = 'Bearer '.concat(store.user.api_token),
                url = appURL + '/api/v1/signalements/' + this.shared.uuid + '/lier';

            axios.post(url, this.shared.user.signalements, {headers: {Authorization: AuthStr}})
                .then(response => {
                  this.$router.push({path: '/signalements/index'});
                })
                .catch(error => {
                    console.log('error.response.data: ', error.response.data);
                })
        },
        onNo() {
            const AuthStr = 'Bearer '.concat(store.user.api_token),
                url = appURL + '/api/v1/signalements/' + this.shared.uuid + '/anonymiser';

            axios.post(url, this.shared.user.signalements, {headers: {Authorization: AuthStr}})
                .then(response => {
                  this.$router.push({path: '/signalements/index'});
                })
                .catch(error => {
                    console.log('error.response.data: ', error.response.data);
                })
        },
    }
}
</script>

<style lang="scss">
    .orphelins {
        padding: 50px 30px;
        background: #fff;
        height: 55vh;
        position: fixed;
        bottom: 0;
        box-shadow: 10px 10px 20px 0 rgba(0, 0, 0, .15);
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        .text {
            margin-bottom: 30px;
            color: $noir;
            h2 {
                color: $violet;
                margin-bottom: 20px;
                font-variant: none;
            }
        }
        .button-container {
            display: flex;
            button {
                background: $violet;
                color: #fff;
                border-radius: 8px;
                margin: 0 15px;
            }
        }
    }
</style>
