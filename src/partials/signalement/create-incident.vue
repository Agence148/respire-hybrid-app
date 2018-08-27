<template>

  <div class="create-signalement__form--incident">
    <h1>Signaler un incident</h1>

    <ul class="vertical-step">
      <li class="step-item" id="open-popup">Quel est l'incident ?</li>
      <li class="step-item not-ready">Commentaire</li>
    </ul>

    <div class="incidents-popup">
      <input type="radio" name="incidents" id="smoke">
      <label for="incidents" v-html="require('../../assets/images/icons/signalements/smoke.svg') + 'Fumée'"></label>
      <input type="radio" name="incidents" id="congestion">
      <label for="incidents" v-html="require('../../assets/images/icons/signalements/congestion.svg') + 'Embouteillage'"></label>
      <!-- <input type="radio" name="incidents" id="smell">
      <label for="incidents" v-html="require('../../assets/images/icons/signalements/smell.svg') + 'Odeur'"></label>  -->
      <input type="radio" name="incidents" id="burning">
      <label for="incidents" v-html="require('../../assets/images/icons/signalements/burning.svg') + 'Incendie'"></label>
    </div>
  </div>

</template>

<script>

  import store from '../../helpers/data/Store.js'

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

</style>
