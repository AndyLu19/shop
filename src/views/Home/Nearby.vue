<template>
  <section class="nearby">
    <router-link :to="`/shop/${item._id}`" v-for="item in nearbyList" :key="item._id">
      <ShopInfo  :item="item" :hideBorder="true"/>
    </router-link>

  </section>
</template>

<!-- :to="`/shop/${item._id}`" 通过这种写法，传递id参数 -->


<script>
  import { ref } from 'vue'
  import { get } from '../../utils/request.js'
  import ShopInfo from '../../components/ShopInfo.vue'

  const useNearbyListEffect = () => {
    //定义一个动态数组，接受发送ajax请求后响应的数据
    const nearbyList = ref([]);
    //定义发送ajax请求方法
    const getNearbyList = async () => {
       const result = await get('/api/shop/hot-list')
       if (result?.data?.errno ===0 && result?.data?.data?.length){
         //请求发送成功，给动态数组赋值
         nearbyList.value = result.data.data
       }
    }
    return { nearbyList,getNearbyList }
  }

  export default{
    name: 'Nearby',
    components: { ShopInfo },
    setup (){
      const { nearbyList,getNearbyList } = useNearbyListEffect()
      //手动调用一下，页面一上来就调用
      getNearbyList();
      return { nearbyList }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../style/viriables.scss';
  .nearby{
    margin-top: .14rem;
    a{
      text-decoration: none;

    }
  }
</style>
