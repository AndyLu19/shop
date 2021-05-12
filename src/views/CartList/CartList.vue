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
    name: 'CartList',
    components: { Docker,Header,Content }
  }
</script>

<style lang="scss" scoped>
  .wrapper{
    overflow-y: auto;
    position: absolute;
    left: 0;
    top: 0;
    bottom: .49rem;
    right: 0;
    background-color: #f5f5f5;
  }
</style>
