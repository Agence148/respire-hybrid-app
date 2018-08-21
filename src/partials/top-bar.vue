<template>

    <div class="top-bar">
        <div class="top-bar-left">
            <button class="btn">
                <img src="../assets/images/icons/gps.svg" alt="Geolocalisation">
            </button>
        </div>
        <div class="top-bar-center">
            <button class="btn">
                <img src="../assets/images/icons/layers.svg" alt="Heat map">
            </button>
        </div>
        <div class="top-bar-right">
            <button class="btn">
                <img src="../assets/images/icons/info.svg" alt="Informations">
            </button>
        </div>
    </div>

</template>

<script>
export default {
    
}
</script>


<style lang="scss">
    .top-bar {
        z-index: 2000;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        padding: 30px 20px;
        display: flex;
        flex-direction: row;

        &-left, &-right, &-center {
            text-align: center;
            display: inline-block;
            margin: 0 10px;
            .btn {
                padding: 0;
                font-family: sans-serif;
                width: 50px;
                height: 50px;
                border-radius: 50px;
                box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.15);
                img {
                    width: 22px;
                }
            }
        }

        &-left {
            .btn {
                img {
                    width: 24px;
                }
            }
        }
        
        &-center {

        }

        &-right {
            position: absolute;
            right: 20px;
            opacity: 0.65;
            .btn {
                box-shadow: none;
            }
        }

        a {
            color: #fff;
        }
    }

</style>