<template>
    
</template>

<script>
    export default {
        
        methods : {
            
            getLatestSignalements(){
                
                const url = appURL + "/api/v1/signalements";
                const AuthStr = 'Bearer '.concat(store.user.api_token);
                
                axios.get(url,{ headers: { Authorization: AuthStr }})
                    .then(response => {
                        this.$parent.liste = response.data;
                    })
                    .catch(error => {
                        if (error.response) {
                            if(error.response.status === 401){
                                this.shared.authenticated = false;
                            }
                        }
                    });
            }
        },
        mounted(){
            this.$parent.classes="signalements-index";
            this.getLatestSignalements();

            this.$parent.mapCenter = store.user_position;
            this.$parent.mapZoom = 12;
        }
    }
</script>