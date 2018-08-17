<template></template>

<script>

  export default {
    methods: {
      getLatestSignalements() {
        const url = appURL + "/api/v1/signalements";
        axios.get(url)
          .then(response => {
            this.$parent.liste = response.data;
          })
          .catch(error => {
        });
      }
    },
    mounted() {
      this.$parent.classes="signalements-index";
      this.getLatestSignalements();

      this.$parent.mapCenter = store.user_position;
      this.$parent.mapZoom = 12;
    }
  }

</script>
