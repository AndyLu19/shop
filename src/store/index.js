import {
  createStore
} from 'vuex'
//存到本地储存
const setLocalStorage = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

//存到本地储存
// const setLocalStorageAddressList = (state) => {
//   const { addressList } = state
//   const addressListString = JSON.stringify(addressList)
//   localStorage.addressList = addressListString
// }
//从本地储存取数据
const getLocalStoarge = () => {
  try {
    return JSON.parse(localStorage.cartList)
  }catch(e){
    return
  }

}
// //从本地储存取数据
// const getLocalStoargeAddressList = () =>{
//   return JSON.parse(localStorage.addressList)
// }

export default createStore({
  state: {
    cartList: getLocalStoarge() || {},
    addressList: []
  },
  mutations: {
    addItemToCart(state, payload) {
      //解构传递过来的参数
      const {
        shopId,
        productId,
        productInfo,
        shopName
      } = payload
      //获取店铺
      let shop = state.cartList[shopId]
      //如果店铺不存在,就给店铺一个空对象
      if (!shop) {
        //定义shop数据结构
        shop = {
          name: '',
          totalCount: 0,
          productList: {},
        }
        //给shop.name赋值
        shop.name = shopName
      }
      //获取商品
      let product = shop.productList[productId]
      if (!product) {
        //如果商品原来不存在，就直接把商品放进去
        product = productInfo
        //商品不存在，数量默认为0
        product.count = 0
      }
      //不管是否存在商品，都要加1
      product.count += 1
      //添加商品默认选中状态
      product.checked = true
      //更新店铺里商品的信息
      shop.productList[productId] = product
      //循环商铺，更新商铺购物车总数量
      let total = 0
      for (let i in shop.productList){
        total += shop.productList[i].count
      }
      shop.totalCount = total
      //更新state.cartList里店铺信息
      state.cartList[shopId] = shop
      //把信息存到本地储存
      setLocalStorage(state)
    },
    reduceItemFromCart(state, payload) {
      const {
        shopId,
        productId
      } = payload
      //获取到店铺
      let shop = state.cartList[shopId]
      //如果店铺不存在，无需进行下列操作
      if (!shop) {
        return
      }
      //如果有店铺
      //获取到商品
      let product = shop.productList[productId]
      //如果店铺该商品不存在，无需进行下列操作
      if (!product) {
        return
      }
      //如果有该商品,数量-1
      if (product.count >= 1) {
        product.count -= 1
      }
      //减少商品默认非选中状态
      product.checked = false
      //更新店铺里商品的信息
      shop.productList[productId] = product
      //循环商铺，更新商铺购物车总数量
      let total = 0
      for (let i in shop.productList){
        total += shop.productList[i].count
      }
      shop.totalCount = total
      //更新state.cartList里店铺的信息
      state.cartList[shopId] = shop
      setLocalStorage(state)
    },
    changeProductChecked(state, payload) {
      const {
        shopId,
        productId
      } = payload
      //获取到店铺
      let shop = state.cartList[shopId]
      //获取到商品
      let product = shop.productList[productId]
      //商品的选择状态取反
      product.checked = !product.checked
      shop.productList[productId] = product
      state.cartList[shopId] = shop
      setLocalStorage(state)
    },
    clearAllProduct(state, payload) {
      const {
        shopId
      } = payload
      //清空购物车内容
      state.cartList[shopId] = {
        name: '',
        productList: {},
        totalCount: 0
      }
      setLocalStorage(state)
    },
    controlAllChecked(state, payload) {
      const {
        shopId,
        allChecked
      } = payload
      //获取到商店
      let shop = state.cartList[shopId]
      //判断allChecked 真就让商店的物品选择状态全为未选中 假就相反
      if (allChecked) {
        for (let i in shop.productList) {
          shop.productList[i].checked = false
        }
      } else {
        for (let i in shop.productList) {
          shop.productList[i].checked = true
        }
      }
      state.cartList[shopId] = shop
      setLocalStorage(state)
    },
    changeAddressList(state,payload){
      const { addressArray } = payload
      //addressList为空的时候才把从发送ajax请求获取来的地址添加进入
      if(state.addressList.length === 0){
        for (let i in addressArray){
          state.addressList.push(addressArray[i])
        }
      }

    },
    addItemToAddressList(state,payload){
      const { Info } = payload
      //追加地址
      state.addressList.push(Info)

    },
    editAddress(state,payload){
      const { addressItem,id } = payload
      //更改地址的内容
      state.addressList[id - 1] = addressItem

    }
  },
  actions: {

  },
  modules: {}
})
