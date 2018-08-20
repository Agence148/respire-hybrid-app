<template>
    <div class="orphelins">
        <div class="text">
            <h2>Nous avons detecté {{shared.orphelins.length}} signalements</h2>
            <p>Voulez-vous récupérer vos signalements déjà effectués sur ce telephone ?</p>
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
                    if(!response.data.error) console.log('OK');
                    this.$router.push({path: 'signalement/index'});
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
                    if(!response.data.error) console.log('OK');
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
        padding: 60px 30px;
        .text {
            margin-bottom: 30px;
            h2 {
                margin-bottom: 20px;
            }
        }
        .button-container {
            display: flex;
            button {
                margin: 0 15px;
            }
        }
    }
</style>
