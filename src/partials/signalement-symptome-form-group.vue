<template>

  <div class="form-group" :class="open">
    <h3 @click.self="onclick" v-html="titre"></h3>
    <div class="symptomes-inputs">
      <div v-for="symptome in category.symptomes" :key="symptome.id">
        <input
          v-if="category.input == 'checkbox'"
          :id="'sympt-' + symptome.id"
          type="checkbox"
          v-model="model[category.order]"
          :value="symptome.id"
          @click="checkclick(symptome)">
        <input
          v-else
          :id="'sympt-' + symptome.id"
          type="radio"
          v-model="model[category.id]"
          :value="symptome.id"
          @click="radioclick(symptome)">
        <label :for="'sympt-'+symptome.id">{{symptome.name}}</label>
      </div>
    </div>
  </div>

</template>

<script>

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
        var symptomesDescriptions = [], key;
        for (key in this.symptomes) {
          if (key.match(/^key:/) && this.symptomes.hasOwnProperty(key)) {
            symptomesDescriptions.push(this.symptomes[key].title_combined);
          }
        }
        if (symptomesDescriptions.length == 0) {
          return this.category.title_combined
        } else {
          if (this.category.input === 'checkbox') {
            return this.category.title_combined.replace('...', symptomesDescriptions.join(', '))
          } else {
            return this.category.title_combined.replace('...', symptomesDescriptions.pop())
          }
        }
      }
    },

    methods: {
      onclick () {
        this.visible = !this.visible
      },

      checkclick (symptome) {
        if (typeof this.symptomes['key:' + symptome.id] === 'object') {
          Vue.delete(this.symptomes, 'key:' + symptome.id)
          E.$emit('symptome-removed', symptome.id)
        } else {
          Vue.set(this.symptomes, 'key:' + symptome.id, symptome)
          E.$emit('symptome-added', symptome.id)
        }
      },

      radioclick (symptome) {
        this.category.symptomes.forEach((el) => {
          Vue.delete(this.symptomes, el.id)
          E.$emit('symptome-removed', el.id)
        })
        Vue.set(this.symptomes, symptome.id, symptome)
        E.$emit('symptome-added', symptome.id)
      }
    },

    mounted () {
    }
  }

</script>

<style lang="scss">

  #form-signalement {
    h3 {
      padding: 10px 0;
      font-variant: none;

      span {
        color: $font-color;
      }
    }

    .form-group {
      border-bottom: 1px solid #fff;
      position: relative;
      overflow: hidden;
      padding-bottom: 0;
      transition: padding-bottom .15s;

      &.open {
        padding-bottom: 200px;
        overflow: scroll;
        .symptomes-inputs {
          top: 50px;
        }
      }
    }

    .symptomes-inputs {
      position: absolute;
      top: 100px;
      left: 0;
      transition: top .4s;
      width: 100%;
      overflow-x: scroll-x;
      -webkit-overflow-scrolling: touch; // for iOS
      z-index: 0 !important; /* for android - http://stackoverflow.com/questions/15906508/chrome-browser-for-android-no-longer-supports-webkit-overflow-scrolling-is-the */
      overflow-y: hidden;
      white-space: nowrap;

      &::-webkit-scrollbar {
        display: none;
      }

      & > div {
        display: inline-block;
        width: 120px;
        text-align: center;
      }
    }

    [type="radio"]:not(:checked),
    [type="radio"]:checked,
    [type="checkbox"]:not(:checked),
    [type="checkbox"]:checked {
      position: absolute;
      left: -9999px;

      & + label {
        position: relative;
        display: block;
        padding: 10px 30px 10px 10px;
        text-align: center;
        cursor: pointer;

        &:before {
          content: "";
          display: block;
          width: 60px;
          height: 60px;
          margin: 0 auto 12px;
          background: #fff;
          border-radius: 30px;
          transition: background-color .3s;
        }
      }
    }

    /* Aspect si "cochée" */
    [type="radio"]:checked + label,
    [type="checkbox"]:checked + label {
      &:before {
        background: rgba(255, 255, 255, .6);
      }
    }
  }

</style>
