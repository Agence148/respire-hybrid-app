<template>

  <div class="profile">
    <h1 v-if="shared.user.api_token">Bonjour <span>{{ shared.user.name }}</span> !</h1>

    <h2>Mes signalements</h2>
    <table>
      <tr v-for="signalement in shared.user.signalements" :key="signalement.id">
        <td><router-link :to="'/signalements/' + signalement.id">{{ signalement.date }}</router-link></td>
      </tr>
    </table>

    <div v-if="shared.user.api_token">
      <button @click.prevent="logout" >Se déconnecter</button>
    </div>
    <div v-else>
      <router-link to="/login" class="link--login">Se connecter</router-link>
      <router-link to="/register" class="link--register">Créer mon compte</router-link>
    </div>
  </div>

</template>

<script>

  export default {
    data() {
      return {
        shared: store
      }
    },
    methods : {
      logout() {
        store.authenticated = false;
      }
    },
    mounted(){
    }
  }

</script>

<style lang="scss">

  .profile {
    padding: 100px 70px;

    h1 {
      text-transform: capitalize;
    }
    button {
      margin-top: 60px;
    }
  }

</style>
