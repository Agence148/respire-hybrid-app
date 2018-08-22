
<template>

  <div class="create-signalement">

    <form v-show="show" id="form-signalement" method="POST" action="" @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)">

      <h1>Signaler un {{ end }}</h1>

      <!-- <select class="signal-select" v-model="selected">
        <option v-for="day in days" :value="day.value" :key="day.value">{{ day.text }}</option>
      </select> 

      <input v-if="selected != '0'" :value="time" type="time" name="signal-time" id="signalement-time" class="signal-time" /> -->

      <signalement-symptome-form-container
        v-for="category in shared.symptomes_categories"
        :category="category"
        :model="form.symptomes"
        :key="category.id"/>

      <div class="send-container">
        <button v-if="readyToSend" @click.prevent="onSubmit"><img src="../../assets/images/icons/check.svg" alt="Envoyer"></button>
        <button v-else class="close-modal" @click="onCloseModal"><img src="../../assets/images/icons/close.svg" alt="Fermer"></button>
      </div>
    </form>


    <!-- <div v-show="sent">
      <h1>Merci !</h1>
      <router-link to="/signalements/index" >retour vers la carte</router-link>
    </div> -->
  </div>

</template>

<script>

  import Form from '../../helpers/form/Form.js'
  import store from '../../helpers/data/Store.js'
  import moment from 'moment'

  Vue.component('signalement-symptome-form-container',require('../../partials/signalement-symptome-form-container.vue'));

  export default {
    data() {
      return {
        shared:store,
        form: new Form({
          symptomes: [],
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
        end: 'symptôme',
        readyToSend: false,
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
        this.form.lat = this.shared.user_position[0];
        this.form.lng = this.shared.user_position[1];
        this.form.date = this.form.live ? this.form.created_at : this.pastDate;
        this.form.live = this.selected == '0' ;
        this.form.uuid = this.uuid;

        let s = (store.signalements.push(this.form.data()))-1;
        local.save("signalements");

        this.form.submit('post',appURL + '/api/v1/signalements')
          .then((response) => {
            this.sent = true;
            store.signalements[s].id=response.id;
            local.save("signalements");
          })
          .catch((err) => {
            console.log(err);
          });
      },

      onClickCause() {

      },

      onClickSymptome() {

      },
      onCloseModal() {
        this.$router.push('/signalements/index');
      }
    },

    mounted(){
      this.$parent.classes="signalements-create";
      local.get("symptomes_categories")

      this.$parent.mapCenter = this.shared.user_position;
      this.$parent.mapZoom = 15;

      E.$on('symptome-added', (id) => {
        if (this.form.symptomes.indexOf(id) == -1) {
          this.form.symptomes.push(id);
        }
      })
      E.$on('symptome-removed', (id) => {
        let index = this.form.symptomes.indexOf(id);
        if (index != -1) {
          this.form.symptomes.splice(index, 1);
        }
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
  }

  .close-modal {
    background: #fff;
    text-align: center;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    padding: 0;
    font-size: 0;
    align-self: center;
  }

  #form-signalement {
    h1 {
      margin-bottom:30px;
      font-size: 24px;
      font-variant: none;
    }
    .signal {
      &-time {
        display: inline-block;
        font-family: 'HelveticaNeueLT', Arial, sans-serif;
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
        font-family: 'HelveticaNeueLT', Arial, sans-serif;
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
      margin-top: 60px;
      button {
        border-radius: 50px;
        width: 50px;
        height: 50px;
        padding: 0;
        font-size: 0;
      }
    }
  }

</style>
