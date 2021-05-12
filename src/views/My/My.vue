<template>
  <div class="wrapper">
    <Header></Header>
    <Content></Content>
  </div>
  

  <Docker></Docker>
</template>

<script>
  import Docker from './Docker.vue'
  import Header from './Header.vue'
  import Content from './Content.vue'
  export default {
    name: 'My',
    components: { Docker,Header,Content }
  }
</script>

<style lang="scss" scoped>

</style>
