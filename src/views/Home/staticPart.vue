<template>
  <header class="position">
    <span class="iconfont iconfont__position">&#xe70b;</span>
    北京理工大学国防科技园2号楼10层
    <span class="iconfont iconfont__bell">&#xe7e5;</span>
  </header>
  <section class="search">
    <span class="iconfont">&#xe611;</span>
    山姆会员商店优惠商品
  </section>
  <section class="banner">
    <img src="http://www.dell-lee.com/imgs/vue3/banner.jpg">
  </section>
  <ul class="icons">
    <li class="icons__item" v-for="(item,index) in iconsList" :key="index">
      <img class="icons__item__img" :src="item.imgUrl">
      <p class="icons__item__desc">{{item.desc}}</p>
    </li>
  </ul>
  <section class="gap"></section>
  <h3 class="nearby__title">附近店铺</h3>
</template>

<script>
  export default{
    name: 'staticPart',
    setup() {
      const iconsList = [
        {imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png',desc: '超市便利'},
        {imgUrl: 'http://www.dell-lee.com/imgs/vue3/菜市场.png',desc: '菜市场'},
        {imgUrl: 'http://www.dell-lee.com/imgs/vue3/水果店.png',desc: '水果店'},
        {imgUrl: 'http://www.dell-lee.com/imgs/vue3/鲜花.png',desc: '鲜花绿植'},
        {imgUrl: 'http://www.dell-lee.com/imgs/vue3/医药健康.png',desc: '医药健康'},
        {imgUrl: 'http://www.dell-lee.com/imgs/vue3/家居.png',desc: '家具时尚'},
        {imgUrl: 'http://www.dell-lee.com/imgs/vue3/蛋糕.png',desc: '蛋糕烘培'},
        {imgUrl: 'http://www.dell-lee.com/imgs/vue3/签到.png',desc: '签到'},
        {imgUrl: 'http://www.dell-lee.com/imgs/vue3/大牌免运.png',desc: '大牌免运'},
        {imgUrl: 'http://www.dell-lee.com/imgs/vue3/红包.png',desc: '红包套餐'}
      ];
      return { iconsList }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../style/viriables.scss';
  @import '../../style/mixins.scss';
  .position{
    margin: .16rem 0;
    font-size: .16rem;
    color: $content-fontcolor;
    @include ellipsis;
    .iconfont{
      position: relative;
      top: .02rem;
    }
    .iconfont__position{
      font-size: .2rem;
      margin-right: .05rem;
    }
    .iconfont__bell{
      font-size: .2rem;
      margin-left: .3rem;
    }
  }
  .search{
    width: 100%;
    height: .32rem;
    background: #F5F5F5;
    border: 0;
    border-radius: .16rem;
    font-size: .14rem;
    color: #B7B7B7;
    .iconfont{
      line-height: .32rem;
      margin: 0 .16rem;
    }
  }
  .banner{
    margin-top: .12rem;
    height: 0;
    overflow: hidden;
    padding-bottom: 25.4%;
    img{
      width: 100%;
    }
  }
  .icons{
    margin-top: .16rem;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    &__item{
      margin-bottom: .16rem;
      width: 20%;
      text-align: center;
      &__img{
        width: .4rem;
        height: .4rem;
      }
      &__desc{
        margin: .06rem 0 0 0;
        color: $content-fontcolor;
      }
    }
  }
  .gap{
    margin: 0 -.18rem;
    height: .1rem;
    background: #F1F1F1;
  }
  .nearby__title{
    margin: .16rem 0 0 0;
    font-size: .18rem;
    font-weight: 550;
    color: $content-fontcolor;
  }
</style>
