<template>
  <div class="wrapper">
    <img src="http://www.dell-lee.com/imgs/vue3/user.png" alt="" class="wrapper__img">
    <input type="text" class="wrapper__input" placeholder="请输入手机号" v-model="username">
    <input type="password" class="wrapper__input" placeholder="请输入密码" v-model="password">
    <button class="wrapper__login-button" @click="handleLogin()">登录</button>
    <div class="wrapper__login-link" @click="handleRegister">立即注册</div>
    <Toast v-if="flag" :message="toastMessage" />
  </div>
</template>

<script>
  import {
    reactive,
    toRefs
  } from 'vue'
  import {
    useRouter
  } from 'vue-router'
  import {
    post
  } from '../../utils/request.js'
  import Toast, {
    useToastEffect
  } from '../../components/Toast.vue'

  const useLoginEffect = (showToast) => {
    const router = useRouter();
    //定义动态数据，接受用户输入的用户名和密码
    const data = reactive({
      username: '',
      password: '',
    });
    //定义点击登录方法
    const handleLogin = async () => {
      try {
        //判断用户输入的用户名和密码是否为空
        if (data.username.length === 0 || data.password.length === 0) {
          showToast('用户名或者密码不能为空');
          return;
        } else {
          //发送post请求，传递用户输入的用户名和密码参数
          const result = await post('/api/user/login', {
            username: data.username,
            password: data.password
          });
          //判断是否正确响应
          if (result?.data?.errno == 0) {
            //正确响应后，设置本地存储属性isLogin,控制登陆状态
            localStorage.isLogin = true;
            //路由到主页
            router.push({
              name: 'Home'
            });
          } else {
            showToast('登陆失败');
          }
        }
      } catch (e) {
        showToast('请求失败')
      }
    };
    //解构数据
    const {
      username,
      password
    } = toRefs(data);
    return {
      username,
      password,
      handleLogin
    }
  }

  const useRegisterEffect = () => {
    const router = useRouter();
    //跳转到注册页面
    const handleRegister = () => {
      router.push({
        name: 'Register'
      });
    };
    return {
      handleRegister
    }
  }

  export default {
    name: 'Login',
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
        handleLogin
      } = useLoginEffect(showToast);

      const {
        handleRegister
      } = useRegisterEffect();




      return {
        handleLogin,
        handleRegister,
        username,
        password,
        flag,
        toastMessage,
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
