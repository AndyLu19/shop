<template>
  <div class="wrapper">
    <img src="http://www.dell-lee.com/imgs/vue3/user.png" alt="" class="wrapper__img">
    <input type="text" class="wrapper__input" placeholder="请输入手机号" v-model="username">
    <input type="password" class="wrapper__input" placeholder="请输入密码" v-model="password">
    <input type="password" class="wrapper__input" placeholder="确认密码" v-model="comfirePwd">
    <button class="wrapper__login-button" @click="handRegister">注册</button>
    <div class="wrapper__login-link" @click="handleLogin">已有账号，立即登录</div>
    <Toast v-if="flag" :message="toastMessage" />
  </div>
</template>

<script>
  import {
    useRouter
  } from 'vue-router'
  import {
    reactive,
    toRefs
  } from 'vue'
  import {
    post
  } from '../../utils/request.js'
  import Toast, {
    useToastEffect
  } from '../../components/Toast.vue'

  const useRegisterEffect = (showToast) => {
    const router = useRouter();
    //定义动态数据，接受用户输入的用户名，密码和确认密码
    const data = reactive({
      username: '',
      password: '',
      comfirePwd: ''
    });
    //定义点击注册事件
    const handRegister = async () => {
      try {
        //获取到用户输入的内容，发送ajax请求
        const result = await post('/api/user/register1', {
          username: data.username,
          password: data.password,
          comfirePwd: data.comfirePwd
        });
        //判断请求是否发送成功
        if (result?.data?.errno == 0) {
          //成功就改变登录状态，并跳转到首页
          localStorage.isLogin = true;
          router.push({
            name: 'Home'
          });
        } else {
          showToast('注册失败');
        }
      } catch (e) {
        showToast('请求失败')
      }
    };
    //解构数据
    const {
      username,
      password,
      comfirePwd
    } = toRefs(data);
    return {
      username,
      password,
      comfirePwd,
      handRegister
    }
  }
  const useLoginTo = () => {
    const router = useRouter();
    const handleLogin = () => {
      router.push({
        name: 'Login'
      });
    };
    return {
      handleLogin
    }
  }
  export default {
    name: 'Register',
    components: {
      Toast
    },
    setup() {
      const {
        flag,
        toastMessage,
        showToast
      } = useToastEffect();

      const {
        username,
        password,
        comfirePwd,
        handRegister
      } = useRegisterEffect(showToast);

      const {
        handleLogin
      } = useLoginTo();

      return {
        username,
        password,
        comfirePwd,
        handRegister,
        handleLogin,
        flag,
        toastMessage
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    &__img {
      display: block;
      margin: 1.2rem auto .4rem auto;
      width: .66rem;
      height: .66rem;
    }

    &__input {
      display: block;
      padding-left: .16rem;
      box-sizing: border-box;
      margin: 0 auto .16rem auto;
      height: .48rem;
      width: 2.95rem;
      background: #F9F9F9;
      border-radius: .06rem;
      border: .01rem solid rgba(0, 0, 0, 0.10);
      font-size: .16rem;
      color: rgba(0, 0, 0, 0.50);
      ;
    }

    &__login-button {
      display: block;
      margin: .32rem auto .16rem auto;
      height: .48rem;
      width: 2.95rem;
      background: #0091FF;
      box-shadow: 0 .04rem .08rem 0 rgba(0, 145, 255, 0.32);
      border-radius: .04rem;
      border-radius: .04rem;
      border: 0;
      font-size: .16rem;
      color: #FFFFFF;
    }

    &__login-link {
      text-align: center;
      font-size: .14rem;
      color: rgba(0, 0, 0, 0.50);
    }
  }
</style>
