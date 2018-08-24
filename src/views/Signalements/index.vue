<template></template>

<script>

  export default {
    methods: {
      getLatestSignalements() {
        const url = appURL + "/api/v1/signalements";
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
