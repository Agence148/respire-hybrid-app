<template>

  <div>
    <form id="form-register" class="fixed-middle" method="POST" action="" @submit.prevent="onSubmit" @keydown="form.errors.clear()">
      <h1>Vos informations :</h1>

      <div class="form-group">
        <label for="name" class="">Pseudonyme</label>
        <input id="name" type="text" class="input" name="name" v-model="form.name">
      </div>

      <div class="form-group">
        <label for="email" class="">E-mail</label>
        <input id="email" type="email" class="input" name="email" v-model="form.email">
      </div>

      <div class="form-group">
        <label for="password" class="">Mot de passe</label>
        <input type="password" id="password" name="password" class="input" v-model="form.password">
      </div>

      <span class="error" v-if="form.errors.has('error')" v-text="form.errors.get('error')"></span>

      <div class="form-group">
        <button class="button" :disabled="form.errors.any()">Créer mon compte</button>
      </div>
    </form>
  </div>

</template>

<script>

  import Form from '../helpers/form/Form.js';

  export default {
    data() {
      return {
        form: new Form({
          name: '',
          email: '',
          password: ''
        }),
        shared: store
      }
    },
    methods: {
      onSubmit() {
        this.form.post(appURL + '/api/v1/users')
          .then((response) => {
            for(let field in response){
              this.shared[field] = response[field];
            }
            local.save();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }

</script>

<style lang="scss">

  #form-register {
    width: 60%;

    h1 {
      margin-bottom:50px;
    }
    label {
      text-transform: uppercase;
    }
  }

</style>
