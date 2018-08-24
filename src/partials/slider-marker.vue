<template>
    <div class="slider-container">
        <h2>Autour de moi...</h2>
        <swiper :options="swiperOption" id="slider-marker">
            <swiper-slide v-for="signalement in slides" :key="signalement.id" :class="signalement._type" @click.prevent="showMarker(signalement.id)">
                <ul class="icons-list">
                    <li v-for="el in signalement[signalement._type]" :key="el.id" v-html="require('../assets/images/icons/signalements/' + el.icon + '.svg')">
                    </li>
                </ul>
                <h2 v-if="signalement._type == 'symptomes'">Symptôme</h2>
                <h2 v-else-if="signalement._type == 'incidents'">Incident</h2>
                <h2 v-else>Signalement</h2>
                <div class="slide-details">
                    <div class="details-left">
                        <span v-if="signalement._timeAgo">Il y a {{ signalement._timeAgo }}</span>
                    </div>
                    <div class="details-right">
                        <span class="signalement-adresse" v-html="require('../assets/images/icons/placeholder.svg') + ' à 500m'">
                        </span>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>

    import store from '../helpers/data/Store.js'
    import moment from 'moment'
    require('swiper/dist/css/swiper.css') // Swiper CSS
    import { swiper, swiperSlide } from 'vue-awesome-swiper' // Swiper Vue Component

    export default {
        components: {
            swiper,
            swiperSlide
        },
        data() {
            return {
                shared: store,
                swiperOption: {
                slidesPerView: 2,
                spaceBetween: 15,
                slidesPerGroup: 1,
                loop: true,
                loopFillGroupWithBlank: true,
                },
                slides: [],
            }
        },
        methods: {
            showMarker(id) {
                this.$router.push({path: '/signalements/' + id})
            }
        },
        mounted() {
            const url = appURL + '/api/v1/signalements/rayon',
                data = {"lat":this.shared.user_position[0],"lng":this.shared.user_position[0],"radius": 10};

            axios.post(url, data)
                .then(response => {
                    this.slides = response.data;
                    this.slides.forEach((el, index) => {

                        var timeBetween = moment().diff(el.date, 'minute');
                        if (timeBetween/60 > 24) {
                            el._timeAgo = moment().diff(el.date, 'days') + 'j';
                        } else if (timeBetween > 59) {
                            el._timeAgo = moment().diff(el.date, 'hour') + 'h';
                        } else {
                            el._timeAgo = timeBetween + 'min';
                        }

                        if(el.symptomes.length > 0) {
                            if(el.incidents.length > 0) {
                                el._type = 'both'
                            } else {
                                el._type = 'symptomes'
                            }
                        } else {
                            el._type = 'incidents'
                        }
                    });
                })
                .catch(error => {
                    console.log('error: ', error.response.data);
                })
        }
    }
</script>

<style lang="scss">
    .slider-container {
        position: fixed;
        z-index: 2003;
        bottom: 55px;
        left: 0;
        width: 100%;
        h2 {
            font-size: 18px;
            font-variant: none;
            color: $noir;
            margin-left: 30px;
            margin-bottom: 5px;
        }
        #slider-marker {
            height: 150px;
            .swiper-slide {
                padding: 25px;
                width: 205px !important;
                height: 125px;
                background: $undefined;
                border-radius: 8px;
                box-shadow: 5px 5px 20px 0 rgba(0, 0, 0, 0.15);
                &.symptomes {
                    background: $symptomes;
                }
                &.incidents {
                    background: $incidents;
                }
                .icons-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    margin-bottom: 10px;
                    li {
                        display: inline-block;
                        margin-right: 5px;
                        svg {
                            height: 25px;
                            fill: #fff;
                        }
                    }
                }
                h2 {
                    margin: 0;
                    font-variant: none;
                    font-size: 18px;
                    font-weight: normal;
                    color: #fff;
                }
                .slide-details {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    .details {
                        &-left, &-right {
                            justify-content: flex-end;
                            display: flex;
                            flex-direction: column;
                        }
                        &-left {
                            flex-grow: 1;
                            span {
                                font-style: italic;
                                font-size: 12px;
                            }
                        }
                        &-right {
                            .signalement-adresse {
                                font-size: 12px;
                                svg {
                                    width: 14px;
                                    vertical-align: text-bottom;
                                    fill: #fff;
                                    margin-right: 2px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
