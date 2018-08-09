<template>

<div class="startup-screen">
	<div class="fixed-middle">
		<img src="../assets/images/logo-big.png" alt="">
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