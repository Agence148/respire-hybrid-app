
<template>

  <div>

    <form v-show="show" id="form-signalement" method="POST" action="" @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)">

      <select class="signal-select" v-model="selected">
        <option v-for="day in days" :value="day.value" :key="day.value">{{ day.text }}</option>
      </select>

      <input v-if="selected != '0'" :value="time" type="time" name="signal-time" id="signalement-time" class="signal-time" />

      <signalement-symptome-form-container
        v-for="category in shared.symptomes_categories"
        :category="category"
        :model="form.symptomes"
        :key="category.id"/>

      <div class="send-container">
        <button @click.prevent="onSubmit">Envoyer</button>
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
        show: false,
        selected: '0',
        days: [
          { text: 'Maintenant', value: '0' },
          { text: 'Aujourd\'hui', value: '1' },
          { text: 'Hier', value: '2' },
          { text: 'Avant-Hier', value: '3' }
        ],
        time: '',
        pastDate: 0
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

  .page-signalement {
    padding-right:0px;
  }

  #form-signalement {
    h1 {
      margin-bottom:30px;
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
      padding-right:70px;
    }

    button {
      margin-top:40px;
      margin-bottom:40px;
    }
  }

</style>
