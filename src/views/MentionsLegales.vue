<template>
  <div class="mentions-legales">
    <router-link to="/signalements/index" class="back-arrow" v-html="require('../assets/images/icons/back.svg')" aria-labelledby="Retour"></router-link>
    <h1 class="mentions-legales--title">Mentions Legales</h1>
    <p class="mentions-legales--text">
      Respire est l’association nationale pour l’amélioration et la préservation de la qualité de l’air.
      C’est une association de citoyens, fondée en 2011. Elle s’appuie sur les données scientifiques
      et publiques existantes ainsi que sur les réglementations pour informer, communiquer,
      développer des outils techniques et construire son plaidoyer.
    </p>
    <div class="mentions-legales--links">
      <img class="mentions-legales--logo" src="../assets/images/logo-big.png" alt="Logo Respire" />
      <p>Rejoignez nous !</p>
      <a href="http://www.respire-asso.org/">www.respire-asso.org</a>
    </div>

    <div class="mentions-legales--links">
      <div class="mentions-legales--social">
        <div class="mentions-legales--social__facebook">
          <a href="https://www.facebook.com/AssociationRespire/">
            <span v-html="require('../assets/images/icons/facebook.svg')"></span>
          </a>
        </div>
        <div class="mentions-legales--social__twitter">
          <a href="https://twitter.com/respireasso">
            <span v-html="require('../assets/images/icons/twitter.svg')"></span>
          </a>
        </div>
      </div>
      <span>Soutenez-nous</span>
      <a href="http://www.respire-asso.org/dons/">www.respire-asso.org/dons/</a>
    </div>

    <p class="mentions-legales--text">
      Cette application a été réalisée grâce au soutien de la fondation AFNIC pour la solidarité numérique.
    </p>
    <a href="https://www.fondation-afnic.fr/">www.fondation-afnic.fr</a>
    <p class="mentions-legales--text">
      Et grâce au soutien du Rassemblement pour la planète :
    </p>
    <div class="mentions-legales--social__facebook">
      <a href="https://fr-fr.facebook.com/pages/category/Non-Governmental-Organization--NGO-/Rassemblement-pour-la-plan%C3%A8te-290337677728103/">
        <span v-html="require('../assets/images/icons/facebook.svg') + ' /rassemblement-pour-la-planete'"></span>
      </a>
    </div>
    <p class="mentions-legales--text">
      Les cartes de pollutions de l’air sont fournies par Airparif,
      Observatoire de la qualité de l’air en Ile-de-France
    </p>
    <p class="mentions-legales--text">
      Conception et hébergement :<br>
      Respire,<br>
      1, place des 2 écus, 75001 Paris<br>
    </p>
    <p class="mentions-legales--text">
      Développement<br>
      148<br>
      2, rue du Dahomey, 75011 Paris<br>
    </p>
  </div>
</template>

<script>
export default {

  mounted() {
    setTimeout(() => {
        document.querySelector('.mentions-legales').classList.add('show')
      }, 20)
  }

}
</script>

<style lang="scss">
  .mentions-legales {
    transform: translateX(100%);
    transition: .3s;
    padding: 50px 30px;
    background: #fff;
    bottom: 0;
    width: 100%;
    position: fixed;
    box-shadow: 10px 10px 20px 0 rgba(0, 0, 0, .15);
    &.show {
      transform: translateX(0%);
    }
    &--title {
      color: $violet;
      font-variant: none;
      font-size: 26px;
    }
    &--text {
      color: $noir;
      font-variant: none;
      font-size: 16px;
      &:last-child {
        margin-bottom: 30px;
      }
    }
    &--links {
      display: flex;
      flex-direction: column;
      font-size: 16px;
      span, p {
        color: $noir;
        margin: 0;
        font-size: 16px;
      }
    }
    &--social {
      display: flex;
      &__facebook, &__twitter {
        font-size: 16px;
        margin: 10px 15px;
        margin-left: 0;
        svg {
          width: 40px;
        }
      }
    }
    &--logo {
      width: 50px;
      margin-bottom: 10px;
    }
    .back-arrow {
        display: inline-block;
        margin-bottom: 10px;
        svg {
          width: 20px;
        }
    }
  }
</style>
