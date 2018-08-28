<template>

  <div class="create-signalement__form--symptome">

    <h1>Signaler un symptôme</h1>

    <ul class="vertical-step" v-show="showSteps">
      <li :class="'step-item step-' + steps.symptomes.status">
        <i v-if="steps.symptomes.status == 'done'" v-html="require('../../assets/images/icons/check.svg')"></i>
        <i v-else></i>
        <h2>Quels sont les symptomes ?</h2>
        <ul class="resume">
          <li v-for="symptome in steps.symptomes.value" :key="symptome.id" v-html="symptomeCombinedTitle(symptome)"></li>
        </ul>
        <span class="button-add" @click="popupSymptomes(true)" v-html="require('../../assets/images/icons/plus.svg') + ' Ajouter un symptome'"></span>
      </li>
      <li :class="'step-item step-' + steps.commentaire.status">
        <i v-if="steps.commentaire.status == 'done'" v-html="require('../../assets/images/icons/check.svg')"></i>
        <i v-else></i>
        <h2>Commentaire</h2>
        <span class="resume" v-html="steps.commentaire.value"></span>
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
          <input
            :id="'symptome_' + symptome.id"
            :type="symptome.symptome_category.input"
            :name="'symptome_category_' + symptome.symptome_category.id"
            :data-symptome="symptome.id">
          <label :for="'symptome_' + symptome.id" v-html="require('../../assets/images/icons/signalements/' + symptome.icon + '.svg') + '<span>' + symptome.title + '</span>'"></label>
          <i class="marker-checked" v-html="require('../../assets/images/icons/check.svg')"></i>
        </li>
      </ul>

      <span class="button-close" @click="popupSymptomes(false)" v-html="require('../../assets/images/icons/check.svg')" aria-labelledby="Valider"></span>
    </aside>

    <aside class="popup popup--commentaire" v-show="showPopupComment">
      <h3>Commentaire :</h3>
      <textarea name="commentaire" placeholder="Apportez des précisions sur vos symptômes…"></textarea>

      <span class="button-close" @click="popupComment(false)" v-html="require('../../assets/images/icons/check.svg')" aria-labelledby="Valider"></span>
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
          symptomes: {
            status: 'todo',
            value: []
          },
          commentaire: {
            status: 'disabled',
            value: ''
          }
        },
        showSteps: true,
        showPopupComment: false,
        showPopupSymptomes: false
      }
    },

    mounted() {
    },

    methods: {
      popupComment(show) {
        E.$emit('signalement-show-close-button', !show)
        this.showSteps = !show
        this.showPopupSymptomes = false
        this.showPopupComment = show
        if (show) {
          document.querySelector('[name="commentaire"]').focus();
        } else {
          this.steps.commentaire.value = document.querySelector('[name="commentaire"]').value
          this.steps.commentaire.status = this.steps.commentaire.value == '' ? 'todo' : 'done'
          this.checkSteps()
        }
      },
      popupSymptomes(show) {
        E.$emit('signalement-show-close-button', !show)
        this.showSteps = !show
        this.showPopupComment = false
        this.showPopupSymptomes = show
        if (!show) {
          this.steps.symptomes.value = []
          document.querySelectorAll('[data-in-category]').forEach((el) => {
            var input = el.querySelector('input')
            if (input.checked) {
              this.steps.symptomes.value.push(input.getAttribute('data-symptome'))
            }
          })
          if (this.steps.symptomes.value.length > 0) {
            this.steps.symptomes.status = 'done'
            if (this.steps.commentaire.status == 'disabled') {
              this.steps.commentaire.status = 'todo'
            }
          } else {
            this.steps.symptomes.status = 'todo'
            if (this.steps.commentaire.status == 'todo') {
              this.steps.commentaire.status = 'disabled'
            }
          }
          this.checkSteps()
        }
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
      },
      symptomeCombinedTitle(symptomeId) {
        var combinedTitle = ''
        this.shared.symptomes.forEach((el) => {
          if (el.id == symptomeId) {
            combinedTitle = el.symptome_category.title_combined.replace('...', el.title_combined)
          }
        })
        return combinedTitle
      },
      checkSteps() {
        E.$emit('signalement-can-validate', this.steps.symptomes.status == 'done' && this.steps.commentaire.status == 'done')
        E.$emit('signalement-data', this.steps)
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
          flex-direction: row;
          align-items: center;
          justify-content: center;
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
            display: flex;
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
                display: flex;
            }
          }
        }
      }
    }

    textarea {
      margin-top: 1em;
      font-size: 12px;
      padding: 1em;
      height: 8em;
      width: 100%;
      border: 1px solid transparent;
      border-left-color: black;
    }
  }

</style>
