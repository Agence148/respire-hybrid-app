<template>

  <div v-if="shared.user.api_token" class="profile">
    <h1>Bonjour <span>{{ shared.user.name }}</span> !</h1>
    <div>{{ shared.user.email }}</div>

    <button @click.prevent="logout" >Se déconnecter</button>
  </div>

  <div v-else class="profile">
    <h1>Mes signalements</h1>
    <table>
      <tr v-for="signalement in shared.user.signalements" :key="signalement.id">
        <td><router-link :to="'/signalements/' + signalement.id">{{ signalement.date }}</router-link></td>
      </tr>
    </table>

    <router-link to="/login" class="link--login">Se connecter</router-link>
    <router-link to="/register" class="link--register">Créer mon compte</router-link>
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
