<template>
  <article class="content">
    <div class="function">
      <div class="wallet">
        <span class="iconfont wallet__iconfont">&#xe65d;<span class="wallet__title">我的钱包</span></span>
        <span class="iconfont wallet__backicon">&#xe607;</span>
      </div>
      <div class="wallet">
        <router-link to="Address">
          <span class="iconfont wallet__iconfont">&#xe70b;<span class="wallet__title">我的地址</span></span>
        </router-link>
        <span class="iconfont wallet__backicon">&#xe607;</span>
      </div>
      <div class="wallet">
        <span class="iconfont wallet__iconfont">&#xe6bd;<span class="wallet__title">客服与帮助</span></span>
        <span class="iconfont wallet__backicon">&#xe607;</span>
      </div>
    </div>
  </article>
</template>

<script>
  export default {
    name: 'Content'
  }
</script>

<style lang="scss" scoped>
  .content{
    overflow-y: scroll;
    position: absolute;
    top: 2.5rem;
    left: 0;
    right: 0;
    bottom: .49rem;
  }
  .function{
    margin: 0 auto;
    padding: 0 .16rem;
    box-sizing: border-box;
    width: 3.39rem;
    background: #FFFFFF;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.08);
    border-radius: 8px;
  }
  .wallet:first-child{
    margin-top: .77rem;
  }
  .wallet:last-child{
    padding-bottom: .21rem;
  }
  .wallet{
    padding-top: .16rem;
    display: flex;
    justify-content: space-between;
    a{
      text-decoration: none;
      color: black;
    }

    &__iconfont{
      flex: 1;
      font-size: .2rem;
    }
    &__title{
      margin-left: .16rem;
      font-size: .14rem;
      vertical-align: middle;
    }
    &__backicon{
      color: #C2C4CA;
    }
  }
</style>
