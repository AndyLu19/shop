<template>

  <div class="wrapper">
    <Header></Header>
    <Content></Content>
    <Footer></Footer>
  </div>

</template>

<script>
  import { ref } from 'vue'
  import Header from './Header.vue'
  import Footer from './Footer.vue'
  import Content from './Content.vue'
  export default {
    name: 'OrderConfirmation',
    components: { Header,Footer,Content }
  }
</script>

<style lang="scss" scoped>
  .wrapper{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #f5f5f5;
  }

</style>
