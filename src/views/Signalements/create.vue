<template>

  <div class="create-signalement">
    <form v-show="show" class="create-signalement__form" method="POST" action="" @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)">
      <create-incident v-if="type == 'incident'"></create-incident>
      <create-symptome v-if="type == 'symptome'"></create-symptome>

      <div class="send-container" v-show="showCloseModalButton">
        <button type="submit" v-if="readyToSend" v-html="require('../../assets/images/icons/check.svg')" aria-labelledby="Envoyer"></button>
        <button type="button" v-else class="close-modal" @click="onCloseModal" v-html="require('../../assets/images/icons/close.svg')" aria-labelledby="Fermer"></button>
      </div>
    </form>
  </div>

</template>

<script>

  import Form from '../../helpers/form/Form.js'
  import store from '../../helpers/data/Store.js'
  import moment from 'moment'

  Vue.component('create-incident', require('../../partials/signalement/create-incident.vue'))
  Vue.component('create-symptome', require('../../partials/signalement/create-symptome.vue'))

  export default {
    data() {
      return {
        shared: store,
        type: this.$route.params.type,
        form: new Form({
          symptomes: [],
          incidents: [],
          comment: '',
          lng:0,
          lat:0,
          created_at:0,
          date:0,
          live: true,
          uuid: '000-0000-000'
        }),
        sending:false,
        sent:false,
        show: true,
        selected: '0',
        days: [
          { text: 'Maintenant', value: '0' },
          { text: 'Aujourd\'hui', value: '1' },
          { text: 'Hier', value: '2' },
          { text: 'Avant-Hier', value: '3' }
        ],
        time: '',
        pastDate: 0,
        readyToSend: false,
        showCloseModalButton: true,
        steps: {}
      }
    },

    watch: {
      selected(val) {
        if (val != '0') {
          this.getTime();
          this.pastDate = moment().subtract(val - 1, 'day').format('YYYY-MM-DD HH:mm:ss');
        }
      }
    },

    computed: {
    },

    methods: {
      getTime() {
        this.time = moment().format('HH:mm');
      },
      onSubmit() {
        this.form.created_at = moment().format('YYYY-MM-DD HH:mm:ss');
        this.form.lat = store.user_position[0];
        this.form.lng = store.user_position[1];
        this.form.date = this.form.live ? this.form.created_at : this.pastDate;
        this.form.live = this.selected == '0' ;
        this.form.uuid = store.uuid;
        this.steps.incidents ? this.form.incidents = this.steps.incidents.value : [];
        this.steps.symptomes ? this.form.symptomes = this.steps.symptomes.value : [];
        this.form.comment = this.steps.commentaire.value;

        let newSignalementIndex = (store.signalements.push(this.form.data()))-1;
        local.save("signalements");

        this.form.submit('post', store.api_root + '/signalements')
          .then((response) => {
            this.sent = true;
            store.signalements[newSignalementIndex].id=response.id;
            local.save("signalements");
            setTimeout(() => {
              this.$router.push({path: '/signalements/index'})
              setTimeout(() => {
                this.$router.push({path: '/signalements/' + response.id})
              }, 10);
            }, 500);
          })
          .catch((err) => {
            console.log(err);
          });

      },
      onCloseModal() {
        this.$router.push({path: '/signalements/index'});
      }
    },

    mounted() {
      E.$emit('nav-popup-show', false)

      this.$parent.classes="signalements-create";
      this.$parent.mapCenter = store.user_position;
      this.$parent.mapZoom = 15;

      E.$on('signalement-show-close-button', (show) => {
        this.showCloseModalButton = show
      })
      E.$on('signalement-can-validate', (validation) => {
        this.readyToSend = validation
      })
      E.$on('signalement-data', (steps) => {
        this.steps = steps
      })
    }
  }

</script>

<style lang="scss">

  .create-signalement {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($color: #321f40, $alpha: 0.9);
    z-index: 10001;
    padding: 50px;
    pointer-events: all;

    &__form {
      height: 100%;
      display: flex;
      flex-direction: column;

      h1 {
        margin-bottom:30px;
        font-size: 24px;
        font-variant: none;
      }
      .signal {
        &-time {
          display: inline-block;
          font-family: 'Lato', Arial, sans-serif;
          font-size: 2rem;
          color: #fff;
          border-radius: 0px;
          border: none;
          border-bottom: 2px dashed #fff;
          background: transparent;
        }
        &-select {
          display: inline-block;
          margin-bottom: 30px;
          margin-right: 30px;
          padding: 6px 0;
          font-family: 'Lato', Arial, sans-serif;
          font-size: 2rem;
          color: #fff;
          border-radius: 0px;
          border: none;
          border-bottom: 2px dashed #fff;
          background: transparent;
        }
      }

      .send-container {
        display: flex;
        justify-content: center;

        .close-modal {
          background: #fff;
          text-align: center;
          width: 50px;
          height: 50px;
          border-radius: 50px;
          padding: 0;
          font-size: 0;
          align-self: center;

          svg {
            width: 16px;
          }
        }

        button {
          border-radius: 50px;
          width: 50px;
          height: 50px;
          padding: 0;
          font-size: 0;
          svg {
            width: 20px;
          }
        }
      }

      .button-add {
        display: block;
        font-size: 12px;
        margin-top: 1em;

        svg {
          height: 20px;
          width: 20px;
          margin-right: 5px;
          border: 2px solid;
          border-radius: 50%;
          fill: #fff;
          padding: 5px;
        }
      }

      .button-close {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        margin: 50px auto 0;
        height: 30px;
        width: 30px;
        border-radius: 50%;
        border: 2px solid $principale;

        svg {
          height: 15px;
          width: 15px;
          fill: $principale;
        }
      }

      .vertical-step {
        padding: 0;
        margin: 30px 0;
        list-style: none;
        position: relative;
        min-height: 60vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .step-item {
          flex-grow: 1;
          position: relative;
          font-size: 14px;
          padding-left: 50px;

          &::after {
            content: '';
            display: inline-block;
            position: absolute;
            top: 35px;
            left: 13px;
            width: 1px;
            height: calc(100% - 43px);
            background-image: linear-gradient(#fff 80%, transparent 0%);
            background-position: 0 0;
            background-size: 1px 10px;
            background-repeat: repeat-y;
          }

          &:last-child {
            bottom: 0;

            &::after {
              content: none;
            }
          }
          i {
            display: inline-block;
            position: absolute;
            top: 0;
            left: 0;
            width: 26px;
            height: 26px;
            border: 2px solid #fff;
            border-radius: 50%;
            background-color: transparent;

            svg {
              height: 12px;
              width: 12px;
              margin: 5px;
              fill: #fff;
            }
          }
          h2 {
            font-size: 15px;
            font-variant: none;
            line-height: 30px;
          }
          &.step-disabled {
            opacity: .3;
            pointer-events: none;
          }
          &.step-done {
            i {
              background: #fff;

              svg {
                fill: $rouge;
              }
            }
          }
        }
      }

      .popup {
        position: absolute;
        top: 54px; // <h1> height+margin
        width: 100%;
        background: #fff;
        border-radius: 8px;
        color: $principale;
        padding: 32px 43px;

        h3 {
          font-variant: none;
          font-size: 14px;
        }
      }

      .resume {
        opacity: 0.4;
        list-style-type: none;
        padding: 0;

        li {
          &::before {
            content: '-';
            padding-right: 8px;
          }
        }
      }
    }
  }

</style>
