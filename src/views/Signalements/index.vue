<template></template>

<script>

  export default {
    data() {
      return {
        shared: store
      }
    },

    methods: {
      getLatestSignalements() {
        const url = store.api_root + '/signalements';
        axios.get(url)
          .then(response => {
            this.$parent.liste = response.data;
            E.$emit('map-locate-user')
          })
          .catch(error => {
        });
      }
    },
    mounted() {
      this.$parent.classes="signalements-index";
      this.getLatestSignalements();
    }
  }

</script>
