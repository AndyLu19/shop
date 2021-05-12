<template>
  <div class="content">
    <ul class="content__category">
      <li class="content__category__item " :class="{'content__category__item--active' : currentTab===item.tab}"
        v-for="(item,index) in categories" :key="index" @click="handleCategoryClick(item.tab)">{{item.name}}</li>
    </ul>
    <div class="product">
      <div class="product__item" v-for="item in contentList" :key="item._id">
        <img :src="item.imgUrl" alt="" class="product__item__img">
        <div class="product__item__content">
          <div class="product__item__content__title">{{item.name}}</div>
          <div class="product__item__content__tag">月售{{item.sales}}件</div>
          <div class="product__item__content__price">￥{{item.price}}</div>
        </div>
        <div class="iconfont"></div>
        <div class="product__number">
          <span class="product__number__minus" @click="() => {reduceItemFromCart(shopId,item._id)}">-</span>
          <span class="product__number__nums">{{cartList?.[shopId]?.productList.[item._id]?.count || 0}}</span>
          <span class="product__number__plus" @click="() => {addItemToCart(shopId,item._id,item,shopName)}">+</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {
    useRoute
  } from 'vue-router'
  import {
    reactive,
    toRefs,
    watchEffect
  } from 'vue'
  import { useStore } from 'vuex'
  import {
    get
  } from '../../utils/request.js'
  import { useSameCartEfftct } from './commonCartEffect.js'

  const categories = [{
      name: '全部商品',
      tab: 'all'
    },
    {
      name: '秒杀',
      tab: 'seckill'
    },
    {
      name: '新鲜水果',
      tab: 'fruit'
    }
  ]

  const useContentEffect = (currentTab,shopId) => {
    //定义动态对象，用来接收ajax请求返回的数组
    const contentData = reactive({
      contentList: []
    })
    const getContentData = async () => {
      //tab为发送ajax请求需要发送过去的数据，用来控制价格
      const result = await get(`/api/shop/${shopId}/products`, {
        tab: currentTab
      })
      //请求发送成功，给动态对象里的空数组赋值，用来循环展示商品
      if (result?.data?.errno === 0 && result?.data?.data?.length) {
        contentData.contentList = result.data.data
      }
    }
    //解构数据
    const {
      contentList
    } = toRefs(contentData)
    //监听的数据发生变化，自动执行
    watchEffect(() => {
      getContentData()
    })

    return { contentList }
  }

  const useTabEffct = () => {
    //定义动态对象，用来切换tab，默认是第一个
    const tabData = reactive({
       currentTab: categories[0].tab
    })
    //定义切换tab方法
    const handleCategoryClick = (tab) => {
      tabData.currentTab = tab
    }
    const { currentTab } = toRefs(tabData)
    return { currentTab,handleCategoryClick }
  }



  export default {
    name: 'Content',
    props: ['shopName'],
    setup() {
      //获取到店铺id
      const route = useRoute()
      const shopId = route.params.id

      const { currentTab,handleCategoryClick } = useTabEffct()
      //currentTab为发送ajax请求需要传递的参数，shopId是发送ajax请求需要传递的id
      const { contentList } = useContentEffect(currentTab,shopId)
      const { cartList,addItemToCart,reduceItemFromCart } = useSameCartEfftct()

      return {
        cartList,
        shopId,
        addItemToCart,
        reduceItemFromCart,
        contentList,
        categories,
        handleCategoryClick,
        currentTab
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../style/mixins.scss';

  .content {
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    top: 1.66rem;
    bottom: .5rem;

    &__category {
      overflow-y: scroll;
      margin: 0;
      padding: 0;
      height: 100%;
      width: .76rem;
      background-color: #F5F5F5;

      &__item {
        line-height: .4rem;
        text-align: center;
        font-size: .14rem;
        color: #333333;

        &--active {
          background: #FFFFFF;
        }
      }
    }

    .product {
      overflow-y: scroll;
      flex: 1;
      padding-right: .18rem;

      &__number {
        margin-top: .48rem;

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

      &__item {
        display: flex;
        margin: 0 0 .16rem .12rem;
        padding-bottom: .12rem;
        border-bottom: .01rem solid #F1F1F1;

        &__img {
          margin-right: .16rem;
          width: .68rem;
          height: .68rem;
        }

        &__content {
          overflow: hidden;
          flex: 1;
          position: relative;
          top: .05rem;

          &__title {
            font-size: .14rem;
            color: #333333;
            line-height: .2rem;
            @include ellipsis;
          }

          &__tag {
            margin: .06rem 0;
            font-size: .12rem;
            color: #333333;
            line-height: .16rem;
          }

          &__price {
            font-size: .14rem;
            color: #E93B3B;
            line-height: .14rem;
          }
        }
      }
    }
  }
</style>
