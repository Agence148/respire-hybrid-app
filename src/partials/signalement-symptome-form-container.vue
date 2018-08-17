<template>

  <div class="form-group symptome-container" :class="open">
    <h3 @click.self="onclick">{{ category.description }}</h3>
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
        E.$emit('symptometype-opened-container', this.category.id, this.symptomes)
      }
    },
    mounted () {
      E.$on('symptometype-changed-group', (id, symptomes) => {
        this.symptomes = symptomes;
        E.$emit('symptometype-changed-container', this.category.id, this.symptomes)
      })
    }
  }

</script>

<style lang="scss">

  .symptome-container{
    max-height: 50px;
  }

</style>
