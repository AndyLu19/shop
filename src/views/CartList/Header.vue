<template>
  <div class="header">我的全部购物车（{{total}}）</div>
</template>

<script>
  import { useStore } from 'vuex'
  import { computed } from 'vue'
  const cartEffect = () => {
    //获取购物车信息
    const store = useStore()
    const cartList = store.state.cartList

    //购物车数量
    let total = computed(() => {
      //定义total，接受购物车总店铺数
      let total = 0;
      //循环购物车
      for (let i in cartList){
        //店铺里的商品总数量不为零,购物车总店铺数才增加1
        if (cartList[i].totalCount > 0){
            total += 1
        }
      }
      return total

    })
    return {total}
  }
  export default {
    name: 'Header',
    setup() {
      const { total } = cartEffect()
      return { total }
    }
  }
</script>

<style lang="scss" scoped>
  .header{
    height: .44rem;
    line-height: .44rem;
    text-align: center;
    font-size: .16rem;
    color: #333333;
    background: #ffffff;
  }
</style>
