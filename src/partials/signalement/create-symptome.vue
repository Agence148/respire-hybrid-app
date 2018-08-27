<template>

  <div class="create-signalement__form--symptome">

    <h1>Signaler un symptôme</h1>

    <ul class="vertical-step" v-show="showSteps">
      <li :class="'step-item step-' + steps.symptomes">
        <i v-if="steps.symptomes == 'done'" v-html="require('../../assets/images/icons/check.svg')"></i>
        <i v-else></i>
        <h2>Quels sont les symptomes ?</h2>
        <span class="button-add" @click="popupSymptomes(true)" v-html="require('../../assets/images/icons/plus.svg') + ' Ajouter un symptome'"></span>
      </li>
      <li :class="'step-item step-' + steps.commentaire">
        <i v-if="steps.commentaire == 'done'" v-html="require('../../assets/images/icons/check.svg')"></i>
        <i v-else></i>
        <h2>Commentaire</h2>
        <span class="button-add" @click="popupComment(true)" v-html="require('../../assets/images/icons/plus.svg') + ' Ajouter un commentaire'"></span>
      </li>
    </ul>

    <aside class="popup popup--symptomes" v-show="showPopupSymptomes">
      <h3>Quelle partie du corps est touchée ?</h3>
      <ul class="categories-icons">
        <li v-for="category in shared.symptomes_categories" :key="category.id" :data-category="category.id" @click="selectCategory(category)">
          <input :id="'category_' + category.id" type="radio" name="subselect_category">
          <label :for="'category_' + category.id" v-html="require('../../assets/images/icons/signalements/' + category.icon + '.svg') + '<span>' + category.title + '</span>'"></label>
          <i class="marker-checked" v-html="require('../../assets/images/icons/check.svg')"></i>
        </li>
      </ul>
      <ul class="symptomes-icons">
        <li v-for="symptome in shared.symptomes" :key="symptome.id" :data-in-category="symptome.symptome_category.id"  @click="selectSymptome(symptome)">
          <input :id="'symptome_' + symptome.id" type="checkbox" v-if="symptome.symptome_category.input == 'checkbox'">
          <input :id="'symptome_' + symptome.id" type="radio" :name="'symptome_category_' + symptome.symptome_category.id" v-else>
          <label :for="'symptome_' + symptome.id" v-html="require('../../assets/images/icons/signalements/' + symptome.icon + '.svg') + '<span>' + symptome.title + '</span>'"></label>
          <i class="marker-checked" v-html="require('../../assets/images/icons/check.svg')"></i>
        </li>
      </ul>
    </aside>

    <aside class="popup popup--commentaire" v-show="showPopupComment">
      <h3>Apportez des précisions sur vos symptômes :</h3>
      <textarea name="commentaire">...</textarea>
    </aside>

  </div>

</template>

<script>

  import store from '../../helpers/data/Store.js'

  export default {
    data() {
      return {
        shared: store,
        steps: {
          symptomes: 'todo',
          commentaire: 'disabled'
        },
        showSteps: true,
        showPopupComment: false,
        showPopupSymptomes: false
      }
    },

    mounted() {
      // E.$on('symptome-added', (id) => {
      //   if (this.form.symptomes.indexOf(id) == -1) {
      //     this.form.symptomes.push(id);
      //   }
      // })
      // E.$on('symptome-removed', (id) => {
      //   let index = this.form.symptomes.indexOf(id);
      //   if (index != -1) {
      //     this.form.symptomes.splice(index, 1);
      //   }
      // })
    },

    methods: {
      popupComment(show) {
        this.showSteps = !show
        this.showPopupSymptomes = false
        this.showPopupComment = show
        if (show) {
          document.querySelector('[name="commentaire"]').focus();
        }
      },
      popupSymptomes(show) {
        this.showSteps = !show
        this.showPopupComment = false
        this.showPopupSymptomes = show
      },
      selectCategory(category) {
        document.querySelectorAll('[data-category]').forEach((el) => {
          el.classList.add('disabled');
        })
        document.querySelector('[data-category="'+ category.id +'"]').classList.remove('disabled');
        document.querySelectorAll('[data-in-category]').forEach((el) => {
          el.style.display = null;
        })
        document.querySelectorAll('[data-in-category="'+ category.id +'"]').forEach((el) => {
          el.style.display = 'block'
        })
      },
      selectSymptome(symptome) {
        document.querySelector('[data-category="'+ symptome.symptome_category.id +'"]').classList.remove('used')
        document.querySelectorAll('[data-in-category="'+ symptome.symptome_category.id +'"]').forEach((el) => {
          if (el.querySelector('input').checked) {
            document.querySelector('[data-category="'+ symptome.symptome_category.id +'"]').classList.add('used')
          }
        })
      }
    }
  }

</script>

<style lang="scss">

  .create-signalement__form--symptome {
    position: relative;
    margin-bottom: auto;

    .categories-icons,
    .symptomes-icons {
      display: flex;
      flex-wrap: wrap;
      list-style-type: none;
      padding: 0;

      li {
        position: relative;
        width: 33%;
        padding: 5px;
        text-align: center;

        .marker-checked {
          display: none;
          position: absolute;
          top: 0;
          right: 0;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          pointer-events: none;
          background: $rouge;

          svg {
            width: 10px;
            height: 10px;
            fill: #fff;
          }
        }
        [type="radio"],
        [type="checkbox"] {
          display: none;
        }
        &.disabled {
          opacity: 0.3;
        }
        label {
          display: block;
          font-size: 12px;
          line-height: 14px;
          text-align: center;

          span {
            display: block;
            word-break: break-word;
            hyphens: auto;
          }

          svg {
            width: 40px;
            height: 40px;
            margin-bottom: 5px;
            pointer-events: none;
          }
        }
      }
    }
    .categories-icons {
      [data-category] {
        &.used {
          .marker-checked {
            display: block;
          }
        }
      }
    }
    .symptomes-icons {
      border-top: 1px solid $gris-clair;
      padding-top: 1em;

      [data-in-category] {
        display: none;

        [type="radio"],
        [type="checkbox"] {
          &:checked {
            ~ .marker-checked {
              display: block;
            }
          }
        }
      }
    }

    textarea {
      margin-top: 1em;
      padding: 1em;
      height: auto;
      border: 1px solid transparent;
      border-left-color: black;
    }
  }

</style>
