<template>
    <div class="signalement-incidents">
        <h1>Signaler un incident</h1>
        <ul class="vertical-step">
            <li class="step-item" id="open-popup">Quel est l'incident ?</li>
            <li class="step-item not-ready">Commentaire</li>
        </ul>
        <div class="incidents-popup">
            <input type="radio" name="incidents" id="smoke">
            <label for="incidents" v-html="require('../assets/images/icons/signalements/smoke.svg') + 'Fumée'"></label>
            <input type="radio" name="incidents" id="congestion">
            <label for="incidents" v-html="require('../assets/images/icons/signalements/congestion.svg') + 'Embouteillage'"></label>
            <!-- <input type="radio" name="incidents" id="smell">
            <label for="incidents" v-html="require('../assets/images/icons/signalements/smell.svg') + 'Odeur'"></label>  -->
            <input type="radio" name="incidents" id="burning">
            <label for="incidents" v-html="require('../assets/images/icons/signalements/burning.svg') + 'Incendie'"></label>
        </div>
    </div>
    
</template>

<script>

    import store from '../helpers/data/Store.js'

    export default {
        data() {
            return {
                shared:store,
            }
        },
        methods: {

        }
    }
</script>

<style lang="scss">
    .signalement-incidents {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        .vertical-step {
            padding: 0;
            margin: 30px 0;
            list-style: none;
            position: relative;
            padding-left: 50px;
            height: 45vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            &::before {
                display: inline-block;
                content: '';
                position: absolute;
                top: 30px;
                left: 15px;
                height: calc(100% - 70px);
                border-left: 2px dashed #fff;
            }
            .step-item {
                position: relative;
                font-size: 14px;
                &:last-child {
                    bottom: 0;
                }
                // counter-increment: list;
                &::after {
                    content: '';
                    display: inline-block;
                    position: absolute;
                    top: -7px;
                    left: -47px;
                    width: 26px;
                    height: 26px;
                    border: 2px solid #fff;
                    border-radius: 50%;
                    background-color: transparent;
                }
                &.not-ready {
                    opacity: .5;
                }
                &.is-done {
                    &::before {
                        border-left: 2px solid green;
                    }
                    &::after {
                        content: "✔";
                        font-size: 10px;
                        color: #FFF;
                        text-align: center;
                        border: 2px solid green;
                        background-color: green;
                    }
                }
            }
        }
        .incidents-popup {
            display: flex;
            flex-direction: row;
            input[type=radio]:not(:checked),
            input[type=radio]:checked {
                display: none;
            }
            input[type=radio]:checked {
                label::before {
                    background-image: url('../assets/images/icons/check.svg');
                }
            }
            label {
                display: flex;
                flex-direction: column;
                position: relative;
                padding: 10px;
                text-align: center;
                font-size: 12px;
                cursor: pointer;

                &:before {
                    content: "";
                    position: absolute;
                    right: 0;
                    width: 24px;
                    height: 24px;
                    margin: 0 auto 12px;
                    border-radius: 50px;
                }
                svg {
                    height: 45px;
                    fill: #fff;
                }
            }
        }
    }
</style>

