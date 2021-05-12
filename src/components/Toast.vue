<template>
  <div class="toast">{{message}}</div>
</template>

<script>
  import {
    reactive,
    toRefs
  } from 'vue'
  export default {
    name: 'Toast',
    // 接收父组件传递过来的参数
    props: ['message']
  }
  export const useToastEffect = () => {
    //定义动态数据，flag控制弹窗的显示，toastMessage存储弹窗信息
    const toastData = reactive({
      flag: false,
      toastMessage: ''
    });
    //定义展示弹窗方法
    const showToast = (err) => {
      toastData.flag = true;
      toastData.toastMessage = err;
      setTimeout(()=>{
        // 两秒后,弹窗消失,并且清空弹窗信息
        toastData.flag = false;
        toastData.toastMessage = '';
      },2000)
    };
    const { flag,toastMessage } = toRefs(toastData);
    return {flag,toastMessage,showToast}
  }
</script>

<style lang="scss" scoped>
  .toast{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: .5rem;
    line-height: .5rem;
    text-align: center;
    background-color: rgba(0,0,0,0.5);
  }
</style>
