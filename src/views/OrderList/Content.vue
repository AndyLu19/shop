<template>
  <div class="orders">
    <div class="order" v-for="(item,index) in list" :key="index">
      <div class="order__shop">
        <div class="order__shop__name">{{item.shopName}}</div>
        <div class="order__shop__status">{{item.isCanceled ? '已取消' : '已支付'}}</div>
      </div>
      <div class="order__products">
        <div class="order__products__imgs">
          <template v-for="(item1,index1) in item.products" :key="index1">
            <img :src="item1.product.img" class="order__products__imgs__img">
          </template>
        </div>
        <div class="order__products__info">
          <div class="order__products__info__price">¥{{item.sum}}</div>
          <div class="order__products__info__count">共{{item.totalcount}}件</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {
    reactive,
    toRefs
  } from 'vue'
  import {
    get
  } from '../../utils/request.js'

  const useOrderEffect = () => {
    //定义动态数组，接受ajax返回的订单信息
    let data = reactive({
      list: []
    })
    const getOrderList = async () => {
      const result = await get('/api/order')
      if (result?.data?.errno === 0 && result?.data?.data?.length) {
        //循环订单列表 ,修改订单数据结构以便于展示
        result.data.data.forEach((order) => {
          //每个订单的总数量
          let total = 0
          //每个订单的总价格
          let sum = 0
          //循环每个订单里的products
          order.products.forEach((productItem) => {
            total += productItem.orderSales
            sum += (productItem.orderSales * productItem.product.price)
          })
          //每个订单里多出了一个总数量和总价格
          order.totalcount = total
          order.sum = sum
        })
        //更改完的数据赋值给list
        data.list = result.data.data
      }
    }
    getOrderList()




    const {
      list
    } = toRefs(data)
    return {
      list
    }
  }

  export default {
    name: 'Content',
    setup() {
      const {
        list
      } = useOrderEffect()
      return {
        list
      }
    }
  }
</script>

<style lang="scss" scoped>
  .orders {
    padding: .18rem;
  }

  .order {
    padding: .16rem;
    margin-bottom: .16rem;
    background: #fff;
    border-radius: .04rem;

    &__shop {
      display: flex;
      justify-content: space-between;

      &__name {
        font-size: .16rem;
        color: #333333;
      }

      &__status {
        font-size: .14rem;
        color: #999999;
      }
    }

    &__products {
      display: flex;
      justify-content: space-between;
      margin-top: .16rem;

      &__imgs {
        display: flex;

        &__img {
          margin-right: .12rem;
          width: .4rem;
          height: .4rem;
        }
      }

      &__info {
        &__price {
          font-size: .14rem;
          color: #E93B3B;
        }

        &__count {
          margin-top: .04rem;
          font-size: .12rem;
          color: #333333;
          line-height: .14rem;
        }
      }
    }
  }
</style>
