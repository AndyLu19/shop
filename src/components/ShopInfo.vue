<template>
  <div class="shop__item">
    <img :src="item.imgUrl" class="shop__item__img">
    <div class="shop__item__content" :class="{'shop__item__content--border': hideBorder ? true : false}">
      <div class="shop__item__content__title">{{item.name}}</div>
      <div class="shop__item__content__tags">
        <span class="shop__item__content__tag">月售{{item.sales}}</span>
        <span class="shop__item__content__tag">起送{{item.expressLimit}}</span>
        <span class="shop__item__content__tag">基础运费{{item.expressPrice}}</span>
      </div>
      <div class="shop__item__content__highlight">{{item.slogan}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ShopInfo',
    // 接收父组件传递过来的参数
    props: ['item','hideBorder'],
  }
</script>

<style lang="scss" scoped>
  @import '../style/viriables.scss';
  .shop__item {
    margin-bottom: .12rem;

    &__img {
      width: .56rem;
      height: .56rem;
    }

    &__content {
      position: relative;
      top: .14rem;
      display: inline-block;
      margin-left: .16rem;
      padding: 0 .3rem .12rem 0;
      &--border{
        border-bottom: .01rem solid #F1F1F1;
      }


      &__title {
        font-size: .16rem;
        color: $content-fontcolor;
        line-height: .22rem;
      }

      &__tags {
        margin: .08rem 0;
        line-height: .18rem;
      }

      &__tag {
        margin-right: .16rem;
        font-size: .13rem;
        color: $content-fontcolor;
      }

      &__highlight {
        line-height: .18rem;
        font-size: .13rem;
        color: #E93B3B;
      }
    }
  }
</style>
