<template>
  <template v-for="item in cartList" :key="item.id">
    <div class="cartList" v-if="item.totalCount > 0">
      <div class="shop">{{item.name}}</div>
      <div class="productList">
        <template v-for="item1 in item.productList" :key="item1._id">
          <div class="productList__item" v-if="item1.count > 0">
            <img :src="item1.imgUrl" alt="" class="productList__item__img">
            <div class="productList__item__content">
              <div class="productList__item__content__weight">{{item1.name}}</div>
              <span class="productList__item__content__onePrice">{{item1.price}} x {{item1.count}}</span>
              <span class="productList__item__content__totalPrice">¥{{(item1.price * item1.count).toFixed(2)}}</span>
            </div>
          </div>
        </template>
      </div>
      <div class="all">共计{{item.totalCount}}件/1.4kg</div>
    </div>
  </template>
</template>

<script>
  import { useStore } from 'vuex'

  const cartEffect = () => {
    //获取购物车信息
    const store = useStore()
    const cartList = store.state.cartList

    return { cartList }
  }

  export default {
    name: 'Content',
    setup() {
      const { cartList } = cartEffect()
      return { cartList }
    }
  }
</script>

<style lang="scss" scoped>
  .cartList{
    margin: .16rem auto 0;
    width: 3.39rem;
    padding-bottom: .16rem;
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
          left: 3rem;
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
