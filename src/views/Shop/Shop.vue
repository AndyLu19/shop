<template>
  <div class="wrapper">
    <header class="search">
      <div class="search__back iconfont" @click="handleBackClike">&#xe609;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe611;</span>
        <input type="text" class="search__content__input" placeholder="请输入商品名称搜索">
      </div>
    </header>
    <ShopInfo :item="item" :hideBoder="false" />
    <Content :shopName="item.name" />
    <Cart />
  </div>

</template>

<script>
  import { useRouter,useRoute } from 'vue-router'
  import ShopInfo from '../../components/ShopInfo.vue'
  import { get } from '../../utils/request.js'
  import { reactive,toRefs } from 'vue'
  import Content from './Content.vue'
  import Cart from './Cart.vue'

  const useShopInfoEffect = () => {
    const route = useRoute()
    //定义动态数据对象，用来接受ajax响应的数据
    const data = reactive({
      item: {}
    })
    const getItemData = async() => {
      const result = await get(`/api${route.path}`)
      if (result?.data?.errno === 0 && result?.data?.data){
        //响应成功，赋值对象
        data.item = result.data.data
      }
    }
    return { data,getItemData }
  }
  
  const useBackEffect = () => {
    const router = useRouter()
    //控制页面返回上一页
    const handleBackClike = () => {
      router.back()
    }
    return { handleBackClike }
  }

  export default {
    name: 'Shop',
    components: {
      ShopInfo,
      Content,
      Cart
    },
    setup() {
      const { data,getItemData } = useShopInfoEffect()
      const { handleBackClike } = useBackEffect()
      //页面加载调用一次
      getItemData()
      const { item } = toRefs(data)
      return {
        item,
        handleBackClike
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    padding: 0 .18rem;
  }
  .search{
    display: flex;
    margin-top: .24rem;
    &__back{
      margin-right: .16rem;
      font-size: .3rem;
      color: #B6B6B6;
    }
    &__content{
      padding-left: .16rem;
      background: #F5F5F5;
      border-radius: .16rem;
      width: 3.1rem;
      height: .32rem;
      &__icon{
        margin-right: .12rem;
        line-height: .32rem;
        color: #B7B7B7;
      }
      &__input{
        border: 0;
        background: #F5F5F5;
        width: 2.3rem;
        height: .28rem;
        color: #333333;
        font-size: .14rem;
        &::placeholder{
          color: #333333;
        }
      }
    }
  }
</style>
