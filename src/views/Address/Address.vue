<template>
  <div class="wrapper">
    <Header></Header>
    <Content></Content>
  </div>

</template>

<script>
  import Header from './Header.vue'
  import Content from './Content.vue'
  export default {
    name: 'Address',
    components: { Header,Content }
  }
</script>

<style lang="scss" scoped>
  .wrapper{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #f5f5f5;
  }
</style>
