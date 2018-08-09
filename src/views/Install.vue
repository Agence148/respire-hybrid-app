<template>

<div class="install">
    <div class="fixed-middle">
        <h2>Installation</h2>
        Ajoutez cette page sur l'écran d'accueil
    </div>
</div>

</template>

<script>

export default {
    mounted() {
        console.log('Home mounted.')
    }
}

</script>

<style lang="scss">
    
.startup-screen{
    .fixed-middle{
        width: 140px;
        height:140px;
        padding:16px 20px 20px 18px;

        background: #fff;
        border-radius:100px;
    }
    img{
        width: 100%;
        height:auto;
    }
}

</style>