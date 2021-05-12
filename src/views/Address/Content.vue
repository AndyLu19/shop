<template>
    <div class="content">
      <div class="title">我的收货地址</div>
      <div class="address" v-for="item in addressList" :key="item._id">
        <router-link :to="`/editaddress/${item._id}`">
          <div class="address__user">
            <span class="address__user__name">{{item.name}}</span>
            <span class="address__user__tel">{{item.phone}}</span>
          </div>
          <div class="address__info">{{item.department}}<span class="forwardicon iconfont">&#xe607;</span></div>
        </router-link>
      </div>
    </div>
</template>

<script>
  import { toRefs } from 'vue'
  import { useStore } from 'vuex'
  import { get } from '../../utils/request.js'
  export default {
    name: 'Content',
    setup () {
      const store = useStore()

      const getAddressList = async () => {
        // const addressList = store.state.addressList;
        // if(forceUpdate || !addressList.length) {
        const result = await get('/api/user/address')
        if(result?.data?.errno === 0) {
          const addressArray = result.data.data
          store.commit('changeAddressList', { addressArray })
        }
        // }
      }
      getAddressList()

      const { addressList } = toRefs(store.state)
      return { addressList }
    }
  }
</script>

<style lang="scss" scoped>
  .content{
    padding: 0 .18rem;
  }
  .title{
    margin: .16rem 0 .12rem 0;
    font-size: .14rem;
    color: #333333;
  }
  .address{
    position: relative;
    margin-bottom: .16rem;
    padding: .18rem 0 .18rem .16rem;
    background: #fff;
    border-radius: .04rem;
    &__user{
      font-size: .14rem;
      color: #999999;
      &__tel{
        margin-left: .66rem;
      }
    }
    &__info{
      width: 2.6rem;
      margin-top: .08rem;
      font-size: 14px;
      color: #333333;
    }
    .forwardicon{
      position: absolute;
      top: 40%;
      left: 3rem;
      font-size: .16rem;
      color:  #999999;
    }
  }
</style>
