<template>
  <div class="footer">
    <div class="totalPay">实付金额<b class="totalPay__num">¥62</b> </div>
    <div class="submitOrder" @click="handleSubmitOrder">提交订单</div>
  </div>
  <div class="bgColor" v-if="showMask">
    <div class="mask">
      <h2 class="mask__content">确认要离开收银台？</h2>
      <div class="mask__attention">请尽快完成支付，否则将被取消</div>
      <div class="mask__btn">
        <span class="mask__btn__cancel" @click="() => {handleConfirmOrder(true)}">取消订单</span>
        <span class="mask__btn__confirm" @click="() => {handleConfirmOrder(false)}">确认支付</span>
      </div>
    </div>
  </div>
  <Toast v-if="flag" :message="toastMessage" />
</template>

<script>
  import {
    ref
  } from 'vue'
  import {
    post
  } from '../../utils/request.js'
  import {
    useRouter,
    useRoute
  } from 'vue-router'
  import {
    useStore
  } from 'vuex'
  import Toast, {
    useToastEffect
  } from '../../components/Toast.vue'

  export default {
    name: 'Footer',
    components: {Toast},
    setup() {
      const {
        flag,
        toastMessage,
        showToast
      } = useToastEffect();
      //获取到该店铺
      const store = useStore()
      const cartList = store.state.cartList
      const router = useRouter()
      const route = useRoute()
      const shopId = route.params.id
      const shop = cartList[shopId]
      //定义动态数据，控制确认页面框的出现
      const showMask = ref(false)
      //定义动态数据，接受订单的状态
      const isCanceled = ref(false)
      //过滤出数量不为零的商品
      const notEmptyProduct = {}
      for (let i in shop.productList){
        //商品数量为零的不用展示
        if (shop.productList[i].count > 0){
          notEmptyProduct[i] = shop.productList[i]
        }
      }
      //过滤ajax需要的数组，仅需要 id和数量
      const products = [];
      for (let i in notEmptyProduct) {
        products.push({
          id: notEmptyProduct[i]._id,
          num: notEmptyProduct[i].count
        })
      }
      //定义确认页面框出现的方法
      const handleSubmitOrder = () => {
        showMask.value = true
      }
      //定义确认订单方法  
      const handleConfirmOrder = async (isCanceled) => {
        try {
          //发送ajax请求
          const result = await post('/api/order', {
            addressId: 1,
            shopId,
            shopName: shop.name,
            isCanceled,
            products
          })
          //发送成功，跳转到主页并且清空购物车
          if (result?.data?.errno == 0){
            router.push({name: 'Home'})
            store.commit('clearAllProduct',{shopId})
          }else{
            showToast('下单失败')
            store.commit('clearAllProduct',{shopId})
          }
        } catch(e) {
          showToast('下单失败')
          store.commit('clearAllProduct',{shopId})
        }

      }
      return {
        shopId,
        flag,
        toastMessage,
        showMask,
        handleSubmitOrder,
        handleConfirmOrder
      }
    }
  }
</script>

<style lang="scss" scoped>
  .footer {
    display: flex;
    justify-content: space-between;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0rem;
    height: .49rem;
    background: #fff;

    .totalPay {
      margin-left: .24rem;
      line-height: .49rem;
      font-size: .14rem;
      color: #333333;

      &__num {
        margin-left: .05rem;
        font-size: .16rem;
      }
    }

    .submitOrder {
      padding: 0 .21rem;
      font-size: .14rem;
      color: #FFFFFF;
      line-height: .49rem;
      background: #4FB0F9;
    }
  }

  .bgColor {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.50);
  }

  .mask {
    padding-bottom: .24rem;
    position: absolute;
    left: .37rem;
    right: .37rem;
    top: 2.43rem;
    background: #fff;
    border-radius: .04rem;

    &__content {
      margin: .24rem 0 .08rem 0;
      text-align: center;
    }

    &__attention {
      margin-bottom: .24rem;
      text-align: center;
      font-size: .14rem;
      color: #666666;
    }

    &__btn {
      display: flex;
      justify-content: space-between;
      padding: 0 .59rem;
      text-align: center;
      font-size: .14rem;

      &__cancel {
        padding: .06rem .12rem;
        border: .01rem solid #4FB0F9;
        border-radius: .16rem;
        color: #0091FF;
      }

      &__confirm {
        padding: .06rem .12rem;
        border-radius: .16rem;
        background: #4FB0F9;
        color: #fff;
      }
    }
  }
</style>
