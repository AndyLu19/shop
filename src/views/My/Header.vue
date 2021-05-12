<template>
  <header class="header">
    <div class="user">
      <img src="../../assets/imgs/12345.jpg" alt="" class="user__face">
      <div class="user__name">热心市民李先生</div>
      <div class="user__id">ID: 1069643013</div>
      <div class="user__own">
        <div class="user__own__item">
          <div class="user__own__item__content">红包</div>
          <div class="user__own__item__count">218</div>
        </div>
        <div class="user__own__item">
          <div class="user__own__item__content">优惠券</div>
          <div class="user__own__item__count">12张</div>
        </div>
        <div class="user__own__item">
          <div class="user__own__item__content">鲜豆</div>
          <div class="user__own__item__count">88</div>
        </div>
        <div class="user__own__item">
          <div class="user__own__item__content">白条</div>
          <div class="user__own__item__count">1000</div>
        </div>
      </div>
    </div>
    <span class="iconfont">&#xe660;</span>
    
  </header>
</template>

<script>
  export default {
    name: 'Header'
  }
</script>

<style lang="scss" scoped>
  .header{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 1.08rem 0 0 0;
    box-sizing: border-box;
    width: 100%;
    height: 2.5rem;
    background-image: linear-gradient(239deg, #3A6FF3 0%, #50C7FB 100%);
  }
  .iconfont{
    position: relative;
    top: -2.61rem;
    left: 3.3rem;
    font-size: .24rem;
    color: #fff;
  }
  .user{
    margin: 0 auto;
    width: 3.39rem;
    background: #fff;
    box-shadow: 0 .08rem .16rem 0 rgba(0,0,0,0.08);
    border-radius: .08rem;
    &__face{
      position: relative;
      top: -.47rem;
      margin: 0 auto;
      display: block;
      border-radius: 50%;
      width: .94rem;
      height: .94rem;
    }
    &__name{
      margin-top: -.3rem;
      font-size: .24rem;
      color: #262628;
      text-align: center;
    }
    &__id{
      margin: .12rem 0;
      text-align: center;
      font-size: .14rem;
      color: #C1C0C9;
    }
    &__own{
      display: flex;
      padding: .12rem .28rem .16rem;
      border-top: .01rem solid #f1f1f1;
      &__item{
        flex: 1;
        text-align: center;
        &__content{
          font-size: .12rem;
          color: #C1C0C9;
        }
        &__count{
          margin-top: .12rem;
          font-size: .2rem;
          color: #262628;
        }
      }
    }
  }
</style>
