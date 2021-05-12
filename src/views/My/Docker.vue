<template>
  <footer class="docker">
    <div :class="{'docker__item': true, 'docker__item--active': index===3? true : false}" v-for="(item,index) in dockerList" :key="index">
      <router-link :to="item.to">
        <div class="iconfont" v-html="item.icons"></div>
        <div class="docker__item__title">{{item.text}}</div>
      </router-link>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'Docker',
    setup() {
      const dockerList = [
        {icons: '&#xe6ee;',text: '首页',to: {name: 'Home'}},
        {icons: '&#xe638;',text: '购物车',to: {name: 'CartList'}},
        {icons: '&#xe61e;',text: '订单',to: {name: 'OrderList'}},
        {icons: '&#xe660;',text: '我的',to: {name: 'My'}}
      ];
      return { dockerList }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../style/viriables.scss';
  .docker{
    display: flex;
    padding: 0 .18rem;
    box-sizing: border-box;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: .49rem;
    border-top: .01rem solid #f1f1f1;
    color: $content-fontcolor;
    &__item{
      flex: 1;
      text-align: center;
      a{
        color: #333333;
      }

      &--active{
        a{
           color: #1FA4FC;
        }

      }
      .iconfont{
        margin: .07rem 0 .02rem 0;
        font-size: .18rem;
      }
      &__title{
        font-size: .2rem;
        transform: scale(.5,.5);
        transform-origin: center top;
      }
    }
  }
</style>
