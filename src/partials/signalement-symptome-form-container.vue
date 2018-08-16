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
      },
      titre () {
        if (this.child.input === 'checkbox') {
          let arr = this.symptomes.filter(function (n) { return n != undefined })
          return this.child.description + ' ' + arr.join(', ')
        }
        else {
          if (this.symptomes[0] === undefined || this.symptomes[0] === '') {
            return this.category.children.description
          }
          else {
            return this.symptomes[0]
          }
        }

      }
    },
    methods: {

      onclick () {
        this.visible = !this.visible
        E.$emit('symptometype-opened-container', this.category.id)
      },

      checkclick (index) {

        if (this.symptomes[index] === undefined || this.symptomes[index] === '') {
          Vue.set(this.symptomes, index, this.category.symptomes[index].description)
        } else {
          Vue.set(this.symptomes, index, undefined)
        }
      },

      radioclick (index) {
        Vue.set(this.symptomes, 0, this.category.symptomes[index].description)
      }
    },
    mounted () {
      E.$on('symptometype-opened', (id) => {
        if (id != this.category.id) {
          this.visible = false
        }
      })
    }
}
</script>

<style lang="scss">
.symptome-container{
    max-height: 50px;
}
</style>
