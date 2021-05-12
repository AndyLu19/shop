// 购物车相关的逻辑
  import { useStore } from 'vuex'
  import { toRefs } from 'vue'
  export const useSameCartEfftct = () => {
    //获取到store的购物车数据
    const store = useStore()
    const cartList = store.state.cartList
    //定义添加商品的方法，需要传递店铺id，商品id，商品信息，店铺名字
    const addItemToCart = (shopId,productId,productInfo,shopName) => {
      store.commit('addItemToCart',{shopId,productId,productInfo,shopName})
    }
    //定义删减商品的方法，需要传递店铺id，商品id（因为可以删减商品，代表store里已经有数据了，无需传递别的信息了）
    const reduceItemFromCart = (shopId,productId) => {
      store.commit('reduceItemFromCart',{shopId,productId})
    }
    return {  addItemToCart ,reduceItemFromCart ,cartList}
  }
