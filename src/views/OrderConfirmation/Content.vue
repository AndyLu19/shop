<template>
  <div class="bgColor">
    <div class="cartList">
      <div class="shop">{{shop.name}}</div>
      <div class="productList">
        <template v-for="item in shop.productList" :key="item._id">
          <div class="productList__item" v-if="item.count > 0">
            <img :src="item.imgUrl" alt="" class="productList__item__img">
            <div class="productList__item__content">
              <div class="productList__item__content__weight">{{item.name}}</div>
              <span class="productList__item__content__onePrice">{{item.price}} x {{item.count}}</span>
              <span class="productList__item__content__totalPrice">¥{{(item.price * item.count).toFixed(1)}}</span>
            </div>
          </div>
        </template>
      </div>
      <div class="all">共计{{shop.totalCount}}件/1.4kg</div>
    </div>
  </div>
</template>

<script>
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'
  export default {
    name: 'Content',
    setup() {
			//获取store里购物车信息
      const store = useStore()
      const cartList = store.state.cartList
      const route = useRoute()
      const shopId = route.params.id
			//获取到该店铺信息
      const shop = cartList[shopId]
      return { shop }
    }
  }
</script>

<style lang="scss" scoped>
  .bgColor{
    overflow-y: scroll;
    overflow-x: auto;
    position: absolute;
    left: 0;
    right: 0;
    top: 1.59rem;
    bottom: .49rem;
    margin: .43rem auto 0;
    width: 3.39rem;
    padding-bottom: .16rem;
  }
  .cartList{
    padding-bottom: .1rem;
    background: #fff;
  }
  .shop{
    padding: .16rem;
    font-size: .16rem;
    color: #333333;
  }
  .productList{
    padding: 0 .16rem;
    &__item{
      display: flex;
      margin-bottom: .16rem;
      &__img{
        width: .46rem;
        height: .46rem;
      }
      &__content{
        margin-left: .16rem;
        &__weight{
          margin-bottom: .06rem;
          font-size: .14rem;
          line-height: .2rem;
          color: #333333;
        }
        &__onePrice{
          font-size: .14rem;
          color: #E93B3B;
          line-height: .14rem;
        }
        &__totalPrice{
          position: absolute;
          left: 2.9rem;
          font-size: 10px;
          color: #000000;
          text-align: right;
        }
      }
    }
  }
  .all{
    margin: 0 auto;
    height: .28rem;
    line-height: .28rem;
    text-align: center;
    width: 3.07rem;
    background: #F5F5F5;
    font-size: .14rem;
    color: #999999;
  }
</style>
