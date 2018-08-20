<template>

  <div class="profile">
    <h1 v-if="shared.user.api_token">Bonjour <span>{{ shared.user.name }}</span> !</h1>
    <div v-if="shared.user.signalements.length > 0">
      <h2>Mes signalements</h2>
      <ul class="signalement-container">
        <li v-for="signalement in shared.user.signalements" :key="signalement.id" class="signalement-list">
          <router-link :to="'/signalements/' + signalement.id" class="signalement-item icon-dot-circled">{{ signalement.date }}</router-link>
        </li>
      </ul>
    </div>
    <div v-else>
      <span class="cross-icon">&#10008;</span>
      <h2>Aucun signalement</h2>
      <p>Vous n'avez aucun signalement...</p>
      <!-- <router-link :to="'/signalements/create'" class="create-signalement">Créez un signalement</router-link> -->
    </div>

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

    .cross-icon {
      text-align: center;
      display: block;
      font-size: 4em;
      
      & + h2 {
        text-align: center;
      }
    }

    .signalement {
      &-container {
        list-style: none;
        padding: 0;
      }
      &-list {
          margin-bottom: 5px;
      }
      &-item {
        color: #fff;
        position: relative;
        &::before {
          margin-left: 0;
          margin-right: 10px;
        }
      }
    }
  }

</style>
