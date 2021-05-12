<template>
  <div class="header">
    <div class="top">
      <div class="top__backicon iconfont" @click="handleBackClick">&#xe609;</div>
      <div class="top__title">确认订单</div>
    </div>
    <div class="userInfo">
      <h3 class="userInfo__title">收货地址</h3>
      <div class="userInfo__address">北京理工大学国防科技园2号楼10层 <span class="iconfont">&#xe607;</span> </div>
      <div class="userInfo__telephone">
        <span class="userInfo__telephone__name">瑶妹（先生）</span>
        <span class="userInfo__telephone__number">18911024266</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { useRouter } from 'vue-router'
  export default{
    name: 'Header',
    setup (){
      const router = useRouter()
      const handleBackClick = () => {
        router.back()
      }
      return { handleBackClick }
    }
  }
</script>

<style lang="scss" scoped>
  .header {
    height: 1.59rem;
    background-image: linear-gradient(0deg, rgba(0, 145, 255, 0.00) 4%, #0091FF 50%);

    .top {
      display: flex;

      &__backicon {
        margin: .41rem 1.25rem 0 .18rem;
        font-size: .2rem;
        color: #FFFFFF;
      }

      &__title {
        margin-top: .41rem;
        font-size: .16rem;
        color: #ffffff;
      }
    }

    .userInfo{
      padding: .16rem 0 .16rem .16rem;
      margin: .22rem .18rem 0;
      background: #ffffff;
      border-radius: .04rem;
      &__title{
        margin: 0 0 .14rem 0;
        font-size: .16rem;
      }
      &__address{
        margin-bottom: .06rem;
        font-size: .14rem;
        .iconfont{
          color: #666666;
          font-size: .16rem;
          margin-left: .7rem;
        }
      }
      &__telephone{
        font-size: .12rem;
        color: #666666;
      }
    }
  }
</style>
