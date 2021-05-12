<template>
  <div class="wrapper">
    <header class="header">
      <span class="backicon iconfont" @click="handleBackClick">&#xe609;</span>
      <span class="title">编辑收货地址</span>
      <span class="createBtn" @click="() => {handleEditAddress(addressItem,addressItem._id)} ">保存</span>
    </header>
    <div class="content">
      <div class="inputbg">
        <span class="inputtitle">所在城市：</span>
        <input class="inputvalue" type="text" v-model="addressItem.city">
      </div>
      <div class="inputbg">
        <span class="inputtitle">小区/大厦/学校：</span>
        <input class="inputvalue" type="text" v-model="addressItem.department">
      </div>
      <div class="inputbg">
        <span class="inputtitle">楼号-门牌号：</span>
        <input class="inputvalue" type="text" v-model="addressItem.houseNumber">
      </div>
      <div class="inputbg">
        <span class="inputtitle">收货人：</span>
        <input class="inputvalue" type="text" v-model="addressItem.name">
      </div>
      <div class="inputbg">
        <span class="inputtitle">联系电话：</span>
        <input class="inputvalue" type="tel" v-model="addressItem.phone">
      </div>
    </div>
  </div>

</template>

<script>
  import { useRouter,useRoute } from 'vue-router'
  import { useStore } from 'vuex'

  const controlBackEffect = () => {
    const router = useRouter()
    const handleBackClick = () => {
      router.back()
    }
    return { handleBackClick }
  }

  const controlEditAddressEffect = () => {
    const route = useRoute()
    const addressId = route.params.id - 1
    const store = useStore()
    const addressList = store.state.addressList
    const addressItem = addressList[addressId]
    
    const handleEditAddress = (addressItem,id) => {
      store.commit('editAddress',{addressItem,id})
    }
    
    return { addressItem,handleEditAddress }
  }

  export default {
    name: 'AddAddress',
    setup () {
      const { handleBackClick } = controlBackEffect()
      const { addressItem,handleEditAddress } = controlEditAddressEffect()
      return { handleBackClick,addressItem }
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #f5f5f5;
  }
  .header{
    display: flex;
    padding: .14rem .18rem;
    box-sizing: border-box;
    width: 100%;
    font-size: .16rem;
    color: #333333;
    background: #fff;
    .backicon{
      flex: 1;
      color: #B6B6B6;
    }
    .title{
      flex: 1;
      text-align: center;
    }
    .createBtn{
      flex: 1;
      text-align: right;
    }
  }
  .content{
    margin-top: .12rem;
    padding: .12rem .18rem 0;
    box-sizing: border-box;
    width: 100%;
    background: #fff;

  }
  .inputbg{
    margin-bottom: .12rem;
    padding-bottom: .12rem;
    border-bottom: .01rem solid #f1f1f1;
  }
  .inputtitle{
    font-size: .14rem;
    color: #666666;
  }
  .inputvalue{
    border: 0;
    font-size: .14rem;
    color: #151515;
  }
</style>
