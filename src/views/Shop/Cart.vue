<template>
  <div class="mask" @click="controlCartShow" v-if="showCart"></div>
  <div class="cart">
    <div class="product" v-if="showCart">
      <div class="product__header">
        <div class="product__header__allcheck">
          <span class="product__header__allcheck__icon iconfont" @click="() => {controlAllChecked(shopId,allChecked)}" v-html="allChecked ? '&#xe652;' : '&#xe66c;' "></span>
          全选
        </div>
        <div class="product__header__clear" @click="() => {clearAllProduct(shopId)}">清空购物车</div>
      </div>
      <template  v-for="item in productInfo" :key="item._id">
        <div class="product__item" v-if="item.count > 0">
          <div class="product__item__checked iconfont" @click="() => {changeProductChecked(shopId,item._id)} " v-html="item.checked ? '&#xe652;' : '&#xe66c;' "></div>
          <img :src="item.imgUrl" alt="" class="product__item__img">
          <div class="product__item__content">
            <div class="product__item__content__title">{{item.name}}</div>
            <div class="product__item__content__price">￥{{item.price}}</div>
          </div>
          <div class="iconfont"></div>
          <div class="product__number">
            <span class="product__number__minus" @click="() => {reduceItemFromCart(shopId,item._id)}">-</span>
            <span class="product__number__nums">{{item.count || 0}}</span>
            <span class="product__number__plus" @click="() => {addItemToCart(shopId,item._id,item)}">+</span>
          </div>
        </div>
      </template>
    </div>
    <div class="check">
      <div class="check__icon">
        <img class="check__icon__img" src="http://www.dell-lee.com/imgs/vue3/basket.png" @click="controlCartShow" alt="">
        <div class="check__icon__tag">{{total}}</div>
      </div>
      <div class="check__info">
        总结：<span class="check__info__price">&yen;<b>{{price}}</b></span>
      </div>
      <div class="check__btn" v-show="shop.totalCount > 0"><router-link :to="{path: `/orderconfirmation/${shopId}`}">去结算</router-link></div>
    </div>
  </div>
</template>

<script>
  import {
    useStore
  } from 'vuex'
  import {
    useRoute
  } from 'vue-router'
  import {
    computed,
    ref
  } from 'vue'
  import { useSameCartEfftct } from './commonCartEffect.js'
  const useCartEffect = (shopId) => {

    //获取到store里的cartList
    const store = useStore()
    const cartList = store.state.cartList
    //购物车总数量
    let total = computed(() => {
      //获取到店铺
      const shop = cartList[shopId]
      //定义count接受购物车总数量
      let count = 0
      if (shop) {
        //循环店铺的商品
        for (let i in shop.productList) {
          //获取店铺里的商品
          const product = shop.productList[i]
          //如果商品处于选中状态，才添加数量
          if (product.checked) {
            count += product.count
          }

        }
      }
      return count
    })
    //购物车总价格
    let price = computed(() => {
      //获取到店铺
      const shop = cartList[shopId]
      //定义count接受购物车总价钱
      let count = 0
      if (shop) {
        for (let i in shop.productList) {
          //获取店铺里的商品
          const product = shop.productList[i]
          //如果商品处于选中状态，才添加价钱
          if (product.checked) {
            count = count + product.count * product.price
          }

        }
      }
      //价格小数点后两位
      return count.toFixed(2)
    })
    //购物车信息展示
    let productInfo = computed(() => {
      //获取到店铺
      const shop = cartList[shopId]
      let productInfo = shop || {}
      return productInfo.productList
    })
    //全选按钮
    let allChecked = computed(() => {
      //获取到店铺
      const shop = cartList[shopId]
      //控制全选按钮的选择状态
      let result = true
      if (shop) {
        //循环店铺的商品
        for (let i in shop.productList) {
          //获取店铺里的商品
          const product = shop.productList[i]
          //商品的数量不为零并且处于未选中状态
          if ( product.count > 0 && !product.checked ) {
            //只要店铺里有一样商品为未选中状态，全选按钮就处于未选中状态
            result = false
          }
        }
      }
      return result
    })
    //改变商品选择状态
    const changeProductChecked = (shopId,productId) => {
      store.commit('changeProductChecked',{shopId,productId})
    }
    //清空购物车
    const clearAllProduct = (shopId) => {
      store.commit('clearAllProduct',{shopId})
    }
    //全选按钮控制
    const controlAllChecked = (shopId,allChecked) => {
      store.commit('controlAllChecked',{shopId,allChecked})
    }

    //控制购物车的显示与隐藏
    const showCart = ref(false)
    const controlCartShow = () => {
      showCart.value = !showCart.value
    }

    return {
      showCart,
      controlCartShow,
      allChecked,
      total,
      price,
      productInfo,
      changeProductChecked,
      clearAllProduct,
      controlAllChecked
    }
  }

  export default {
    name: 'Cart',
    setup() {
      //获取到店铺id
      const route = useRoute()
      const shopId = route.params.id
      const { cartList, addItemToCart ,reduceItemFromCart } = useSameCartEfftct()
      const { allChecked,total,price,productInfo,changeProductChecked,clearAllProduct,controlAllChecked,showCart,controlCartShow } = useCartEffect(shopId)
      //获取到店铺
      const shop = cartList[shopId]
      return { shop,allChecked,total,price,productInfo,addItemToCart ,reduceItemFromCart,shopId,changeProductChecked,clearAllProduct,controlAllChecked,showCart,controlCartShow }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../style/mixins.scss';
  .mask{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(0,0,0,.5);
  }

  .cart {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ffffff;
  }

  .product {
    overflow-y: scroll;
    flex: 1;
    background: #ffffff;
    &__number {
      margin-top: .13rem;

      &__minus,
      &__plus {
        display: inline-block;
        width: .2rem;
        height: .2rem;
        text-align: center;
        line-height: .18rem;
        border-radius: .1rem;
        font-size: .2rem;
        background: #0091FF;
        color: #FFFFFF;
      }

      &__nums {
        margin: 0 .1rem;
        font-size: .18rem;
      }
    }

    &__header{
      display: flex;
      justify-content: space-between;
      height: .51rem;
      border-bottom: .01rem solid  #F1F1F1;
      &__allcheck{
        margin-left: .18rem;
        line-height: .51rem;
        font-size: .14rem;
        &__icon{
          vertical-align: middle;
          font-size: .2rem;
          color: #0091FF;
        }
      }
      &__clear{
        margin-right: .18rem;
        font-size: .14rem;
        line-height: .51rem;
        color: #333333;
      }
    }

    &__item {
      padding: 0 .18rem 0 0;
      display: flex;
      margin: .16rem 0 0  0;
      &__checked{
        margin: .13rem .16rem 0 .18rem;
        font-size: .2rem;
        color: #0091FF;;
      }


      &__img {
        margin-right: .16rem;
        width: .46rem;
        height: .46rem;
      }

      &__content {
        overflow: hidden;
        flex: 1;
        position: relative;
        top: .05rem;

        &__title {
          margin-bottom: .06rem;
          font-size: .14rem;
          color: #333333;
          line-height: .2rem;
          @include ellipsis;
        }
        &__price {
          font-size: .14rem;
          color: #E93B3B;
          line-height: .14rem;
        }
      }
    }
  }

  .check {
    display: flex;
    height: .49rem;
    line-height: .49rem;
    border-top: .01rem solid #F1F1F1;

    &__icon {
      position: relative;
      width: .76rem;
      text-align: center;

      &__img {
        display: block;
        margin: .12rem auto;
        width: .28rem;
        height: .26rem;
      }

      &__tag {
        position: absolute;
        top: .03rem;
        left: .4rem;
        height: .2rem;
        width: .2rem;
        font-size: .16rem;
        background-color: #e93b3b;
        color: #ffffff;
        line-height: .2rem;
        border-radius: .1rem;
        transform: scale(.5, .5)
      }
    }

    &__info {
      flex: 1;
      margin-left: .08rem;
      font-size: .12rem;
      color: #333333;

      &__price {
        font-size: .18rem;
        color: #E93B3B;
      }
    }

    &__btn {
      text-align: center;
      width: .98rem;
      background: #4FB0F9;
      font-size: .14rem;
      a {
        color: #ffffff;
      }
    }
  }
</style>
