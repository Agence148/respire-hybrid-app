<template>

  <div>
    <form id="form-login" class="fixed-middle" method="POST" action="" @submit.prevent="onSubmit" @keydown="form.errors.clear()">
      <h1>Bonjour !</h1>

      <div class="form-group">
        <label for="email" class="">E-Mail</label>
        <input id="email" type="email" class="input" name="email" v-model="form.email">
      </div>

      <div class="form-group">
        <label for="password" class="">Mot de passe</label>
        <input type="password" id="password" name="password" class="input" v-model="form.password">
      </div>

      <span class="error" v-if="form.errors.has('error')" v-text="form.errors.get('error')"></span>

      <div class="form-group">
        <button class="button" :disabled="form.errors.any()">Se connecter</button>
      </div>

      <router-link to="/register" class="link--register">Créer mon compte</router-link>
    </form>
  </div>

</template>

<script>

  import Form from '../helpers/form/Form.js';

  export default {
    data() {
      return {
        form: new Form({
          email: '',
          password: ''
        }),
        shared: store
      }
    },
    methods: {
      onSubmit() {
        this.form.post(appURL + '/api/v1/login')
          .then((response) => {
            for(let field in response){
              this.shared[field] = response[field];
            }
            this.shared.authenticated = true;
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

  #form-login {
    width: 60%;

    h1 {
      margin-bottom:50px;
    }
    label {
      text-transform: uppercase;
    }
  }

  a.link--register {
    display: block;
    text-align: center;
    margin-top: 1em;
    font-size: 0.7em;
    color: white;
  }

</style>
