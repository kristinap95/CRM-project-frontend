<template>
<div>
  <AddClient />
  <AllClients />
</div>
</template>

<script>
import AddClient from './AddClient.vue';
import AllClients from './AllClients.vue'

export default {
    name: 'Clients',
    data() {
      return {
        
      }
    },
    components: {
      AddClient,
      AllClients,
    },
   
}
</script>

<style>

</style>