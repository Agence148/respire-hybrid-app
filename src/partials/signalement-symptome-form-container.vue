<template>

  <div class="symptome-container" :class="open">
    <signalement-symptome-form-group
      v-for="category in category.children"
      :category="category"
      :model="symptomes"
      :key="category.id"/>
  </div>

</template>

<script>

  Vue.component('signalement-symptome-form-group',require('../partials/signalement-symptome-form-group.vue'));

  export default {
    props: ['category', 'model'],
    data () {
      return {
        visible: false,
        symptomes: []
      }
    },
    computed: {
      open () {
        return (this.visible) ? 'open' : ''
      }
    },
    methods: {
      onclick () {
        this.visible = !this.visible
      }
    },
    mounted () {
    }
  }

</script>

<style lang="scss">

</style>
