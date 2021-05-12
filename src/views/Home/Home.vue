<template>
  <div class="wrapper">
    <staticPart />
    <Nearby />
  </div>
  <docker />
</template>

<script>
  import staticPart from './staticPart.vue'
  import Nearby from './Nearby.vue'
  import docker from './docker.vue'
  export default{
    name: 'Home',
    components: {
      staticPart,
      Nearby,
      docker
    }
  }
</script>

<style lang="scss" scoped>
  li{
    list-style: none;
  }
  .wrapper{
    overflow-y: auto;
    padding: 0 .18rem;
    position: absolute;
    left: 0;
    top: 0;
    bottom: .5rem;
    right: 0;
  }

</style>
