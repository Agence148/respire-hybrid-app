<template>

  <div class="create-signalement__form--incident">

    <h1>Signaler un incident</h1>

    <ul class="vertical-step" v-show="showSteps">
      <li :class="'step-item step-' + steps.incidents.status">
        <i v-if="steps.incidents.status == 'done'" v-html="require('../../assets/images/icons/check.svg')"></i>
        <i v-else></i>
        <h2>Quels sont les incidents ?</h2>
        <ul class="resume">
          <li v-for="incident in steps.incidents.value" :key="incident.id" v-html="incidentCombinedTitle(incident)"></li>
        </ul>
        <span class="button-add" @click="popupIncidents(true)" v-html="require('../../assets/images/icons/plus.svg') + ' Ajouter un incident'"></span>
      </li>
      <li :class="'step-item step-' + steps.commentaire.status">
        <i v-if="steps.commentaire.status == 'done'" v-html="require('../../assets/images/icons/check.svg')"></i>
        <i v-else></i>
        <h2>Commentaire</h2>
        <span class="resume" v-html="steps.commentaire.value"></span>
        <span class="button-add" @click="popupComment(true)" v-html="require('../../assets/images/icons/plus.svg') + ' Ajouter un commentaire'"></span>
      </li>
    </ul>

    <aside class="popup popup--incidents" v-show="showPopupIncidents">
      <h3>Quel est l'incident ?</h3>
      <ul class="incidents-icons">
        <li v-for="incident in shared.incidents" :key="incident.id" @click="selectIncident(incident)">
          <input
            :id="'incident_' + incident.id"
            type="checkbox"
            :name="'incident_' + incident.id"
            :data-incident="incident.id">
          <label :for="'incident_' + incident.id" v-html="require('../../assets/images/icons/signalements/' + incident.icon + '.svg') + '<span>' + incident.title + '</span>'"></label>
          <i class="marker-checked" v-html="require('../../assets/images/icons/check.svg')"></i>
        </li>
      </ul>

      <div class="button-container">
        <span class="button-close" @click="resetIncidents" v-html="require('../../assets/images/icons/round-delete.svg')" aria-labelledby="Fermer"></span>
        <span class="button-validate" @click="popupIncidents(false)" v-html="require('../../assets/images/icons/check.svg')" aria-labelledby="Valider"></span>
      </div>
    </aside>

    <aside class="popup popup--commentaire" v-show="showPopupComment">
      <h3>Commentaire :</h3>
      <textarea name="commentaire" placeholder="Apportez des précisions sur l'incident…"></textarea>

      <span class="button-validate" @click="popupComment(false)" v-html="require('../../assets/images/icons/check.svg')" aria-labelledby="Valider"></span>
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
          incidents: {
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
        showPopupIncidents: false
      }
    },

    mounted() {
      this.popupIncidents(true)
    },

    methods: {
      popupComment(show) {
        E.$emit('signalement-show-close-button', !show)
        this.showSteps = !show
        this.showPopupIncidents = false
        this.showPopupComment = show
        if (show) {
          document.querySelector('[name="commentaire"]').focus();
        } else {
          this.steps.commentaire.value = document.querySelector('[name="commentaire"]').value
          this.steps.commentaire.status = this.steps.commentaire.value == '' ? 'todo' : 'done'
          this.checkSteps()
        }
      },
      popupIncidents(show) {
        E.$emit('signalement-show-close-button', !show)
        this.showSteps = !show
        this.showPopupComment = false
        this.showPopupIncidents = show
        if (!show) {
          this.steps.incidents.value = []
          document.querySelectorAll('[data-incident]').forEach((el) => {
            if (el.checked) {
              this.steps.incidents.value.push(el.getAttribute('data-incident'))
            }
          })
          if (this.steps.incidents.value.length > 0) {
            this.steps.incidents.status = 'done'
            if (this.steps.commentaire.status == 'disabled') {
              this.steps.commentaire.status = 'todo'
            }
          } else {
            this.steps.incidents.status = 'todo'
            if (this.steps.commentaire.status == 'todo') {
              this.steps.commentaire.status = 'disabled'
            }
          }
          this.checkSteps()
        }
      },
      selectIncident(incident) {
        document.querySelectorAll('[data-incident="'+ incident.id +'"]').forEach((el) => {
          if (el.checked) {
            el.classList.add('used')
          }
        })
      },
      resetIncidents() {
        document.querySelectorAll('[data-incident]').forEach((el) => {
          el.checked = false;
        })
        this.popupIncidents(false);
      },
      incidentCombinedTitle(incidentId) {
        var combinedTitle = ''
        this.shared.incidents.forEach((el) => {
          if (el.id == incidentId) {
            combinedTitle = el.title_combined
          }
        })
        return combinedTitle
      },
      checkSteps() {
        E.$emit('signalement-can-validate', this.steps.incidents.status == 'done' && this.steps.commentaire.status == 'done')
        E.$emit('signalement-data', this.steps)
      }
    }
  }

</script>

<style lang="scss">

.create-signalement__form--incident {
    position: relative;

    .incidents-icons {
      display: flex;
      flex-wrap: wrap;
      list-style-type: none;
      padding: 0;

      li {
        position: relative;
        width: 33%;
        padding: 5px;
        text-align: center;

        [data-incident] {
          display: none;

          &[type="checkbox"] {
            display: none;
            &:checked {
              ~ .marker-checked {
                  display: flex;
              }
            }
          }
        }

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
