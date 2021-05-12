<template>
  <header class="header">
    <span class="backicon iconfont" @click="handleBackClick">&#xe609;</span>
    <span class="title">管理收货地址</span>

    <span class="createBtn">
      <router-link to="AddAddress">
        新建
      </router-link>
    </span>

  </header>
</template>

<script>
  import { useRouter } from 'vue-router'
  export default {
    name: 'Header',
    setup () {
      const router = useRouter()
      const handleBackClick = () => {
        router.back()
      }
      return { handleBackClick }
    }
  }
</script>

<style lang="scss" scoped>
  .header{
    display: flex;
    padding: .14rem .18rem;
    box-sizing: border-box;
    width: 100%;
    font-size: .16rem;
    color: #333333;
    background: #fff;
    .backicon{
      flex: 1;
      color: #B6B6B6;
    }
    .title{
      flex: 1;
      text-align: center;
    }
    .createBtn{
      flex: 1;
      text-align: right;
      a{
        text-decoration: none;
        color: #333;
      }
    }
  }
</style>
