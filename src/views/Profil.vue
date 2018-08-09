<template>
    <div class="profile">
       
        <h1>Bonjour <span>{{shared.user.name}}</span> !</h1>
        <div>{{shared.user.email}}</div>
        

        <button @click.prevent="logout" >Se déconnecter</button>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                shared:store
            }
        },
        methods : {
            logout(){
                store.authenticated = false;
            }
        },
        mounted(){

        }
    }
</script>

<style lang="scss">
    
.profile{
    padding:100px 70px;
    h1{
        text-transform: capitalize;
    }
    button{
        margin-top:60px;
    }
}

</style>