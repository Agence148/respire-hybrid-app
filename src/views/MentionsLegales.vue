<template>
  <div class="mentions-legales">
    <h1 class="mentions-legales--title">Mentions Legales</h1>
    <p class="mentions-legales--text">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Fusce eget turpis nec nisl ultricies tempor sit amet ac neque.
      Phasellus sodales erat at commodo porttitor.
      Phasellus auctor scelerisque nulla, a commodo turpis condimentum id.
      Interdum et malesuada fames ac ante ipsum primis in faucibus.
      Nunc semper purus ac est semper, mattis auctor urna porta.
      Curabitur orci enim, euismod eget pharetra vitae, condimentum id velit.
      Ut tincidunt fringilla ligula. Sed vel viverra ante, quis viverra justo.
      Phasellus in nisl ut diam lobortis lobortis. Mauris vehicula, nunc a ornare scelerisque,
      neque leo luctus elit, sed faucibus nunc lectus et leo. Mauris placerat mollis tortor,
       eget blandit urna pellentesque eget.
      Praesent maximus pharetra leo, quis posuere est pellentesque vel.
      In a efficitur eros. Cras lacinia lacus id dui dictum maximus.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec molestie mattis molestie.
      Ut faucibus nunc pharetra condimentum facilisis.
      Nunc eget nunc sit amet odio commodo elementum ut eget dui.
      Donec imperdiet sit amet orci a egestas.
      Morbi venenatis sem vel consectetur commodo.
      Quisque eu dolor in arcu pharetra feugiat eu et sapien.
      Duis tortor libero, fringilla non pretium facilisis, consectetur quis velit.
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
    transform: translateY(100%);
    transition: .3s;
    padding: 50px 30px;
    background: #fff;
    bottom: 0;
    height: 92vh;
    width: 100%;
    position: fixed;
    box-shadow: 10px 10px 20px 0 rgba(0, 0, 0, .15);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    &.show {
      transform: translateY(0%);
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
      margin-bottom: 30px;
    }
  }
</style>
